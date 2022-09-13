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
      Permission: PermissionModel
    } = models;
    const PermissionInstance = await PermissionModel.findOne({ where: { id: args.data.id } });
    if (!PermissionInstance) {
      throw new ApolloError(getMessage('PERMISSION_NOT_FOUND'));
    }
    await PermissionModel.update(data, { where: { id: args.data.id }, returning: true });
    return getMessage('PERMISSION_UPDATE_SUCCESS');
  } catch (error) {
    logger.error('ERROR WHILE UPDATING PERMISSION>>>', error);
    return error;
  }
};

module.exports = update;
