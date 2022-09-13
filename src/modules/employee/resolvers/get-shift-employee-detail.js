/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const moment = require('moment')
const { sequelize } = require('../../../models');
const { ApolloError } = require("apollo-server-core");

const organizationShiftPolicyWiseEmployee = async (_, args, { models }) => {
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

        var data = await EmployeeModel.findAndCountAll({
            where: { organization_shift_policy_id: args.data.id },
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
        // return error;
        throw ApolloError(error.message, "500");
    }
};

module.exports = organizationShiftPolicyWiseEmployee;
