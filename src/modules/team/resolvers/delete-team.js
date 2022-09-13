const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteTeam = async (_, args, ctx) => {
  try {
    const { models } = ctx;
    const {
      Team: TeamModel
    } = models;
    const TeamInstance = await TeamModel.findByPk(args.data.id);
    if (!TeamInstance) {
      throw new ApolloError(getMessage('TEAM_NOT_FOUND'));
    }
    await TeamInstance.destroy();
    return getMessage('TEAM_DELETE_SUCCESS');
  } catch (error) {
    logger.error('ERROR WHILE DELETING TEAM>>>', error);
    return error;
  }
};

module.exports = deleteTeam;
