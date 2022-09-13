const { nanoid } = require('nanoid');
const randomsting = require('randomstring');

const CONFIG = require('../../../../config/config');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const createRole = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const {
      Role: RoleModel,
    } = ctx.models;

    const createDataObj= {
      "title" : args.data.title,
      "organization_id": args.data.organization_id || ""
    }

    const RoleCount = await RoleModel.count({ where: { title: args.data.title } });

    if (RoleCount) {
      throw new Error(getMessage('ROLE_NOT_FOUND'));
    }

    const RoleInstance = await RoleModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('ROLE_CREATE_SUCCESS'),
    };

    return response;
  } catch (error) {
    logger.error('ERROR FROM create-role>>>', error);
    return error;
  }
};

module.exports = createRole;
