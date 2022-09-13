const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteOrganizationShiftPolicy = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            OrganizationShiftPolicy: OrganizationShiftPolicyModel,
        } = models;
        // const { user } = req;
        const OrganizationShiftPolicyInstance = await OrganizationShiftPolicyModel.findByPk(args.data.organization_shift_policy_id);
        if (!OrganizationShiftPolicyInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_SHIFT_POLICY_NOT_FOUND'), "404");
        }
        await OrganizationShiftPolicyInstance.destroy();
        return { message: getMessage('ORGANIZATION_SHIFT_POLICY_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete ORGANIZATION_SHIFT_POLICY>>>', error);
        throw new ApolloError(error.message, '500');
    }
};

module.exports = deleteOrganizationShiftPolicy;
