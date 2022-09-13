const { nanoid } = require('nanoid');
const randomsting = require('randomstring');

const CONFIG = require('../../../../config/config');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const createOrganization = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const {
      Organization: OrganizationModel,
    } = ctx.models;

    const createDataObj = {
      "name": args.data.name,
      "type": args.data.type,
      "description": args.data.description
    }

    const OrganizationCount = await OrganizationModel.count({ where: { name: args.data.name } });

    if (OrganizationCount) {
      throw new Error(getMessage('ORGANIZATION_EXISTS'));
    }

    const OrganizationInstance = await OrganizationModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('ORGANIZATION_CREATE_SUCCESS'),
    };

    return response;


  } catch (error) {
    logger.error('ERROR FROM create-role>>>', error);
    return error;
  }
};

module.exports = createOrganization;
