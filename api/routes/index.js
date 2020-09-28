const express = require('express');
const router = express.Router()

// Import controllers
const ttsAndSttController = require('../controllers/TtsAndSttController');

router.post('/getText', ttsAndSttController.sst);

module.exports = router

