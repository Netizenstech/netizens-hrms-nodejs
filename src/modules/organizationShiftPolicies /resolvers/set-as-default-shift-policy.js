const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models')
const setAsDefaultOrganizationShiftPolicy = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            OrganizationShiftPolicy: OrganizationShiftPolicyModel,
        } = models;

        const OrganizationPolicyInstance = await OrganizationShiftPolicyModel.findOne({ where: { organization_shift_policy_id: args.data.organization_shift_policy_id } });

        if (!OrganizationPolicyInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_POLICY_NOT_FOUND'), "404");
        }

        const data = {
            set_as_default: args.data.status,
        };
        let updatedOrganizationShiftPolicy = await OrganizationShiftPolicyModel.update(data, { where: { organization_shift_policy_id: args.data.organization_shift_policy_id }, returning: true });

        [, [updatedOrganizationShiftPolicy]] = updatedOrganizationShiftPolicy;

        updatedOrganizationShiftPolicy.message = getMessage('ORGANIZATION_SHIFT_POLICY_UPDATE_SUCCESS');

        return updatedOrganizationShiftPolicy;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING ORGANIZATION_Shift_policy>>>', error);
        // return error;
        throw new ApolloError(error.message, "500");
    }
};

module.exports = setAsDefaultOrganizationShiftPolicy;
