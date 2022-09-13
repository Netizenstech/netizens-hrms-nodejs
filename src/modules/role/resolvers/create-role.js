const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const createRole = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const {
      Role: RoleModel
    } = ctx.models;

    const createDataObj = {
      title:args.data.title,
      description:args.data.description,
      status:args.data.status,
      priority:args.data.priority,
      timeTracked:args.data.timeTracked,
      estimatedTime:args.data.estimatedTime,
    };

    const roleCount = await RoleModel.count({ where: { title: args.data.title } });

    if (roleCount) {
      throw new Error(getMessage('ROLE_EXISTS'));
    }

    await RoleModel.create(createDataObj, { returning: true });
    // const roleInstance = await RoleModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('ROLE_CREATE_SUCCESS')
    };

    return response;
  } catch (error) {
    logger.error('ERROR FROM create-ROLE>>>', error);
    return error;
  }
};

module.exports = createRole;
