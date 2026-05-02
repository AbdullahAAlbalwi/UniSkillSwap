const { Router } = require('express');
const { body, param } = require('express-validator');
const { requireAuth, requireRoles } = require('../middleware/auth');
const helpRequestController = require('../controllers/helpRequestController');

const router = Router();

const createValidators = [
  body('title').trim().notEmpty().isLength({ max: 200 }),
  body('description').optional().isLength({ max: 4000 }),
  body('tags').optional().isArray(),
  body('difficulty').optional().isIn(['Beginner', 'Intermediate', 'Advanced']),
];

router.post('/', requireAuth, requireRoles('requester', 'both'), createValidators, helpRequestController.create);
router.get('/mine', requireAuth, requireRoles('requester', 'both'), helpRequestController.listMine);
router.patch(
  '/:id',
  requireAuth,
  requireRoles('requester', 'both'),
  param('id').isMongoId(),
  body('status').isIn(['open', 'closed']),
  helpRequestController.updateStatus
);

module.exports = router;
