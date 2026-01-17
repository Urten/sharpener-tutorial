const express = require('express');
const router = express.Router();

router.get('/:username', (req, res) => {
  const username = req.params.username;
  const role = req.query.role;
  res.send(`Welcome ${username}, your role is ${role}`);
});

module.exports = router;
