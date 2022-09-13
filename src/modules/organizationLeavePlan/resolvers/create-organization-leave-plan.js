
const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const moment = require('moment');

const createOrganizationLeavePlan = async (_, args, ctx) => {
  try {
    const {
      OrganizationLeavePlan: OrganizationLeavePlanModel,
    } = ctx.models;

    const createDataObj = {
      organization_id: args.data.organization_id,
      name: args.data.name,
      leave_calendar_year_start: moment(new Date(args.data.leave_calendar_year_start)).format('YYYY-MM-DD'),
      leave_calendar_year_end: moment(new Date(args.data.leave_calendar_year_start)).endOf('year').format('YYYY-MM-DD')
    }

    const OrganizationLeavePlanCount = await OrganizationLeavePlanModel.count({ where: { name: args.data.name, organization_id: args.data.organization_id } });

    if (OrganizationLeavePlanCount) {
      throw new Error(getMessage('ORGANIZATION_LEAVE_PLAN_EXISTS'), "409");
    }

    const OrganizationLeavePlanInstance = await OrganizationLeavePlanModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('ORGANIZATION_LEAVE_PLAN_CREATE_SUCCESS'),
    };

    return response;

  } catch (error) {
    logger.error('ERROR FROM create ORGANIZATION_LEAVE_PLAN>>>', error);
    // return error;
    throw new ApolloError(error.message, "500");
  }
};

module.exports = createOrganizationLeavePlan;
