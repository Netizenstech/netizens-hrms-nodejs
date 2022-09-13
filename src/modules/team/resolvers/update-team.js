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
      Team: TeamModel
    } = models;
    const TeamInstance = await TeamModel.findOne({ where: { id: args.data.id } });
    if (!TeamInstance) {
      throw new ApolloError(getMessage('TEAM_NOT_FOUND'));
    }
    await TeamModel.update(data, { where: { id: args.data.id }, returning: true });
    return getMessage('TEAM_UPDATE_SUCCESS');
  } catch (error) {
    logger.error('ERROR WHILE UPDATING TEAM>>>', error);
    return error;
  }
};

module.exports = update;
