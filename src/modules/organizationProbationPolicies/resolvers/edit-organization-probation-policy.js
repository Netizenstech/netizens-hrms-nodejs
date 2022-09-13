
const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { sequelize } = require('../../../models')
const createOrganizationProbationPolicy = async (_, args, ctx) => {
    try {
        const {
            OrganizationProbationPolicy: OrganizationProbationPolicyModel,
        } = ctx.models;

        const OrganizationProbationPolicyInstance = await OrganizationProbationPolicyModel.findOne({ where: { organization_probation_policy_id: args.data.organization_probation_policy_id } });

        if (!OrganizationProbationPolicyInstance) {
            throw new Error(getMessage('ORGANIZATION_PROBATION_POLICY_EXISTS'), "404");
        }

        const data = {
            allow_to_change_emp_status: args.data.allow_to_change_emp_status || OrganizationProbationPolicyInstance.allow_to_change_emp_status,
            end_emp_probation_automatic: args.data.end_emp_probation_automatic || OrganizationProbationPolicyInstance.end_emp_probation_automatic,
            complete_feedback_before_day: args.data.complete_feedback_before_day || OrganizationProbationPolicyInstance.complete_feedback_before_day,
            end_probation_days_before: args.data.end_probation_days_before || OrganizationProbationPolicyInstance.end_probation_days_before,
            who_give_feedback: args.data.who_give_feedback || OrganizationProbationPolicyInstance.who_give_feedback,
        }
        const OrganizationProbationPolicyInstanceNew = await OrganizationProbationPolicyModel.update(data, { where: { organization_probation_policy_id: args.data.organization_probation_policy_id } }, { returning: true });

        const response = {
            status: 'SUCCESS',
            message: getMessage('ORGANIZATION_PROBATION_POLICY_UPDATE_SUCCESS'),
        };

        return response;


    } catch (error) {
        logger.error('ERROR FROM create ORGANIZATION_PROBATION_POLICY>>>', error);
        // return error;
        throw new ApolloError(error.message, "500");
    }
};

module.exports = createOrganizationProbationPolicy;
