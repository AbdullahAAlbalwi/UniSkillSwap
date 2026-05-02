const User = require('../models/User');
const Offer = require('../models/Offer');
const Review = require('../models/Review');

async function listTutors(req, res, next) {
  try {
    const { search, minRating, tag, mode } = req.query;
    const filter = {
      status: 'active',
      role: { $in: ['tutor', 'both'] },
    };
    if (minRating) {
      const n = Number(minRating);
      if (!Number.isNaN(n)) filter.rating = { $gte: n };
    }
    if (tag) {
      filter.skills = tag;
    }
    let query = User.find(filter).select('-passwordHash').sort({ rating: -1 });
    const tutors = await query.lean();
    let list = tutors.map((t) => ({
      ...t,
      id: t._id.toString(),
      _id: undefined,
    }));
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(s) ||
          (t.skills || []).some((k) => k.toLowerCase().includes(s)) ||
          (t.courses || []).some((c) => c.toLowerCase().includes(s))
      );
    }
    if (mode) {
      const offerTutorIds = await Offer.distinct('tutorId', {
        active: true,
        $or: [{ mode }, { mode: 'Both' }],
      });
      const idSet = new Set(offerTutorIds.map((id) => id.toString()));
      list = list.filter((t) => idSet.has(t.id));
    }
    return res.json({ tutors: list });
  } catch (e) {
    next(e);
  }
}

async function getTutor(req, res, next) {
  try {
    const tutor = await User.findOne({
      _id: req.params.id,
      status: 'active',
      role: { $in: ['tutor', 'both'] },
    }).select('-passwordHash');
    if (!tutor) return res.status(404).json({ error: 'Tutor not found' });
    const offers = await Offer.find({ tutorId: tutor._id, active: true, status: { $ne: 'archived' } }).lean();
    const reviews = await Review.find({ tutorId: tutor._id })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('reviewerId', 'name initials')
      .lean();
    const reviewsList = reviews.map((r) => ({
      id: r._id.toString(),
      name: r.reviewerId?.name || 'User',
      initial: (r.reviewerId?.name || 'U').charAt(0),
      date: r.createdAt,
      rating: r.rating,
      comment: r.comment,
    }));
    return res.json({
      tutor: tutor.toPublicJSON(),
      offers: offers.map((o) => ({ ...o, id: o._id.toString(), _id: undefined })),
      reviewsList,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = { listTutors, getTutor };
