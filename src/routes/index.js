const express = require('express');
const router = express.Router();

//// Stt Routes
const sttController = require("../controllers/SttController");

// Audio file transcription
router.get('/stt/audio', sttController.transcriptByAudio);

// Voice record transcription
router.get('/stt/vocal', sttController.transcriptByVocal);

//// Tts Routes
const ttsController = require("../controllers/TtsController");

// Audio file transcription
router.get('/tts/audio', ttsController.convertToAudio);

module.exports = router