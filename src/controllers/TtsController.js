const statusCode = require('http-status-codes');

// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

const convertToAudio = async (req, res) => {
    if (!req.body.text_to_speech) {
        return res.status(statusCode.BAD_REQUEST)
            .json('text_to_speech field is required in body params');
    }

    // The text to synthesize
    const text = req.body.text_to_speech;

    // Construct the request
    const request = {
        input: {text: text},
        // Select the language and SSML voice gender (optional)
        voice: {languageCode: 'fr-FR', ssmlGender: 'NEUTRAL'},
        // select the type of audio encoding
        audioConfig: {audioEncoding: 'LINEAR16'},
    };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(__dirname + '/../resources/output.wav', response.audioContent);
    return res.status(statusCode.OK)
        .json('OK');
}

module.exports = {convertToAudio}