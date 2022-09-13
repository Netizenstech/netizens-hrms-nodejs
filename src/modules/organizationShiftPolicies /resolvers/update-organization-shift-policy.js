const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models');
const updateOrganizationShiftPolicy = async (_, args, ctx) => {
    try {

        const { models, req } = ctx;
        const {
            OrganizationShiftPolicy: OrganizationShiftPolicyModel,
        } = models;
        // const { user } = req;

        const OrganizationPolicyInstance = await OrganizationShiftPolicyModel.findOne({ where: { organization_shift_policy_id: args.data.organization_shift_policy_id } });

        if (!OrganizationPolicyInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_POLICY_NOT_FOUND'), "404");
        }
        const data = {
            shift_name: args.data.shift_name || OrganizationPolicyInstance.shift_name,
            shift_code: args.data.shift_code || OrganizationPolicyInstance.shift_code,
            description: args.data.description || OrganizationPolicyInstance.description,
            flexible_time: args.data.flexible_time || OrganizationPolicyInstance.flexible_time,
            different_for_different_day_time: args.data.different_for_different_day_time || OrganizationPolicyInstance.different_for_different_day_time,
            different_for_different_day_break: args.data.different_for_different_day_break || OrganizationPolicyInstance.different_for_different_day_break,
            monday_start_time: args.data.monday_start_time || OrganizationPolicyInstance.monday_start_time,
            monday_end_time: args.data.monday_end_time || OrganizationPolicyInstance.monday_end_time,
            tuesday_start_time: args.data.tuesday_start_time || OrganizationPolicyInstance.tuesday_start_time,
            tuesday_end_time: args.data.tuesday_end_time || OrganizationPolicyInstance.tuesday_end_time,
            wednesday_start_time: args.data.wednesday_start_time || OrganizationPolicyInstance.wednesday_start_time,
            wednesday_end_time: args.data.wednesday_end_time || OrganizationPolicyInstance.wednesday_end_time,
            thursday_start_time: args.data.thursday_start_time || OrganizationPolicyInstance.thursday_start_time,
            thursday_end_time: args.data.thursday_end_time || OrganizationPolicyInstance.thursday_end_time,
            friday_start_time: args.data.friday_start_time || OrganizationPolicyInstance.friday_start_time,
            friday_end_time: args.data.friday_end_time || OrganizationPolicyInstance.friday_end_time,
            saturday_start_time: args.data.saturday_start_time || OrganizationPolicyInstance.saturday_start_time,
            saturday_end_time: args.data.saturday_end_time || OrganizationPolicyInstance.saturday_end_time,
            sunday_start_time: args.data.sunday_start_time || OrganizationPolicyInstance.sunday_start_time,
            sunday_end_time: args.data.sunday_end_time || OrganizationPolicyInstance.sunday_end_time,
            monday_break_time: args.data.monday_break_time || OrganizationPolicyInstance.monday_break_time,
            tuesday_break_time: args.data.tuesday_break_time || OrganizationPolicyInstance.tuesday_break_time,
            wednesday_break_time: args.data.wednesday_break_time || OrganizationPolicyInstance.wednesday_break_time,
            thursday_break_time: args.data.thursday_break_time || OrganizationPolicyInstance.thursday_break_time,
            friday_break_time: args.data.friday_break_time || OrganizationPolicyInstance.friday_break_time,
            saturday_break_time: args.data.saturday_break_time || OrganizationPolicyInstance.saturday_break_time,
            sunday_break_time: args.data.sunday_break_time || OrganizationPolicyInstance.sunday_break_time,
            monday_total_work_hour:args.data.monday_total_work_hour || OrganizationPolicyInstance.monday_total_work_hour,
            tuesday_total_work_hour:args.data.tuesday_total_work_hour || OrganizationPolicyInstance.tuesday_total_work_hour,
            wednesday_total_work_hour:args.data.wednesday_total_work_hour || OrganizationPolicyInstance.wednesday_total_work_hour,
            thursday_total_work_hour:args.data.thursday_total_work_hour || OrganizationPolicyInstance.thursday_total_work_hour,
            friday_total_work_hour:args.data.friday_total_work_hour || OrganizationPolicyInstance.friday_total_work_hour,
            saturday_total_work_hour:args.data.saturday_total_work_hour || OrganizationPolicyInstance.saturday_total_work_hour,
            sunday_total_work_hour:args.data.sunday_total_work_hour || OrganizationPolicyInstance.sunday_total_work_hour,
        };
        let updatedOrganizationShiftPolicy = await OrganizationShiftPolicyModel.update(data, { where: { organization_shift_policy_id: args.data.organization_shift_policy_id }, returning: true });

        [, [updatedOrganizationShiftPolicy]] = updatedOrganizationShiftPolicy;

        updatedOrganizationShiftPolicy.message = getMessage('ORGANIZATION_SHIFT_POLICY_UPDATE_SUCCESS');

        return updatedOrganizationShiftPolicy;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING ORGANIZATION_SHIFT_POLICY>>>', error);
        throw new ApolloError(error.message, "500");
        // return error;
    }
};

module.exports = updateOrganizationShiftPolicy;
