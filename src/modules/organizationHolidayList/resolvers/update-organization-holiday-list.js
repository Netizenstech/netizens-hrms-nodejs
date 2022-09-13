const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models');
const updateOrganizationHolidayList = async (_, args, ctx) => {
    try {

        const { models, req } = ctx;
        const {
            OrganizationHolidayList: OrganizationHolidayListModel,
        } = models;

        const OrganizationHolidayListInstance = await OrganizationHolidayListModel.findOne({ where: { org_holiday_list_id: args.data.org_holiday_list_id } });

        if (!OrganizationHolidayListInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_HOLIDAY_LIST_NOT_FOUND'), '404');
        }
        const data = {
            holiday_list_name: args.data.holiday_list_name || OrganizationHolidayListInstance.holiday_list_name,
            description: args.data.description || OrganizationHolidayListInstance.description
        };
        let updatedOrganizationHolidayList = await OrganizationHolidayListModel.update(data, { where: { org_holiday_list_id: args.data.org_holiday_list_id }, returning: true });

        [, [updatedOrganizationHolidayList]] = updatedOrganizationHolidayList;

        updatedOrganizationHolidayList.message = getMessage('ORGANIZATION_HOLIDAY_LIST_UPDATE_SUCCESS');

        return updatedOrganizationHolidayList;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING ORGANIZATION_HOLIDAY_LIST>>>', error);
        throw new ApolloError(error.message, '500');
        // return error;
    }
};

module.exports = updateOrganizationHolidayList;
