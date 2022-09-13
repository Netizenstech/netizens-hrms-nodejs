const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const createTeam = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const {
      Team: TeamModel
    } = ctx.models;

    const createDataObj = {
      title:args.data.title,
      description:args.data.description,
      status:args.data.status,
      priority:args.data.priority,
      timeTracked:args.data.timeTracked,
      estimatedTime:args.data.estimatedTime,
    };

    const taskCount = await TeamModel.count({ where: { title: args.data.title } });

    if (taskCount) {
      throw new Error(getMessage('TEAM_EXISTS'));
    }

    await TeamModel.create(createDataObj, { returning: true });
    // const taskInstance = await TeamModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('TEAM_CREATE_SUCCESS')
    };

    return response;
  } catch (error) {
    logger.error('ERROR FROM create-team>>>', error);
    return error;
  }
};

module.exports = createTeam;
