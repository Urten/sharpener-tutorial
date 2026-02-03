const router = require('express').Router();
const ctrl = require('../controllers/student.controller');

router.post('/', ctrl.createStudent);
router.get('/', ctrl.getStudents);

module.exports = router;