const { ApolloError } = require('apollo-server-express');
const moment = require("moment");

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteOrganization = async (_, args, ctx) => {
    try {
        const data = {
            deleted_at: moment(new Date()).format('YYYY-MM-DD h:mm:ss Z')
        };
        const { models, req } = ctx;
        const {
            Organization: OrganizationModel,
        } = models;
        // const { user } = req;

        const OrganizationInstance = await OrganizationModel.findByPk(args.data.organization_id);
        if (!OrganizationInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_NOT_FOUND'));
        }

        await OrganizationInstance.destroy();


        return { message: getMessage('ORGANIZATION_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete Organization>>>', error);
        return error;
    }
};

module.exports = deleteOrganization;
