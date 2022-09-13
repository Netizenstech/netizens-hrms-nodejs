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
      Task: TaskModel
    } = models;
    const TaskInstance = await TaskModel.findOne({ where: { id: args.data.id } });
    if (!TaskInstance) {
      throw new ApolloError(getMessage('TASK_NOT_FOUND'));
    }
    await TaskModel.update(data, { where: { id: args.data.id }, returning: true });
    return getMessage('TASK_UPDATE_SUCCESS');
  } catch (error) {
    logger.error('ERROR WHILE UPDATING TASK>>>', error);
    return error;
  }
};

module.exports = update;
