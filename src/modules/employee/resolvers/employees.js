/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');

const organization = async (_, args, { models }) => {
  try {
    const { filter } = args;
    const {
      // eslint-disable-next-line no-unused-vars
      Employee: EmployeeModel,
    } = models;
    // Search
    var search = filter.search ? "%" + filter.search + "%" : "";
    var searchCondition = filter.search ? Sequelize.Op.like : Sequelize.Op.ne;
    // Pagination
    var pageSize = filter.limit ? filter.limit : 10;
    var pageNo = (((filter.skip - 1) < 0) ? 0 : (filter.skip - 1)) * pageSize;

    var data = await EmployeeModel.findAndCountAll({
      where: Sequelize.and(Sequelize.or({ designation: { [searchCondition]: search } }), { deleted_at: null }),
      limit: pageSize,
      offset: pageNo,
    });
    return {
      data: data,
      Employees: data.rows,
      count: data.count,
    };
  } catch (error) {
    logger.error(error);
    return error;
  }
};

module.exports = organization;
