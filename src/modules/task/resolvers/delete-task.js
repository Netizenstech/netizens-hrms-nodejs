const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteTask = async (_, args, ctx) => {
  try {
    const { models } = ctx;
    const {
      Task: TaskModel
    } = models;
    const TaskInstance = await TaskModel.findByPk(args.data.id);
    if (!TaskInstance) {
      throw new ApolloError(getMessage('TASK_NOT_FOUND'));
    }
    await TaskInstance.destroy();
    return getMessage('TASK_DELETE_SUCCESS');
  } catch (error) {
    logger.error('ERROR WHILE DELETING TASK>>>', error);
    return error;
  }
};

module.exports = deleteTask;
