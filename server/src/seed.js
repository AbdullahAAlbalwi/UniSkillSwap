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

  const adminName = 'ياسر الحسن';
  const admin = await User.create({
    name: adminName,
    email: 'admin@uniskillswap.local',
    passwordHash: hash,
    role: 'admin',
    initials: initialsFromName(adminName),
    verified: true,
  });

  const tutorName = 'نورة العتيبي';
  const tutor = await User.create({
    name: tutorName,
    email: 'tutor@uniskillswap.local',
    passwordHash: hash,
    role: 'tutor',
    initials: initialsFromName(tutorName),
    bio: 'مدرسة رياضيات — تفاضل وتكامل ١–٣ وجبر خطي.',
    subject: 'التفاضل والتكامل والجبر الخطي',
    skills: ['رياضيات', 'تفاضل وتكامل', 'جبر خطي'],
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

  const studentName = 'خالد الدوسري';
  const student = await User.create({
    name: studentName,
    email: 'student@uniskillswap.local',
    passwordHash: hash,
    role: 'requester',
    initials: initialsFromName(studentName),
    verified: true,
  });

  await Offer.create([
    {
      tutorId: tutor._id,
      title: 'تفاضل وتكامل ٢ — التكامل',
      subject: 'تفاضل وتكامل ٢',
      description: 'تقنيات التكامل والتطبيقات.',
      level: 'Intermediate',
      tags: ['رياضيات', 'تفاضل وتكامل'],
      mode: 'Both',
      active: true,
      status: 'active',
    },
    {
      tutorId: tutor._id,
      title: 'أساسيات الجبر الخطي',
      subject: 'الجبر الخطي',
      description: 'متجهات، مصفوفات، قيم ذاتية.',
      level: 'Beginner',
      tags: ['رياضيات'],
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
