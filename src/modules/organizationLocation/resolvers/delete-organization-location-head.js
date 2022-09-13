const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteOrganizationLocation = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            OrganizationLocationHead: OrganizationLocationHeadModel
        } = models;
        const OrganizationLocationHeadInstance = await OrganizationLocationHeadModel.findByPk(args.data.organization_location_head_id);
        if (!OrganizationLocationHeadInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_LOCATION_HEAD_NOT_FOUND'), "404");
        }
        await OrganizationLocationHeadInstance.destroy();
        return { message: getMessage('ORGANIZATION_LOCATION_HEAD_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete ORGANIZATION_LOCATION_HEAD>>>', error);
        throw new ApolloError(error.message, '500');
    }
};

module.exports = deleteOrganizationLocation;
