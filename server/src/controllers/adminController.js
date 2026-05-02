const { validationResult } = require('express-validator');
const User = require('../models/User');
const Report = require('../models/Report');
const Session = require('../models/Session');
function handleValidation(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: 'Invalid input', details: errors.array() });
    return false;
  }
  return true;
}

async function stats(req, res, next) {
  try {
    const [totalUsers, requesters, tutorsAgg, sessionsActive, pendingReports] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'requester' }),
      User.countDocuments({ role: { $in: ['tutor', 'both'] } }),
      Session.countDocuments({ status: { $in: ['pending', 'confirmed'] } }),
      Report.countDocuments({ status: 'pending' }),
    ]);
    const pendingVerifications = await User.countDocuments({
      role: { $in: ['tutor', 'both'] },
      verified: false,
    });
    return res.json({
      totalUsers,
      requesters,
      tutorsCount: tutorsAgg,
      activeSessions: sessionsActive,
      pendingVerifications,
      pendingReports,
      pendingAppeals: 0,
    });
  } catch (e) {
    next(e);
  }
}

async function listUsers(req, res, next) {
  try {
    const users = await User.find().select('-passwordHash').sort({ createdAt: -1 }).limit(500).lean();
    return res.json({
      users: users.map((u) => ({ ...u, id: u._id.toString(), _id: undefined })),
    });
  } catch (e) {
    next(e);
  }
}

async function patchUser(req, res, next) {
  try {
    if (!handleValidation(req, res)) return;
    if (req.body.status === undefined && req.body.verified === undefined) {
      return res.status(400).json({ error: 'Provide status and/or verified' });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (req.body.status) user.status = req.body.status;
    if (typeof req.body.verified === 'boolean') user.verified = req.body.verified;
    await user.save();
    return res.json({ user: user.toPublicJSON() });
  } catch (e) {
    next(e);
  }
}

async function listReports(req, res, next) {
  try {
    const reports = await Report.find()
      .sort({ createdAt: -1 })
      .populate('reporterId', 'name email')
      .populate('targetUserId', 'name email')
      .limit(200)
      .lean();
    return res.json({
      reports: reports.map((r) => ({
        ...r,
        id: r._id.toString(),
        _id: undefined,
      })),
    });
  } catch (e) {
    next(e);
  }
}

async function patchReport(req, res, next) {
  try {
    if (!handleValidation(req, res)) return;
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    report.status = req.body.status;
    await report.save();
    return res.json({ report: { ...report.toObject(), id: report._id.toString() } });
  } catch (e) {
    next(e);
  }
}

module.exports = { stats, listUsers, patchUser, listReports, patchReport };
