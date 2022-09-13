const { ApolloError } = require('apollo-server-express');
const moment = require("moment");

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteRole = async (_, args, ctx) => {
    try {
        const data = {
            deleted_at: moment(new Date()).format('YYYY-MM-DD h:mm:ss Z')
        };
        const { models, req } = ctx;
        const {
            Role: RoleModel,
        } = models;
        // const { user } = req;

        const RoleInstance = await RoleModel.findOne({ where: { id: args.data.id } });

        if (!RoleInstance) {
            throw new ApolloError(getMessage('ROLE_NOT_FOUND'));
        }

        let updatedRole = await RoleModel.update(data, { where: { id: args.data.id }});

        // [, [updatedRole]] = updatedRole;

        updatedRole.message = getMessage('ROLE_DELETE_SUCCESS');

        return updatedRole;
    } catch (error) {
        logger.error('ERROR WHILE Delete Role>>>', error);
        return error;
    }
};

module.exports = deleteRole;
