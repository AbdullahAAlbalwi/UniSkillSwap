const { validationResult } = require('express-validator');
const Offer = require('../models/Offer');

function handleValidation(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: 'Invalid input', details: errors.array() });
    return false;
  }
  return true;
}

async function listOffers(req, res, next) {
  try {
    const { tutorId } = req.query;
    const q = { active: true };
    if (tutorId) q.tutorId = tutorId;
    const offers = await Offer.find(q).sort({ updatedAt: -1 }).lean();
    return res.json({
      offers: offers.map((o) => ({ ...o, id: o._id.toString(), _id: undefined })),
    });
  } catch (e) {
    next(e);
  }
}

async function listMyOffers(req, res, next) {
  try {
    const offers = await Offer.find({ tutorId: req.userId }).sort({ updatedAt: -1 }).lean();
    return res.json({
      offers: offers.map((o) => ({ ...o, id: o._id.toString(), _id: undefined })),
    });
  } catch (e) {
    next(e);
  }
}

async function createOffer(req, res, next) {
  try {
    if (!handleValidation(req, res)) return;
    const { title, subject, description, level, tags, mode, active, status } = req.body;
    const doc = await Offer.create({
      tutorId: req.userId,
      title,
      subject,
      description,
      level,
      tags,
      mode,
      active,
      status,
    });
    return res.status(201).json({ offer: { ...doc.toObject(), id: doc._id.toString() } });
  } catch (e) {
    next(e);
  }
}

async function updateOffer(req, res, next) {
  try {
    if (!handleValidation(req, res)) return;
    const offer = await Offer.findOne({ _id: req.params.id, tutorId: req.userId });
    if (!offer) return res.status(404).json({ error: 'Offer not found' });
    const allowed = ['title', 'subject', 'description', 'level', 'tags', 'mode', 'active', 'status'];
    for (const key of allowed) {
      if (req.body[key] !== undefined) offer[key] = req.body[key];
    }
    await offer.save();
    return res.json({ offer: { ...offer.toObject(), id: offer._id.toString() } });
  } catch (e) {
    next(e);
  }
}

async function deleteOffer(req, res, next) {
  try {
    const offer = await Offer.findOne({ _id: req.params.id, tutorId: req.userId });
    if (!offer) return res.status(404).json({ error: 'Offer not found' });
    offer.status = 'archived';
    offer.active = false;
    await offer.save();
    return res.status(204).send();
  } catch (e) {
    next(e);
  }
}

module.exports = { listOffers, listMyOffers, createOffer, updateOffer, deleteOffer };
