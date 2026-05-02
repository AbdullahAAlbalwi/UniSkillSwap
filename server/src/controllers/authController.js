const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { signToken } = require('../utils/token');
const { initialsFromName } = require('../utils/initials');

function handleValidation(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: 'Invalid input', details: errors.array() });
    return false;
  }
  return true;
}

async function register(req, res, next) {
  try {
    if (!handleValidation(req, res)) return;
    const { name, email, password, role } = req.body;
    if (role === 'admin') {
      return res.status(403).json({ error: 'Cannot register as admin via this endpoint' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHash,
      role: role || 'requester',
      initials: initialsFromName(name),
    });
    const token = signToken(user);
    return res.status(201).json({
      token,
      user: user.toPublicJSON(),
    });
  } catch (e) {
    next(e);
  }
}

async function login(req, res, next) {
  try {
    if (!handleValidation(req, res)) return;
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    if (user.status === 'suspended') {
      return res.status(403).json({ error: 'Account suspended' });
    }
    const token = signToken(user);
    const safe = user.toObject();
    delete safe.passwordHash;
    safe.id = safe._id.toString();
    delete safe._id;
    delete safe.__v;
    return res.json({ token, user: safe });
  } catch (e) {
    next(e);
  }
}

module.exports = { register, login };
