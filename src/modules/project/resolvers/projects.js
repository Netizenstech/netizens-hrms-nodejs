/* eslint-disable camelcase */
const { Sequelize } = require('sequelize');
const logger = require('../../../logger');
// const { sequelize } = require('../../../models');

const projects = async (_, args, { models }) => {
  try {
    const { filter } = args;
    const {
      // eslint-disable-next-line no-unused-vars
      Project: ProjectModel
    } = models;
    const search = filter.search ? '%' + filter.search + '%' : '';
    const searchCondition = filter.search ? Sequelize.Op.like : Sequelize.Op.ne;
    const pageSize = filter.limit ? filter.limit : 10;
    const pageNo = (((filter.skip - 1) < 0) ? 0 : (filter.skip - 1)) * pageSize;

    const data = await ProjectModel.findAndCountAll({
      where: Sequelize.and(Sequelize.or({ title: { [searchCondition]: search } }), { deleted_at: null }),
      limit: pageSize,
      offset: pageNo
    });
    return {
      data,
      users: data.rows,
      count: data.count
      // users: usersData,
      // count: count[0].count,
    };
  } catch (error) {
    logger.error(error);
    return error;
  }
};

module.exports = projects;
