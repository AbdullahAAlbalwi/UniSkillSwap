const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Session = require('../models/Session');
const User = require('../models/User');
const Offer = require('../models/Offer');

function handleValidation(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: 'Invalid input', details: errors.array() });
    return false;
  }
  return true;
}

async function book(req, res, next) {
  try {
    if (!handleValidation(req, res)) return;
    const { tutorId, offerId, subject, date, time, durationMinutes, mode, note } = req.body;
    const tutor = await User.findById(tutorId);
    if (!tutor || !['tutor', 'both'].includes(tutor.role)) {
      return res.status(400).json({ error: 'Invalid tutor' });
    }
    if (tutor.status !== 'active') {
      return res.status(400).json({ error: 'Tutor is not available' });
    }
    if (offerId) {
      const offer = await Offer.findOne({ _id: offerId, tutorId, active: true });
      if (!offer) return res.status(400).json({ error: 'Invalid offer for this tutor' });
    }
    const session = await Session.create({
      requesterId: req.userId,
      tutorId,
      offerId: offerId || null,
      subject,
      date,
      time,
      durationMinutes: durationMinutes || 60,
      mode,
      note: note || '',
      status: 'pending',
    });
    return res.status(201).json({ session: formatSession(session) });
  } catch (e) {
    next(e);
  }
}

function formatSession(s) {
  const o = s.toObject ? s.toObject() : s;
  return { ...o, id: o._id.toString(), _id: undefined };
}

async function listMine(req, res, next) {
  try {
    const sessions = await Session.find({
      $or: [{ requesterId: req.userId }, { tutorId: req.userId }],
    })
      .sort({ createdAt: -1 })
      .populate('requesterId', 'name initials email')
      .populate('tutorId', 'name initials email')
      .lean();
    return res.json({
      sessions: sessions.map((x) => ({
        ...x,
        id: x._id.toString(),
        _id: undefined,
        requesterId: x.requesterId?._id?.toString() || x.requesterId,
        tutorId: x.tutorId?._id?.toString() || x.tutorId,
      })),
    });
  } catch (e) {
    next(e);
  }
}

async function updateStatus(req, res, next) {
  try {
    if (!handleValidation(req, res)) return;
    const { status } = req.body;
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ error: 'Session not found' });
    const uid = new mongoose.Types.ObjectId(req.userId);
    const isTutor = session.tutorId.equals(uid);
    const isRequester = session.requesterId.equals(uid);

    if (status === 'cancelled' && isRequester && (session.status === 'pending' || session.status === 'confirmed')) {
      session.status = 'cancelled';
      await session.save();
      return res.json({ session: formatSession(session) });
    }

    if (status === 'cancelled' && isTutor && ['pending', 'confirmed'].includes(session.status)) {
      session.status = 'cancelled';
      await session.save();
      return res.json({ session: formatSession(session) });
    }

    if (status === 'confirmed' && isTutor && session.status === 'pending') {
      session.status = 'confirmed';
      await session.save();
      return res.json({ session: formatSession(session) });
    }

    if (status === 'completed' && isTutor && session.status === 'confirmed') {
      session.status = 'completed';
      await session.save();
      const tutor = await User.findById(session.tutorId);
      if (tutor) {
        tutor.sessionsCompleted = (tutor.sessionsCompleted || 0) + 1;
        tutor.hoursTutored = (tutor.hoursTutored || 0) + (session.durationMinutes || 60) / 60;
        await tutor.save();
      }
      return res.json({ session: formatSession(session) });
    }

    if (!isTutor && !isRequester) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    return res.status(400).json({ error: 'Invalid status transition' });
  } catch (e) {
    next(e);
  }
}

module.exports = { book, listMine, updateStatus };
