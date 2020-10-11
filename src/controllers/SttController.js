const transcriptByAudio = async (req, res) => {
    // Imports the Google Cloud client library
    const speech = require('@google-cloud/speech');
    const fs = require('fs');

    // Creates a client
    const client = new speech.SpeechClient();

    // The name of the audio file to transcribe
    const fileName = __dirname + '/../resources/audio.wav';

    // Reads a local audio file and converts it to base64
    const file = fs.readFileSync(fileName);
    const audioBytes = file.toString('base64');

    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
        content: audioBytes,    //if it's distant file, use "uri: link" to set it
    };
    const config = {
        encoding: 'LINEAR16',
        languageCode: 'fr-FR',
    };
    const request = {
        audio: audio,
        config: config,
    };

    // Detects speech in the audio file. This creates a recognition job that you
    // can wait for now, or get its result later.
    const [operation] = await client.longRunningRecognize(request);

    // Get a Promise representation of the final result of the job
    const [response] = await operation.promise();
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    res.send(`${transcription}`);
}

const transcriptByVocal = async (req, res, next) => {
    const recorder = require('node-record-lpcm16');

    // Imports the Google Cloud client library
    const speech = require('@google-cloud/speech');

    // Creates a client
    const client = new speech.SpeechClient();

    const request = {
        config: {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'fr-FR',
        },
        interimResults: false, // If you want interim results, set this to true
    };

    // Create a recognize stream
    const recognizeStream = await client
        .streamingRecognize(request)
        .on('error', console.error)
        .on('data', data => {
            res.send(
                data.results[0] && data.results[0].alternatives[0]
                    ? `${data.results[0].alternatives[0].transcript}\n`
                    : '\n\nReached transcription time limit, please restart\n'
            )
        });

    // Start recording and send the microphone input to the Speech API.
    await recorder
        .record({
            sampleRateHertz: 16000,
            threshold: 0,
            verbose: false,
            recordProgram: 'rec', // Try also "arecord" or "sox"
            silence: '10.0',
        })
        .stream()
        .on('error', console.error)
        .pipe(recognizeStream);
}

module.exports = {transcriptByAudio, transcriptByVocal}