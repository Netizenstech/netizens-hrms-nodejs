const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models');
const updateOrganizationPolicy = async (_, args, ctx) => {
    try {
        
        const { models, req } = ctx;
        const {
            OrganizationLeavePlan: OrganizationLeavePlanModel,
        } = models;

        const OrganizationLeavePlanInstance = await OrganizationLeavePlanModel.findOne({ where: { organization_leave_plan_id: args.data.organization_leave_plan_id } });

        if (!OrganizationLeavePlanInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_LEAVE_PLAN_NOT_FOUND'), "404");
        }

        const data = {
            name: args.data.name,
            leave_calendar_year_start: args.data.leave_calendar_year_start,
        };

        let updatedOrganizationLeavePlan = await OrganizationLeavePlanModel.update(data, { where: { organization_leave_plan_id: args.data.organization_leave_plan_id }, returning: true });

        [, [updatedOrganizationLeavePlan]] = updatedOrganizationLeavePlan;

        updatedOrganizationLeavePlan.message = getMessage('ORGANIZATION_LEAVE_PLAN_UPDATE_SUCCESS');

        return updatedOrganizationLeavePlan;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING ORGANIZATION_LEAVE_PLAN>>>', error);
        throw new ApolloError(error.message, "500");
        // return error;
    }
};

module.exports = updateOrganizationPolicy;
