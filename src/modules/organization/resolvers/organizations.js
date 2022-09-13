/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');

const organization = async (_, args, { models }) => {
  try {
    const { filter } = args;
    const {
      // eslint-disable-next-line no-unused-vars
      Organization: OrganizationModel,
    } = models;
    var search = filter.search ? "%" + filter.search + "%" : "";
    var searchCondition = filter.search ? Sequelize.Op.like : Sequelize.Op.ne;
    var pageSize = filter.limit ? filter.limit : 10;
    var pageNo = (((filter.skip - 1) < 0) ? 0 : (filter.skip - 1)) * pageSize;

    var data = await OrganizationModel.findAndCountAll({
      where: Sequelize.and(Sequelize.or({ name: { [searchCondition]: search } }, { description: { [searchCondition]: search } }), { deleted_at: null }),
      limit: pageSize,
      offset: pageNo,
    });
    return {
      data: data,
      Organizations: data.rows,
      count: data.count,
    };
  } catch (error) {
    logger.error(error);
    return error;
  }
};

module.exports = organization;
