/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');

const organizationHolidays = async (_, args, { models }) => {
    try {
        const {
            // eslint-disable-next-line no-unused-vars
            OrganizationHolidays: OrganizationHolidaysModel,
        } = models;

        var data = await OrganizationHolidaysModel.findAll({
            attributes: ["org_holiday_id", "organization_id", "org_holiday_list_id", "holiday_name", "description", "date", "is_floater"],
            where: Sequelize.and({ org_holiday_list_id: args.data.org_holiday_list_id }, { deleted_at: null }),
            // group: [[sequelize.Sequelize.fn("DATE", sequelize.Sequelize.col('date'), "%y"), "DESC"]]
            // group: [sequelize.fn('date_trunc', 'year', sequelize.col('date'))]
        });
        return data;
    } catch (error) {
        logger.error(error);
        // return error;
        throw new ApolloError(error.message, "500");
    }
};

module.exports = organizationHolidays;
