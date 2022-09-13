const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const updateRole = async (_, args, ctx) => {
    try {
        const data = {
            title: args.data.title,
            organization_id: args.data.organization_id || ""
        };
        const { models, req } = ctx;
        const {
            Role: RoleModel,
        } = models;
        // const { user } = req;

        const RoleInstance = await RoleModel.findOne({ where: { role_id: args.data.role_id } });

        if (!RoleInstance) {
            throw new ApolloError(getMessage('ROLE_NOT_FOUND'));
        }

        let updatedRole = await RoleModel.update(data, { where: { role_id: args.data.role_id }, returning: true });

        [, [updatedRole]] = updatedRole;

        updatedRole.message = getMessage('ROLE_UPDATE_SUCCESS');

        return updatedRole;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING ROLE>>>', error);
        return error;
    }
};

module.exports = updateRole;
