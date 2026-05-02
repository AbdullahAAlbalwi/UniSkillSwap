const { Router } = require('express');
const { body, param } = require('express-validator');
const { requireAuth } = require('../middleware/auth');
const messageController = require('../controllers/messageController');

const router = Router();

router.get('/threads', requireAuth, messageController.listThreads);
router.get('/with/:peerId', requireAuth, param('peerId').isMongoId(), messageController.getOrCreateThread);
router.post(
  '/with/:peerId',
  requireAuth,
  param('peerId').isMongoId(),
  body('text').trim().notEmpty().isLength({ max: 4000 }),
  messageController.sendMessage
);

module.exports = router;
