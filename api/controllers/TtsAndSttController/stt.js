'use strict'
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const fs = require('fs');
const axios = require('axios');

const speechToText = new SpeechToTextV1({
  username: '',
  password: '',
  url: ' '
});

const sst = function (req, res, next) {
  apiHelper.getApiKeyForIBM().then((credentials) => {
    axios({
      method: 'post',
      url: credentials.url,
      
    })
  });
};

module.exports = sst;
