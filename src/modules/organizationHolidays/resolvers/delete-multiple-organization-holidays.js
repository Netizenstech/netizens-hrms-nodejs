const { ApolloError } = require('apollo-server-express');
const moment = require("moment");

const logger = require('../../../logger');
const { Sequelize } = require('../../../models');
const { getMessage } = require('../../../utils/messages');

const deleteMultipleOrganizationHolidays = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            OrganizationHolidays: OrganizationHolidaysModel,
        } = models;
        const OrganizationHolidaysInstance = await OrganizationHolidaysModel.destroy({ where: { org_holiday_id: { [Sequelize.Op.in]: args.data.org_holiday_ids } } });
        
        return { message: getMessage('ORGANIZATION_HOLIDAYS_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete ORGANIZATION_HOLIDAYS>>>', error);
        // return error;
        throw new ApolloError(error.message,"500");
    }
};

module.exports = deleteMultipleOrganizationHolidays;
