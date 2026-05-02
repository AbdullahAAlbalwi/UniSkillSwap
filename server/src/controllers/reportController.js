const { validationResult } = require('express-validator');
const Report = require('../models/Report');
const User = require('../models/User');

function handleValidation(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: 'Invalid input', details: errors.array() });
    return false;
  }
  return true;
}

async function create(req, res, next) {
  try {
    if (!handleValidation(req, res)) return;
    const { targetUserId, reason, details } = req.body;
    const target = await User.findById(targetUserId);
    if (!target) return res.status(404).json({ error: 'Target user not found' });
    const report = await Report.create({
      reporterId: req.userId,
      targetUserId,
      reason,
      details: details || '',
    });
    return res.status(201).json({ report: { ...report.toObject(), id: report._id.toString() } });
  } catch (e) {
    next(e);
  }
}

module.exports = { create };
