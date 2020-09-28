'use strict'
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const fs = require('fs');

const speechToText = new SpeechToTextV1({
  username: '',
  password: '',
  url: ' '
});

const sst = function (req, res, next) {
  apiHelper.getApiKeyForIBM().then((apiKey) => {
    const discoveryClient = new Discovery1({
      authenticator: new IamAuthenticator({apiKey}),
      version: '1'
    })
  })
};

module.exports = sst;
