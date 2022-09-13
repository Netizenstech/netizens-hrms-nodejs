/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');

const organizationEmployeeByFilterAndCount = async (_, args, { models }) => {
    try {
        const {
            // eslint-disable-next-line no-unused-vars
            Employee: EmployeeModel,
        } = models;

        var search = args.data.search ? "%" + args.data.search + "%" : "";
        var searchCondition = args.data.search ? Sequelize.Op.iLike : Sequelize.Op.ne;
        var filterOn = {}
        if (args.data.filter == "Business Unit") {
            filterOn = Sequelize.and({ organization_id: args.data.organization_id }, { organization_business_unit_id: { [sequelize.Sequelize.Op.eq]: args.data.id } }, { deleted_at: null })
        } else if (args.data.filter == "Department") {
            filterOn = Sequelize.and({ organization_id: args.data.organization_id }, { organization_department_id: { [sequelize.Sequelize.Op.eq]: args.data.id } }, { deleted_at: null })
        } else if (args.data.filter == "Location") {
            filterOn = Sequelize.and({ organization_id: args.data.organization_id }, { organization_location_id: { [sequelize.Sequelize.Op.eq]: args.data.id } }, { deleted_at: null })
        } else if (args.data.filter == "Holiday") {
            filterOn = Sequelize.and({ organization_id: args.data.organization_id }, { org_holiday_list_id: { [sequelize.Sequelize.Op.eq]: args.data.id } }, { deleted_at: null })
        } else if (args.data.filter == "WeekOff") {
            filterOn = Sequelize.and({ organization_id: args.data.organization_id }, { org_weekly_off_id: { [sequelize.Sequelize.Op.eq]: args.data.id } }, { deleted_at: null })
        } else if (args.data.filter == "Shift") {
            filterOn = Sequelize.and({ organization_id: args.data.organization_id }, { organization_shift_policy_id: { [sequelize.Sequelize.Op.eq]: args.data.id } })
        }
        var data = await EmployeeModel.findAndCountAll({
            where: filterOn,
            include: [{
                require: true,
                model: models.User,
                where: Sequelize.and(Sequelize.or({ firstName: { [searchCondition]: search } }, { display_name: { [searchCondition]: search } }, { lastName: { [searchCondition]: search } })),
            }]
        });
        data = JSON.parse(JSON.stringify(data))
        return {
            count: data.count,
            data: data.rows
        };
    } catch (error) {
        logger.error(error);
        return error;
    }
};

module.exports = organizationEmployeeByFilterAndCount;
