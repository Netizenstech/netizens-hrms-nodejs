const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const createProject = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const {
      Project: ProjectModel
    } = ctx.models;

    const createDataObj = {
      title: args.data.title,
      description: args.data.description
    };

    const projectCount = await ProjectModel.count({ where: { title: args.data.title } });

    if (projectCount) {
      throw new Error(getMessage('PROJECT_EXISTS'));
    }

    await ProjectModel.create(createDataObj, { returning: true });
    // const projectInstance = await ProjectModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('PROJECT_CREATE_SUCCESS')
    };

    return response;
  } catch (error) {
    logger.error('ERROR FROM create-project>>>', error);
    return error;
  }
};

module.exports = createProject;
