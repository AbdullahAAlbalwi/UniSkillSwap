const { Router } = require('express');
const { body, param } = require('express-validator');
const { requireAuth, requireRoles } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

const router = Router();

router.use(requireAuth, requireRoles('admin'));

router.get('/stats', adminController.stats);
router.get('/users', adminController.listUsers);
router.patch(
  '/users/:id',
  param('id').isMongoId(),
  body('status').optional().isIn(['active', 'suspended']),
  body('verified').optional().isBoolean(),
  adminController.patchUser
);
router.get('/reports', adminController.listReports);
router.patch(
  '/reports/:id',
  param('id').isMongoId(),
  body('status').isIn(['pending', 'reviewed', 'dismissed']),
  adminController.patchReport
);

module.exports = router;
