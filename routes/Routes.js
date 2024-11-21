const express = require('express');
const router = express.Router();
const allFunctionController = require('../controllers/allFucntionController');

router.get('/progress/:id',allFunctionController.incrementInProgress);

module.exports = router;
