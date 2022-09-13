
const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const createOrganizationHolidayList = async (_, args, ctx) => {
  try {
    const {
      OrganizationHolidayList: OrganizationHolidayListModel,
    } = ctx.models;

    const createDataObj = {
      organization_id: args.data.organization_id,
      holiday_list_name: args.data.holiday_list_name,
      description: args.data.description || ""
    }
  
    const OrganizationHolidayListCount = await OrganizationHolidayListModel.count({ where: { holiday_list_name: args.data.holiday_list_name, organization_id : args.data.organization_id } });

    if (OrganizationHolidayListCount) {
      throw new ApolloError(getMessage('ORGANIZATION_HOLIDAY_LIST_EXISTS'), "409");
    }

    const OrganizationHolidayListInstance = await OrganizationHolidayListModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('ORGANIZATION_HOLIDAY_LIST_CREATE_SUCCESS'),
    };

    return response;

  } catch (error) {
    logger.error('ERROR FROM create ORGANIZATION_HOLIDAY_LIST>>>', error);
    // return error;
    throw new ApolloError(error.message, "500");
  }
};

module.exports = createOrganizationHolidayList;
