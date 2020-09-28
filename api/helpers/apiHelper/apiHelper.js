'use strict';
const apis = require('./apis.json');

const getApiKeyForIBM = function () {
  return new Promise((resolve, rejected) => {
    resolve(apis["1"].value);
  });
};

module.exports = {getApiKeyForIBM};