const { nanoid } = require('nanoid');
const randomsting = require('randomstring');

const CONFIG = require('../../../../config/config');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const createOrganizationHolidays = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const {
      OrganizationHolidays: OrganizationHolidaysModel,
    } = ctx.models;

    const createDataObj = {
      org_holiday_list_id: args.data.org_holiday_list_id,
      holiday_name: args.data.holiday_name,
      organization_id: args.data.organization_id,
      description: args.data.description || "",
      date: args.data.date,
      is_floater: args.data.is_floater || false
    }

    const OrganizationHolidaysCount = await OrganizationHolidaysModel.count({ where: { holiday_name: args.data.holiday_name, org_holiday_list_id: args.data.org_holiday_list_id, date: args.data.date } });

    if (OrganizationHolidaysCount) {
      throw new Error(getMessage('ORGANIZATION_HOLIDAYS_EXISTS'), "409");
    }

    const OrganizationHolidaysInstance = await OrganizationHolidaysModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('ORGANIZATION_HOLIDAYS_CREATE_SUCCESS'),
    };

    return response;

  } catch (error) {
    logger.error('ERROR FROM ORGANIZATION_HOLIDAYS>>>', error);
    // return error;
    throw new ApolloError(error.message, "500");
  }
};

module.exports = createOrganizationHolidays;
