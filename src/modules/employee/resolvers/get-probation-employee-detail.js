/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const moment = require('moment')
const { sequelize } = require('../../../models');

const organizationProbationEmployee = async (_, args, { models }) => {
    try {
        const {
            // eslint-disable-next-line no-unused-vars
            Employee: EmployeeModel,
        } = models;

        // Search
        var search = args.data.search ? "%" + args.data.search + "%" : "";
        var searchCondition = args.data.search ? Sequelize.Op.iLike : Sequelize.Op.ne;

        // Pagination
        var pageSize = args.data.pageRecord ? args.data.pageRecord : 10,
            pageNo = args.data.pageNo ? (args.data.pageNo - 1) * pageSize : 1;

        // Check Probation type
        var whereCondition ;
        if(args.data.type && args.data.type == "probationPolicyIdWise"){
            whereCondition = sequelize.Sequelize.and({ organization_probation_policy_id: args.data.id })
        }else {
            var probationCondition = (args.data.probationType && args.data.probationType == "inProbation") ? sequelize.Sequelize.Op.lt : sequelize.Sequelize.Op.gt
            whereCondition = sequelize.Sequelize.and({ organization_id: args.data.organization_id }, { probation_end_date: { [probationCondition]: moment(new Date()).format("YYYY-MM-DD") } });
            if (args.data.filter == "Department") {
                whereCondition = sequelize.Sequelize.and({ organization_id: args.data.organization_id }, { probation_end_date: { [probationCondition]: moment(new Date()).format("YYYY-MM-DD") } }, { organization_department_id: args.data.id })
            } else if (args.data.filter == "Location") {
                whereCondition = sequelize.Sequelize.and({ organization_id: args.data.organization_id }, { probation_end_date: { [probationCondition]: moment(new Date()).format("YYYY-MM-DD") } }, { organization_location_id: args.data.id })
            }
        }
        
        var data = await EmployeeModel.findAndCountAll({
            where: whereCondition,
            include: [{
                require: true,
                model: models.User,
                where: Sequelize.and(Sequelize.or({ firstName: { [searchCondition]: search } }, { display_name: { [searchCondition]: search } }, { lastName: { [searchCondition]: search } }), { deleted_at: null }),
            }],
            limit: pageSize,
            offset: pageNo,
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

module.exports = organizationProbationEmployee;
