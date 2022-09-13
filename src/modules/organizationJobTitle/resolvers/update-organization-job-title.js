const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize, sequelize } = require('../../../models')
const update = async (_, args, ctx) => {
    try {
        const updatedData = {
            "job_title": args.data.job_title,
            "description": args.data.description || ""
        }
        const { models, req } = ctx;
        const {
            OrganizationJobTitle: OrganizationJobTitleModel,
        } = models;
        const OrganizationJobTitleInstance = await OrganizationJobTitleModel.findOne({ where: { org_job_title_id: args.data.org_job_title_id } });

        if (!OrganizationJobTitleInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_JOB_TITLE_NOT_FOUND'), "404");
        }
        const OrganizationJobTitleInstance2 = await OrganizationJobTitleModel.findOne({ where: { organization_id: args.data.organization_id, job_title: args.data.job_title, org_job_title_id: { [sequelize.Sequelize.Op.ne]: args.data.org_job_title_id } } });
        if (OrganizationJobTitleInstance2) {
            throw new ApolloError(getMessage('ORGANIZATION_JOB_TITLE_EXISTS'), "401");
        }
        let updatedOrganizationJobTitle = await OrganizationJobTitleModel.update(updatedData, { where: { org_job_title_id: args.data.org_job_title_id }, returning: true });

        [, [updatedOrganizationJobTitle]] = updatedOrganizationJobTitle;

        updatedOrganizationJobTitle.message = getMessage('ORGANIZATION_JOB_TITLE_UPDATE_SUCCESS');

        return updatedOrganizationJobTitle;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING ORGANIZATION_JOB_TITLE>>>', error);
        throw new ApolloError(error.message, '500');
    }
};

module.exports = update;
