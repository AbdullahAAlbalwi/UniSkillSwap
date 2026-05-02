const { Router } = require('express');
const { body, param } = require('express-validator');
const { requireAuth, requireRoles } = require('../middleware/auth');
const offerController = require('../controllers/offerController');

const router = Router();

router.get('/', offerController.listOffers);

const createOfferValidators = [
  body('title').trim().notEmpty().isLength({ max: 200 }),
  body('subject').trim().notEmpty().isLength({ max: 200 }),
  body('description').optional().isLength({ max: 4000 }),
  body('level').optional().isIn(['Beginner', 'Intermediate', 'Advanced']),
  body('tags').optional().isArray(),
  body('mode').optional().isIn(['Online', 'On-Campus', 'Both']),
  body('active').optional().isBoolean(),
  body('status').optional().isIn(['draft', 'active', 'archived']),
];

const patchOfferValidators = [
  param('id').isMongoId(),
  body('title').optional().trim().notEmpty().isLength({ max: 200 }),
  body('subject').optional().trim().notEmpty().isLength({ max: 200 }),
  body('description').optional().isLength({ max: 4000 }),
  body('level').optional().isIn(['Beginner', 'Intermediate', 'Advanced']),
  body('tags').optional().isArray(),
  body('mode').optional().isIn(['Online', 'On-Campus', 'Both']),
  body('active').optional().isBoolean(),
  body('status').optional().isIn(['draft', 'active', 'archived']),
];

router.get('/mine', requireAuth, requireRoles('tutor', 'both'), offerController.listMyOffers);
router.post('/', requireAuth, requireRoles('tutor', 'both'), createOfferValidators, offerController.createOffer);
router.patch(
  '/:id',
  requireAuth,
  requireRoles('tutor', 'both'),
  patchOfferValidators,
  offerController.updateOffer
);
router.delete('/:id', requireAuth, requireRoles('tutor', 'both'), param('id').isMongoId(), offerController.deleteOffer);

module.exports = router;
