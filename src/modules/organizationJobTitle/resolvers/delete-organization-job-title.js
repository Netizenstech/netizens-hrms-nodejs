const { ApolloError } = require('apollo-server-express');
const moment = require("moment");

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteOrganization = async (_, args, ctx) => {
    try {

        const { models, req } = ctx;
        const {
            OrganizationJobTitle: OrganizationJobTitleModel,
        } = models;
        // const { user } = req;

        const OrganizationJobTitleInstance = await OrganizationJobTitleModel.findByPk(args.data.org_job_title_id);
        if (!OrganizationJobTitleInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_JOB_TITLE_NOT_FOUND'), "404");
        }
        await OrganizationJobTitleInstance.destroy();
        return { message: getMessage('ORGANIZATION_JOB_TITLE_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete ORGANIZATION_JOB_TITLE>>>', error);
        throw new ApolloError(error.message, '500');
    }
};

module.exports = deleteOrganization;
