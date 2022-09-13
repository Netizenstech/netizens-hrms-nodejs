const { merge } = require('lodash');
const request = require('request');

const CONFIG = require('../../../../config/config');
const logger = require('../../../logger');

module.exports = async (url, data) => {
  const appData = {
    applicationId: CONFIG.emailServer.appId,
    secretKey: CONFIG.emailServer.secretKey
  };
  const reqObj = {
    url,
    body: merge(appData, data),
    json: true,
    headers: {
      'content-type': 'application/json'
    }
  };
  logger.info('EMAIL REQ OBJ > ', reqObj);
  // Default options are marked with *
  request.post(reqObj, (error, response, body) => {
    if (error) {
      logger.error('ERROR > MAIL API > ', error);
    } else {
      logger.info('STATUS CODE > ', response.statusCode);
      logger.info('RESP BODY > ', body);
    }
  });
};
