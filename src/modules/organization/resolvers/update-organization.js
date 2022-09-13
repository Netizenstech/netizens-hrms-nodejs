const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const {Sequelize} = require('../../../models')
const update = async (_, args, ctx) => {
    try {
        const data = {
            "name": args.data.name,
            "type": args.data.type,
            "description": args.data.description
        };
        const { models, req } = ctx;
        const {
            Organization: OrganizationModel,
        } = models;
        // const { user } = req;

        const OrganizationInstance = await OrganizationModel.findOne({ where: { organization_id: args.data.organization_id } });

        if (!OrganizationInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_NOT_FOUND'));
        }
        const OrganizationInstance2 = await OrganizationModel.findOne({ where: { organization_id: { [Sequelize.Sequelize.Op.ne]: args.data.organization_id }, name: args.data.name } });
        if (OrganizationInstance2) {
            throw new ApolloError(getMessage('ORGANIZATION_EXISTS'));
        }
        let updatedOrganization = await OrganizationModel.update(data, { where: { organization_id: args.data.organization_id }, returning: true });

        [, [updatedOrganization]] = updatedOrganization;

        updatedOrganization.message = getMessage('ORGANIZATION_UPDATE_SUCCESS');

        return updatedOrganization;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING ORGANIZATION>>>', error);
        return error;
    }
};

module.exports = update;
