const { Router } = require('express');
const { body } = require('express-validator');
const { requireAuth, requireRoles } = require('../middleware/auth');
const { create } = require('../controllers/reviewController');

const router = Router();

router.post(
  '/',
  requireAuth,
  requireRoles('requester', 'both'),
  [
    body('sessionId').isMongoId(),
    body('rating').isInt({ min: 1, max: 5 }),
    body('comment').optional().isLength({ max: 2000 }),
  ],
  create
);

module.exports = router;
