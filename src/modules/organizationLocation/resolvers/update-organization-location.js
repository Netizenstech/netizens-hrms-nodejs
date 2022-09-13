const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const {Sequelize} = require('../../../models');
const updateOrganizationLocation = async (_, args, ctx) => {
    try {
        const data = {
            organization_id: args.data.organization_id,
            organization_location: args.data.organization_location,
            time_zone: args.data.time_zone || "",
            country: args.data.country || "",
            state: args.data.state || "",
            address_line_1: args.data.address_line_1 || "",
            address_line_2: args.data.address_line_2 || "",
            city: args.data.city || "",
            zip: args.data.zip || "",
            description: args.data.description || "",
            email: args.data.email || ""
        };
        const { models, req } = ctx;
        const {
            OrganizationLocation: OrganizationLocationModel,
        } = models;

        const OrganizationLocationInstance = await OrganizationLocationModel.findOne({ where: { organization_location_id: args.data.organization_location_id } });

        if (!OrganizationLocationInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_LOCATION_NOT_FOUND'));
        }
        const OrganizationLocationInstance2 = await OrganizationLocationModel.findOne({ where: { organization_id: OrganizationLocationInstance.organization_id, organization_location: args.data.organization_location } });
        if (OrganizationLocationInstance2) {
            throw new ApolloError(getMessage('ORGANIZATION_LOCATION_EXISTS'));
        }
        let updatedOrganizationLocation = await OrganizationLocationModel.update(data, { where: { organization_location_id: args.data.organization_location_id }, returning: true });

        [, [updatedOrganizationLocation]] = updatedOrganizationLocation;

        updatedOrganizationLocation.message = getMessage('ORGANIZATION_LOCATION_UPDATE_SUCCESS');

        return updatedOrganizationLocation;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING ORGANIZATION_LOCATION>>>', error);
        return error;
    }
};

module.exports = updateOrganizationLocation;
