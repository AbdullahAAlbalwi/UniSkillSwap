const { Router } = require('express');
const { listTutors, getTutor } = require('../controllers/tutorController');

const router = Router();

router.get('/', listTutors);
router.get('/:id', getTutor);

module.exports = router;
