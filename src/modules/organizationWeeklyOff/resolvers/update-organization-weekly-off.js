const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models')
const updateOrganizationWeeklyOff = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            OrganizationWeeklyOff: OrganizationWeeklyOffModel,
        } = models;

        const OrganizationWeeklyOffInstance = await OrganizationWeeklyOffModel.findOne({ where: { org_weekly_off_id: args.data.org_weekly_off_id } });

        if (!OrganizationWeeklyOffInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_WEEKLY_OFF_NOT_FOUND'),"404");
        }

        const data = {
            weekly_off_name: args.data.weekly_off_name || OrganizationWeeklyOffInstance.weekly_off_name,
            description: args.data.description || OrganizationWeeklyOffInstance.description,
            select_days: args.data.select_days || OrganizationWeeklyOffInstance.select_days
        };
        let updatedOrganizationWeeklyOff = await OrganizationWeeklyOffModel.update(data, { where: { org_weekly_off_id: args.data.org_weekly_off_id }, returning: true });

        [, [updatedOrganizationWeeklyOff]] = updatedOrganizationWeeklyOff;

        updatedOrganizationWeeklyOff.message = getMessage('ORGANIZATION_WEEKLY_OFF_UPDATE_SUCCESS');

        return updatedOrganizationWeeklyOff;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING ORGANIZATION_WEEKLY_OFF>>>', error);
        // return error;
        throw new ApolloError(error.message,"500");
    }
};

module.exports = updateOrganizationWeeklyOff;
