const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema(
  {
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    subject: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, default: '', maxlength: 4000 },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    tags: { type: [String], default: [] },
    mode: {
      type: String,
      enum: ['Online', 'On-Campus', 'Both'],
      default: 'Online',
    },
    active: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ['draft', 'active', 'archived'],
      default: 'active',
    },
  },
  { timestamps: true }
);

offerSchema.index({ tutorId: 1, active: 1 });

module.exports = mongoose.model('Offer', offerSchema);
