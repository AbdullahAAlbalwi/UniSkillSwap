const { validationResult } = require('express-validator');
const HelpRequest = require('../models/HelpRequest');

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
    const { title, description, tags, difficulty } = req.body;
    const doc = await HelpRequest.create({
      requesterId: req.userId,
      title,
      description,
      tags,
      difficulty,
    });
    return res.status(201).json({ request: { ...doc.toObject(), id: doc._id.toString() } });
  } catch (e) {
    next(e);
  }
}

async function listMine(req, res, next) {
  try {
    const items = await HelpRequest.find({ requesterId: req.userId }).sort({ createdAt: -1 }).lean();
    return res.json({
      requests: items.map((r) => ({ ...r, id: r._id.toString(), _id: undefined })),
    });
  } catch (e) {
    next(e);
  }
}

async function updateStatus(req, res, next) {
  try {
    if (!handleValidation(req, res)) return;
    const doc = await HelpRequest.findOne({ _id: req.params.id, requesterId: req.userId });
    if (!doc) return res.status(404).json({ error: 'Request not found' });
    doc.status = req.body.status;
    await doc.save();
    return res.json({ request: { ...doc.toObject(), id: doc._id.toString() } });
  } catch (e) {
    next(e);
  }
}

module.exports = { create, listMine, updateStatus };
