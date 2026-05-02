const { Router } = require('express');
const { body } = require('express-validator');
const { requireAuth } = require('../middleware/auth');
const { create } = require('../controllers/reportController');

const router = Router();

router.post(
  '/',
  requireAuth,
  [
    body('targetUserId').isMongoId(),
    body('reason').trim().notEmpty().isLength({ max: 2000 }),
    body('details').optional().isLength({ max: 4000 }),
  ],
  create
);

module.exports = router;
