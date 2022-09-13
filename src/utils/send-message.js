/* eslint-disable global-require */
const CONFIG = require('../../config/config');
const logger = require('../logger');

const textMessage = async data => {
  const { accountSid } = CONFIG.twilio;
  const { authToken } = CONFIG.twilio;
  const { fromPhoneNumber } = CONFIG.twilio;
  const client = require('twilio')(accountSid, authToken);

  client.messages.create({
    body: data.body,
    from: fromPhoneNumber,
    to: data.to
  }, (error, message) => {
    if (error) {
      logger.error(error);
    } else {
      logger.info(message.sid);
    }
  });
};

module.exports = textMessage;
