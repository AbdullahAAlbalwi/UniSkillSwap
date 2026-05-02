/**
 * Loads demo users and listings. Run after MongoDB is up:
 *   cp .env.example .env   # then set MONGODB_URI and JWT_SECRET
 *   npm run seed
 */
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { connectDb } = require('./config/db');
const User = require('./models/User');
const Offer = require('./models/Offer');
const { initialsFromName } = require('./utils/initials');

const demoPassword = process.env.SEED_DEMO_PASSWORD || 'DemoPass123!';

async function seed() {
  await connectDb();
  await User.deleteMany({ email: /@uniskillswap\.local$/ });
  await Offer.deleteMany({});

  const hash = await bcrypt.hash(demoPassword, 10);

  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@uniskillswap.local',
    passwordHash: hash,
    role: 'admin',
    initials: 'AU',
    verified: true,
  });

  const tutor = await User.create({
    name: 'Sarah Chen',
    email: 'tutor@uniskillswap.local',
    passwordHash: hash,
    role: 'tutor',
    initials: initialsFromName('Sarah Chen'),
    bio: 'Mathematics tutor — Calc I–III and linear algebra.',
    subject: 'Calculus & Linear Algebra',
    skills: ['Math', 'Calculus', 'Linear Algebra'],
    courses: ['MATH 101', 'MATH 201'],
    verified: true,
    rating: 4.8,
    reviewCount: 12,
    badges: ['Top Rated', 'Verified'],
    availability: {
      monday: ['2:00 PM', '4:00 PM'],
      wednesday: ['2:00 PM', '3:00 PM'],
      friday: ['1:00 PM'],
    },
    sessionModes: ['Online', 'On-Campus'],
  });

  const student = await User.create({
    name: 'Alex Requester',
    email: 'student@uniskillswap.local',
    passwordHash: hash,
    role: 'requester',
    initials: 'AR',
    verified: true,
  });

  await Offer.create([
    {
      tutorId: tutor._id,
      title: 'Calculus II — Integration',
      subject: 'Calculus II',
      description: 'Techniques of integration and applications.',
      level: 'Intermediate',
      tags: ['Math', 'Calculus'],
      mode: 'Both',
      active: true,
      status: 'active',
    },
    {
      tutorId: tutor._id,
      title: 'Linear Algebra fundamentals',
      subject: 'Linear Algebra',
      description: 'Vectors, matrices, eigenvalues.',
      level: 'Beginner',
      tags: ['Math'],
      mode: 'Online',
      active: true,
      status: 'active',
    },
  ]);

  console.log('Seed complete.');
  console.log('Demo password (all accounts):', demoPassword);
  console.log('Accounts:', {
    admin: admin.email,
    tutor: tutor.email,
    student: student.email,
  });
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
