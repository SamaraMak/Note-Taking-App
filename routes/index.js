const express = require('express');

const router = express.Router();

router.get('/notes', (req, res, next) => {
  res.render('notes');
});

module.exports = router;