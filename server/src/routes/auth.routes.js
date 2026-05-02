const { Router } = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');

const router = Router();

const registerValidators = [
  body('name').trim().notEmpty().isLength({ max: 120 }),
  body('email').isEmail().normalizeEmail().isLength({ max: 255 }),
  body('password').isLength({ min: 8, max: 128 }),
  body('role').optional().isIn(['requester', 'tutor', 'both']),
];

const loginValidators = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
];

router.post('/register', registerValidators, register);
router.post('/login', loginValidators, login);

module.exports = router;
