const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteOrganizationBusinessUnit = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            OrganizationBusinessUnit: OrganizationBusinessUnitModel,
        } = models;
        // const { user } = req;
        const OrganizationBusinessUnitInstance = await OrganizationBusinessUnitModel.findByPk(args.data.organization_business_unit_id);
        if (!OrganizationBusinessUnitInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_BUSINESS_UNIT_NOT_FOUND'), "404");
        }
        await OrganizationBusinessUnitInstance.destroy();
        return { message: getMessage('ORGANIZATION_BUSINESS_UNIT_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete ORGANIZATION_BUSINESS_UNIT>>>', error);
        throw new ApolloError(error.message, '500');
    }
};

module.exports = deleteOrganizationBusinessUnit;
