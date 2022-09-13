const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteOrganizationBusinessUnit = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            OrganizationBusinessUnitHead: OrganizationBusinessUnitHeadModel
        } = models;
        const OrganizationBusinessUnitHeadInstance = await OrganizationBusinessUnitHeadModel.findByPk(args.data.org_business_unit_head_id);
        if (!OrganizationBusinessUnitHeadInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_BUSINESS_UNIT_HEAD_NOT_FOUND'), "404");
        }
        await OrganizationBusinessUnitHeadInstance.destroy();
        return { message: getMessage('ORGANIZATION_BUSINESS_UNIT_HEAD_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete ORGANIZATION_BUSINESS_UNIT>>>', error);
        throw new ApolloError(error.message, '500');
    }
};

module.exports = deleteOrganizationBusinessUnit;
