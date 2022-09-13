const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const createProject = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const {
      Task: TaskModel
    } = ctx.models;

    const createDataObj = {
      title:args.data.title,
      description:args.data.description,
      status:args.data.status,
      priority:args.data.priority,
      timeTracked:args.data.timeTracked,
      estimatedTime:args.data.estimatedTime,
    };

    const taskCount = await TaskModel.count({ where: { title: args.data.title } });

    if (taskCount) {
      throw new Error(getMessage('TASK_EXISTS'));
    }

    await TaskModel.create(createDataObj, { returning: true });
    // const taskInstance = await TaskModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('TASK_CREATE_SUCCESS')
    };

    return response;
  } catch (error) {
    logger.error('ERROR FROM create-task>>>', error);
    return error;
  }
};

module.exports = createProject;
