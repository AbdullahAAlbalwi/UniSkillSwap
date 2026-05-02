const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema(
  {
    monday: { type: [String], default: [] },
    tuesday: { type: [String], default: [] },
    wednesday: { type: [String], default: [] },
    thursday: { type: [String], default: [] },
    friday: { type: [String], default: [] },
    saturday: { type: [String], default: [] },
    sunday: { type: [String], default: [] },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 255,
    },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['requester', 'tutor', 'admin', 'both'],
      default: 'requester',
    },
    initials: { type: String, default: '' },
    bio: { type: String, default: '', maxlength: 4000 },
    subject: { type: String, default: '', maxlength: 500 },
    skills: { type: [String], default: [] },
    courses: { type: [String], default: [] },
    pricing: { type: String, default: 'Free (Skill Exchange)', maxlength: 200 },
    availability: { type: availabilitySchema, default: () => ({}) },
    sessionModes: { type: [String], default: [] },
    verified: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['active', 'suspended'],
      default: 'active',
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0, min: 0 },
    badges: { type: [String], default: [] },
    hoursTutored: { type: Number, default: 0, min: 0 },
    sessionsCompleted: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

userSchema.index({ role: 1, status: 1 });
userSchema.index({ skills: 1 });

userSchema.methods.toPublicJSON = function toPublicJSON() {
  const o = this.toObject({ virtuals: true });
  delete o.passwordHash;
  o.id = o._id.toString();
  delete o._id;
  delete o.__v;
  return o;
};

module.exports = mongoose.model('User', userSchema);
