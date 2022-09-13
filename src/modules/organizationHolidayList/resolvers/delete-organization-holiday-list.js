const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteOrganizationHolidayList = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            OrganizationHolidayList: OrganizationHolidayListModel,
        } = models;
        const OrganizationHolidayListInstance = await OrganizationHolidayListModel.findByPk(args.data.org_holiday_list_id);
        if (!OrganizationHolidayListInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_HOLIDAY_LIST_NOT_FOUND'), "404");
        }
        await OrganizationHolidayListInstance.destroy();
        return { message: getMessage('ORGANIZATION_HOLIDAY_LIST_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete ORGANIZATION_HOLIDAY_LIST>>>', error);
        throw new ApolloError(error.message, '500');
    }
};

module.exports = deleteOrganizationHolidayList;
