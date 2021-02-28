const statusCode = require('http-status-codes');

const convertToAudio = async (req, res) => {
    if (!req.body.text_to_speech) {
        return res.status(statusCode.BAD_REQUEST)
            .json('text_to_speech field is required in body params');
    }

    return res.status(statusCode.OK)
        .json(req.body.text_to_speech);
}

module.exports = {convertToAudio}