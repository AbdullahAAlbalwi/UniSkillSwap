const { validationResult } = require('express-validator');
const User = require('../models/User');
const { initialsFromName } = require('../utils/initials');

function handleValidation(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: 'Invalid input', details: errors.array() });
    return false;
  }
  return true;
}

async function getMe(req, res, next) {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user.toPublicJSON());
  } catch (e) {
    next(e);
  }
}

async function updateMe(req, res, next) {
  try {
    if (!handleValidation(req, res)) return;
    const allowed = [
      'name',
      'bio',
      'subject',
      'skills',
      'courses',
      'pricing',
      'availability',
      'sessionModes',
    ];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }
    if (updates.name) {
      updates.initials = initialsFromName(updates.name);
    }
    const user = await User.findByIdAndUpdate(req.userId, { $set: updates }, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user.toPublicJSON());
  } catch (e) {
    next(e);
  }
}

module.exports = { getMe, updateMe };
