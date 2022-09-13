/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');

const organization = async (_, args, { models }) => {
    try {
        const {
            // eslint-disable-next-line no-unused-vars
            Organization: OrganizationModel,
        } = models;

        var data = await OrganizationModel.findOne({
            where: Sequelize.and({ organization_id: args.data.organization_id }, { deleted_at: null }),
        });
        return data;
    } catch (error) {
        logger.error(error);
        return error;
    }
};

module.exports = organization;
