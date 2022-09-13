const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const createPermission = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const {
      Permission: PermissionModel
    } = ctx.models;

    const createDataObj = {
      title:args.data.title,
      description:args.data.description,
      status:args.data.status,
      priority:args.data.priority,
      timeTracked:args.data.timeTracked,
      estimatedTime:args.data.estimatedTime,
    };

    const permissionCount = await PermissionModel.count({ where: { title: args.data.title } });

    if (permissionCount) {
      throw new Error(getMessage('PERMISSION_EXISTS'));
    }

    await PermissionModel.create(createDataObj, { returning: true });
    // const permissionInstance = await PermissionModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('PERMISSION_CREATE_SUCCESS')
    };

    return response;
  } catch (error) {
    logger.error('ERROR FROM create-PERMISSION>>>', error);
    return error;
  }
};

module.exports = createPermission;
