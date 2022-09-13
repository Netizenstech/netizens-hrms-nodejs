const mongoose = require('mongoose');
const config = require('../../../config/config');
const logger = require('./../../logger');

mongoDBInit = async () => {
  await mongoose.connect(config.mongoose.url, config.mongoose.options);
  logger.info('Connected to MongoDB');
};

module.exports = { mongoDBInit };
module.exports.Channel = require('./chat-message.model');
module.exports.Chat = require('./channel.model');
