const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Review = require('../models/Review');
const Session = require('../models/Session');
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
    const { sessionId, rating, comment } = req.body;
    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ error: 'Session not found' });
    if (session.status !== 'completed') {
      return res.status(400).json({ error: 'Can only review completed sessions' });
    }
    if (!session.requesterId.equals(new mongoose.Types.ObjectId(req.userId))) {
      return res.status(403).json({ error: 'Only the requester can leave this review' });
    }
    const existing = await Review.findOne({ sessionId });
    if (existing) return res.status(409).json({ error: 'Session already reviewed' });
    const review = await Review.create({
      sessionId,
      reviewerId: req.userId,
      tutorId: session.tutorId,
      rating,
      comment: comment || '',
    });
    const tutor = await User.findById(session.tutorId);
    if (tutor) {
      const n = tutor.reviewCount + 1;
      tutor.reviewCount = n;
      tutor.rating = Number(((tutor.rating * (n - 1) + rating) / n).toFixed(2));
      await tutor.save();
    }
    return res.status(201).json({ review: { ...review.toObject(), id: review._id.toString() } });
  } catch (e) {
    next(e);
  }
}

module.exports = { create };
