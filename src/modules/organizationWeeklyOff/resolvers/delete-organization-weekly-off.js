const { ApolloError } = require('apollo-server-express');
const moment = require("moment");

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteOrganization = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            OrganizationWeeklyOff: OrganizationWeeklyOffModel,
        } = models;

        const OrganizationWeeklyOffInstance = await OrganizationWeeklyOffModel.findByPk(args.data.org_weekly_off_id);
        if (!OrganizationWeeklyOffInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_WEEKLY_OFF_NOT_FOUND'), "404");
        }

        await OrganizationWeeklyOffInstance.destroy();


        return { message: getMessage('ORGANIZATION_WEEKLY_OFF_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete ORGANIZATION_WEEKLY_OFF>>>', error);
        // return error;
        throw new ApolloError(error.message, "500");
    }
};

module.exports = deleteOrganization;
