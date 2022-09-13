const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteOrganizationLocation = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            OrganizationLocation: OrganizationLocationModel,
        } = models;
        const OrganizationLocationInstance = await OrganizationLocationModel.findByPk(args.data.organization_location_id);
        if (!OrganizationLocationInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_LOCATION_NOT_FOUND'), "404");
        }
        await OrganizationLocationInstance.destroy();
        return { message: getMessage('ORGANIZATION_LOCATION_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete ORGANIZATION_LOCATION>>>', error);
        throw new ApolloError(error.message, '500');
    }
};

module.exports = deleteOrganizationLocation;
