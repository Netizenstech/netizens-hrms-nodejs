const { ApolloError } = require('apollo-server-express');
const status = require('http-status');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const userById = async (_, args, ctx) => {
  try {
    const { models, req } = ctx;
    const {
      User: UserModel
    } = models;
    const { user: userObj } = req;
    
    const userInstance = await UserModel.findByPk(userObj.id);

    if (!userInstance) {
      throw new ApolloError(getMessage('USER_NOT_FOUND'),status.NOT_FOUND);
      // throw new ApolloError(getMessage('USER_NOT_FOUND'),'401');
    }

    return userInstance;
  } catch (error) {
    logger.error('ERROR WHILE FETCHING user>>>', error);
    throw error;
  }
};

module.exports = userById;
