const router = require('express').Router();
const ctrl = require('../controllers/attendance.controller');

router.get('/session', ctrl.getOrCreateSession);
router.post('/mark', ctrl.markAttendance);
router.post('/finalize', ctrl.finalizeAttendance);

module.exports = router;