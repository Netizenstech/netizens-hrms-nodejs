const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const getRoleByOrganizationId = async (_, args, ctx) => {
    try {
        
        const { models, req } = ctx;
        const {
            Role: RoleModel,
        } = models;
        
        let userRoles = await RoleModel.findAll( { where: { organization_id: args.data.organization_id }});

        return userRoles;
    } catch (error) {
        logger.error('ERROR WHILE Get ROLE organization id wise>>>', error);
        return error;
    }
};

module.exports = getRoleByOrganizationId;
