const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteOrganizationProbationPolicy = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            OrganizationProbationPolicy: OrganizationProbationPolicyModel,
        } = models;
        // const { user } = req;
        const OrganizationProbationPolicyInstance = await OrganizationProbationPolicyModel.findByPk(args.data.organization_probation_policy_id);
        if (!OrganizationProbationPolicyInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_PROBATION_POLICY_NOT_FOUND'), "404");
        }
        await OrganizationProbationPolicyInstance.destroy();
        return { message: getMessage('ORGANIZATION_PROBATION_POLICY_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete ORGANIZATION_PROBATION_POLICY>>>', error);
        throw new ApolloError(error.message, '500');
    }
};

module.exports = deleteOrganizationProbationPolicy;
