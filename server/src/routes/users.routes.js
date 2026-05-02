const { Router } = require('express');
const { body } = require('express-validator');
const { requireAuth } = require('../middleware/auth');
const { getMe, updateMe } = require('../controllers/userController');

const router = Router();

router.get('/me', requireAuth, getMe);

const updateValidators = [
  body('name').optional().trim().notEmpty().isLength({ max: 120 }),
  body('bio').optional().isLength({ max: 4000 }),
  body('subject').optional().isLength({ max: 500 }),
  body('skills').optional().isArray(),
  body('courses').optional().isArray(),
  body('pricing').optional().isLength({ max: 200 }),
  body('sessionModes').optional().isArray(),
  body('availability').optional().isObject(),
];

router.patch('/me', requireAuth, updateValidators, updateMe);

module.exports = router;
