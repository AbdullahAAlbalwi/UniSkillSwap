const { Router } = require('express');
const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');
const tutorsRoutes = require('./tutors.routes');
const offersRoutes = require('./offers.routes');
const requestsRoutes = require('./requests.routes');
const sessionsRoutes = require('./sessions.routes');
const reviewsRoutes = require('./reviews.routes');
const messagesRoutes = require('./messages.routes');
const reportsRoutes = require('./reports.routes');
const adminRoutes = require('./admin.routes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/tutors', tutorsRoutes);
router.use('/offers', offersRoutes);
router.use('/help-requests', requestsRoutes);
router.use('/sessions', sessionsRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/messages', messagesRoutes);
router.use('/reports', reportsRoutes);
router.use('/admin', adminRoutes);

router.get('/health', (req, res) => {
  res.json({ ok: true, service: 'uniskillswap-api' });
});

module.exports = router;
