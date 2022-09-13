const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const update = async (_, args, ctx) => {
  try {
    const data = {
      title: args.data.title,
      description: args.data.description
    };
    const { models } = ctx;
    const {
      Role: RoleModel
    } = models;
    const RoleInstance = await RoleModel.findOne({ where: { id: args.data.id } });
    if (!RoleInstance) {
      throw new ApolloError(getMessage('ROLE_NOT_FOUND'));
    }
    await RoleModel.update(data, { where: { id: args.data.id }, returning: true });
    return getMessage('ROLE_UPDATE_SUCCESS');
  } catch (error) {
    logger.error('ERROR WHILE UPDATING ROLE>>>', error);
    return error;
  }
};

module.exports = update;
