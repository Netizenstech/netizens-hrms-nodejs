const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteRole = async (_, args, ctx) => {
  try {
    const { models } = ctx;
    const {
      Role: RoleModel
    } = models;
    const RoleInstance = await RoleModel.findByPk(args.data.id);
    if (!RoleInstance) {
      throw new ApolloError(getMessage('ROLE_NOT_FOUND'));
    }
    await RoleInstance.destroy();
    return getMessage('ROLE_DELETE_SUCCESS');
  } catch (error) {
    logger.error('ERROR WHILE DELETING ROLE>>>', error);
    return error;
  }
};

module.exports = deleteRole;
