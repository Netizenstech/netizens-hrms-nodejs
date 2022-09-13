const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models');
const configureAssignedLeaveType = async (_, args, ctx) => {
    try {
        
        const { models, req } = ctx;
        const {
            OrganizationLeavePlanAssigned: OrganizationLeavePlanAssignedAssignedModel,
        } = models;

        const OrganizationLeavePlanAssignedInstance = await OrganizationLeavePlanAssignedAssignedModel.findOne({ where: { organization_leave_plan_assigned_id: args.data.organization_leave_plan_assigned_id } });

        if (!OrganizationLeavePlanAssignedInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_LEAVE_PLAN_NOT_FOUND'), "404");
        }

        const data = {
            leave_limit: args.data.leave_limit || OrganizationLeavePlanAssignedInstance,
            unlimited: args.data.unlimited || OrganizationLeavePlanAssignedInstance.unlimited,
            apply_being_accrued: args.data.apply_being_accrued || OrganizationLeavePlanAssignedInstance.apply_being_accrued,
            beyond_annual_quota: args.data.beyond_annual_quota || OrganizationLeavePlanAssignedInstance.beyond_annual_quota,
            not_excluding_day: args.data.not_excluding_day || OrganizationLeavePlanAssignedInstance.not_excluding_day,
            is_leave_quota_allocated_to_join_month: args.data.is_leave_quota_allocated_to_join_month || OrganizationLeavePlanAssignedInstance.is_leave_quota_allocated_to_join_month,
            month: args.data.month || OrganizationLeavePlanAssignedInstance.month,
            credit_to_his_reports: args.data.credit_to_his_reports || OrganizationLeavePlanAssignedInstance.credit_to_his_reports,
        };

        let updatedOrganizationLeavePlanAssigned = await OrganizationLeavePlanAssignedAssignedModel.update(data, { where: { organization_leave_plan_assigned_id: args.data.organization_leave_plan_assigned_id }, returning: true });

        [, [updatedOrganizationLeavePlanAssigned]] = updatedOrganizationLeavePlanAssigned;

        updatedOrganizationLeavePlanAssigned.message = getMessage('ORGANIZATION_LEAVE_ASSIGNED_UPDATE_SUCCESS');

        return updatedOrganizationLeavePlanAssigned;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING ORGANIZATION_LEAVE_ASSIGNED>>>', error);
        throw new ApolloError(error.message, "500");
        // return error;
    }
};

module.exports = configureAssignedLeaveType;
