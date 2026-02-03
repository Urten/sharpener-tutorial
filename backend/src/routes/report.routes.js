const router = require('express').Router();
const ctrl = require('../controllers/report.controller');

router.get('/', ctrl.getAttendanceReport);

module.exports = router;