
const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const createOrganizationShiftPolicy = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const {
      OrganizationShiftPolicy: OrganizationShiftPolicyModel,
    } = ctx.models;

    const createDataObj = {
      organization_id: args.data.organization_id || null,
      shift_name: args.data.shift_name,
      shift_code: args.data.shift_code,
      description: args.data.description || "",
      flexible_time: args.data.flexible_time || false,
      different_for_different_day_time: args.data.different_for_different_day_time || false,
      different_for_different_day_break: args.data.different_for_different_day_break || false,
      monday_start_time: args.data.monday_start_time || "",
      monday_end_time: args.data.monday_end_time || "",
      tuesday_start_time: args.data.tuesday_start_time || "",
      tuesday_end_time: args.data.tuesday_end_time || "",
      wednesday_start_time: args.data.wednesday_start_time || "",
      wednesday_end_time: args.data.wednesday_end_time || "",
      thursday_start_time: args.data.thursday_start_time || "",
      thursday_end_time: args.data.thursday_end_time || "",
      friday_start_time: args.data.friday_start_time || "",
      friday_end_time: args.data.friday_end_time || "",
      saturday_start_time: args.data.saturday_start_time || "",
      saturday_end_time: args.data.saturday_end_time || "",
      sunday_start_time: args.data.sunday_start_time || "",
      sunday_end_time: args.data.sunday_end_time || "",
      monday_break_time:args.data.monday_break_time || "",
      tuesday_break_time:args.data.tuesday_break_time || "",
      wednesday_break_time:args.data.wednesday_break_time || "",
      thursday_break_time:args.data.thursday_break_time || "",
      friday_break_time:args.data.friday_break_time || "",
      saturday_break_time:args.data.saturday_break_time || "",
      sunday_break_time:args.data.sunday_break_time || "",
      monday_total_work_hour:args.data.monday_total_work_hour || "",
      tuesday_total_work_hour:args.data.tuesday_total_work_hour || "",
      wednesday_total_work_hour:args.data.wednesday_total_work_hour || "",
      thursday_total_work_hour:args.data.thursday_total_work_hour || "",
      friday_total_work_hour:args.data.friday_total_work_hour || "",
      saturday_total_work_hour:args.data.saturday_total_work_hour || "",
      sunday_total_work_hour:args.data.sunday_total_work_hour || "",
    }
    var organizationValue = args.data.organization_id || null;
    const OrganizationShiftPolicyCount = await OrganizationShiftPolicyModel.count({ where: { shift_name: args.data.shift_name, organization_id : organizationValue } });

    if (OrganizationShiftPolicyCount) {
      throw new Error(getMessage('ORGANIZATION_SHIFT_POLICY_EXISTS'), "409");
    }

    const OrganizationShiftPolicyInstance = await OrganizationShiftPolicyModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('ORGANIZATION_SHIFT_POLICY_CREATE_SUCCESS'),
    };

    return response;


  } catch (error) {
    logger.error('ERROR FROM create ORGANIZATION_SHIFT_POLICY>>>', error);
    // return error;
    throw new ApolloError(error.message, "500");
  }
};

module.exports = createOrganizationShiftPolicy;
