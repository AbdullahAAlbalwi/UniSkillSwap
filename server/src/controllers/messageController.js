const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Conversation = require('../models/Conversation');
const User = require('../models/User');

function handleValidation(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: 'Invalid input', details: errors.array() });
    return false;
  }
  return true;
}

function participantKey(a, b) {
  const x = a.toString();
  const y = b.toString();
  return x < y ? `${x}:${y}` : `${y}:${x}`;
}

async function listThreads(req, res, next) {
  try {
    const convs = await Conversation.find({ participants: req.userId })
      .sort({ lastMessageAt: -1 })
      .populate('participants', 'name initials email')
      .lean();
    const threads = convs.map((c) => {
      const other = c.participants.find((p) => p._id.toString() !== req.userId);
      const last = c.messages[c.messages.length - 1];
      return {
        id: c._id.toString(),
        peer: other
          ? { id: other._id.toString(), name: other.name, initials: other.initials }
          : null,
        lastMessage: last?.text || '',
        lastMessageAt: last?.createdAt || c.lastMessageAt,
        messages: c.messages.map((m) => ({
          id: m._id.toString(),
          from: m.senderId.toString() === req.userId ? 'me' : 'them',
          text: m.text,
          time: m.createdAt,
        })),
      };
    });
    return res.json({ threads });
  } catch (e) {
    next(e);
  }
}

async function getOrCreateThread(req, res, next) {
  try {
    const peerId = req.params.peerId;
    if (peerId === req.userId) {
      return res.status(400).json({ error: 'Invalid peer' });
    }
    const peer = await User.findById(peerId);
    if (!peer) return res.status(404).json({ error: 'User not found' });
    const key = participantKey(req.userId, peerId);
    let conv = await Conversation.findOne({ participantKey: key }).populate('participants', 'name initials email');
    if (!conv) {
      conv = await Conversation.create({
        participantKey: key,
        participants: [req.userId, peerId],
        messages: [],
      });
      await conv.populate('participants', 'name initials email');
    }
    const other = conv.participants.find((p) => p._id.toString() !== req.userId);
    return res.json({
      thread: {
        id: conv._id.toString(),
        peer: { id: other._id.toString(), name: other.name, initials: other.initials },
        messages: conv.messages.map((m) => ({
          id: m._id.toString(),
          from: m.senderId.toString() === req.userId ? 'me' : 'them',
          text: m.text,
          time: m.createdAt,
        })),
      },
    });
  } catch (e) {
    next(e);
  }
}

async function sendMessage(req, res, next) {
  try {
    if (!handleValidation(req, res)) return;
    const peerId = req.params.peerId;
    if (peerId === req.userId) {
      return res.status(400).json({ error: 'Invalid peer' });
    }
    const peer = await User.findById(peerId);
    if (!peer) return res.status(404).json({ error: 'User not found' });
    const key = participantKey(req.userId, peerId);
    let conv = await Conversation.findOne({ participantKey: key });
    if (!conv) {
      conv = await Conversation.create({
        participantKey: key,
        participants: [req.userId, peerId],
        messages: [],
      });
    }
    conv.messages.push({
      senderId: new mongoose.Types.ObjectId(req.userId),
      text: req.body.text,
    });
    conv.lastMessageAt = new Date();
    await conv.save();
    return res.status(201).json({ ok: true });
  } catch (e) {
    next(e);
  }
}

module.exports = { listThreads, getOrCreateThread, sendMessage };
