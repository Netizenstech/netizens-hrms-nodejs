const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteOrganizationHolidays = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            OrganizationHolidays: OrganizationHolidaysModel,
        } = models;
    
        const OrganizationHolidaysInstance = await OrganizationHolidaysModel.findByPk(args.data.org_holiday_id);
        if (!OrganizationHolidaysInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_HOLIDAYS_NOT_FOUND'), "404");
        }

        await OrganizationHolidaysInstance.destroy();

        return { message: getMessage('ORGANIZATION_HOLIDAYS_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete ORGANIZATION_HOLIDAYS>>>', error);
        // return error;
        throw new ApolloError(error.message, "500");
    }
};

module.exports = deleteOrganizationHolidays;
