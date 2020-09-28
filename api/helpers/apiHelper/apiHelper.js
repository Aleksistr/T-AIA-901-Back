'use strict';
const apis = require('./apis.json');

const getApiKeyForIBM = function () {
  return new Promise((resolve, rejected) => {
    resolve({
      value: api[1].value,
      url: api[1].url
    });
  });
};

module.exports = {getApiKeyForIBM};