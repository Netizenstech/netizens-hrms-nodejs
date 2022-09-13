/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');

const organizationWeekOff = async (_, args, { models }) => {
    try {
        const {
            // eslint-disable-next-line no-unused-vars
            OrganizationWeeklyOff: OrganizationWeeklyOffModel,
            Employee: EmployeeModel,
        } = models;

        // Search 
        var search = args.data.search ? "%" + args.data.search + "%" : "";
        var searchCondition = args.data.search ? Sequelize.Op.iLike : Sequelize.Op.ne;
        var data = await OrganizationWeeklyOffModel.findAll({
            where: Sequelize.and({ weekly_off_name: { [searchCondition]: search } }, { organization_id: args.data.organization_id }, { deleted_at: null }),
            include: [{
                separated: true,
                require: false,
                model: models.Employee,
            }]
        });
        return data;
    } catch (error) {
        logger.error(error);
        return error;
    }
};

module.exports = organizationWeekOff;
