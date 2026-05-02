const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    offerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', default: null },
    subject: { type: String, required: true, trim: true, maxlength: 300 },
    date: { type: String, required: true, maxlength: 32 },
    time: { type: String, required: true, maxlength: 32 },
    durationMinutes: { type: Number, default: 60, min: 15, max: 480 },
    mode: {
      type: String,
      enum: ['Online', 'On-Campus'],
      default: 'Online',
    },
    note: { type: String, default: '', maxlength: 2000 },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

sessionSchema.index({ tutorId: 1, status: 1 });
sessionSchema.index({ requesterId: 1, status: 1 });

module.exports = mongoose.model('Session', sessionSchema);
