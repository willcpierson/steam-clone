const express = require('express');
const router = express.Router();

/* GET games listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/games"
  });
});

module.exports = router;