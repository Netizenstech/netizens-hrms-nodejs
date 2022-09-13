/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');

const organization = async (_, args, { models }) => {
    try {
        const {
            // eslint-disable-next-line no-unused-vars
            OrganizationJobTitle: OrganizationJobTitleModel,
        } = models;

        var data = await OrganizationJobTitleModel.findAll({
            where: Sequelize.and({ organization_id: args.data.organization_id }, { deleted_at: null }),
        });
        return data;
    } catch (error) {
        logger.error(error);
        throw new ApolloError(error.message, '500');
    }
};

module.exports = organization;
