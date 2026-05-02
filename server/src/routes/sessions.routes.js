const { Router } = require('express');
const { body, param } = require('express-validator');
const { requireAuth } = require('../middleware/auth');
const sessionController = require('../controllers/sessionController');

const router = Router();

function requireBookRole(req, res, next) {
  if (!['requester', 'both'].includes(req.userRole)) {
    return res.status(403).json({ error: 'Only students can book sessions' });
  }
  next();
}

const bookValidators = [
  body('tutorId').isMongoId(),
  body('offerId').optional({ nullable: true }).isMongoId(),
  body('subject').trim().notEmpty().isLength({ max: 300 }),
  body('date').trim().notEmpty(),
  body('time').trim().notEmpty(),
  body('durationMinutes').optional().isInt({ min: 15, max: 480 }),
  body('mode').isIn(['Online', 'On-Campus']),
  body('note').optional().isLength({ max: 2000 }),
];

const statusValidators = [
  param('id').isMongoId(),
  body('status').isIn(['confirmed', 'cancelled', 'completed']),
];

router.post('/book', requireAuth, requireBookRole, bookValidators, sessionController.book);
router.get('/mine', requireAuth, sessionController.listMine);
router.patch('/:id/status', requireAuth, statusValidators, sessionController.updateStatus);

module.exports = router;
