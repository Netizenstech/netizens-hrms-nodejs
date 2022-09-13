const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deletePermission = async (_, args, ctx) => {
  try {
    const { models } = ctx;
    const {
      Permission: PermissionModel
    } = models;
    const PermissionInstance = await PermissionModel.findByPk(args.data.id);
    if (!PermissionInstance) {
      throw new ApolloError(getMessage('PERMISSION_NOT_FOUND'));
    }
    await PermissionInstance.destroy();
    return getMessage('PERMISSION_DELETE_SUCCESS');
  } catch (error) {
    logger.error('ERROR WHILE DELETING PERMISSION>>>', error);
    return error;
  }
};

module.exports = deletePermission;
