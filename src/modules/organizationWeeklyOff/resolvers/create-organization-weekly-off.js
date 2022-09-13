const { ApolloError } = require('apollo-server-core');
const { nanoid } = require('nanoid');
const randomsting = require('randomstring');

const CONFIG = require('../../../../config/config');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const createOrganizationWeeklyOff = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const {
      OrganizationWeeklyOff: OrganizationWeeklyOffModel,
    } = ctx.models;

    const createDataObj = {
      organization_id: args.data.organization_id,
      weekly_off_name: args.data.weekly_off_name,
      description: args.data.description || "",
      select_days: args.data.select_days || ""
    }

    const OrganizationWeeklyOffCount = await OrganizationWeeklyOffModel.count({ where: { weekly_off_name: args.data.weekly_off_name, organization_id: args.data.organization_id } });

    if (OrganizationWeeklyOffCount) {
      throw new ApolloError(getMessage('ORGANIZATION_WEEKLY_OFF_EXISTS'), "409");
    }

    const OrganizationWeeklyOffInstance = await OrganizationWeeklyOffModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('ORGANIZATION_WEEKLY_OFF_CREATE_SUCCESS'),
    };

    return response;


  } catch (error) {
    logger.error('ERROR FROM ORGANIZATION_WEEKLY_OFF>>>', error);
    // return error;
    throw new ApolloError(error.message, "500");
  }
};

module.exports = createOrganizationWeeklyOff;
