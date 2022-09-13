const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models')
const updateOrganizationHolidays = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            OrganizationHolidays: OrganizationHolidaysModel,
        } = models;
        // const { user } = req;

        const OrganizationHolidaysInstance = await OrganizationHolidaysModel.findOne({ where: { org_holiday_id: args.data.org_holiday_id } });

        if (!OrganizationHolidaysInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_HOLIDAYS_NOT_FOUND'), "404");
        }
        const data = {
            holiday_name: args.data.holiday_name || OrganizationHolidaysInstance.holiday_name,
            description: args.data.description || OrganizationHolidaysInstance.description,
            date: args.data.date || OrganizationHolidaysInstance.date,
            is_floater: args.data.is_floater || false
        };
        let updatedOrganizationHolidays = await OrganizationHolidaysModel.update(data, { where: { org_holiday_id: args.data.org_holiday_id }, returning: true });

        [, [updatedOrganizationHolidays]] = updatedOrganizationHolidays;

        updatedOrganizationHolidays.message = getMessage('ORGANIZATION_HOLIDAYS_UPDATE_SUCCESS');

        return updatedOrganizationHolidays;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING ORGANIZATION_HOLIDAYS>>>', error);
        // return error;
        throw new ApolloError(error.message, "500");
    }
};

module.exports = updateOrganizationHolidays;
