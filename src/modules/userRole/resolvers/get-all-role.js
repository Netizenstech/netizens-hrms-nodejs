/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');




const role = async (_, args, { models }) => {
  try {
    const { filter } = args;
    const {
      // eslint-disable-next-line no-unused-vars
      Role: RoleModel,
    } = models;
    var search = filter.search ? "%" + filter.search + "%" : "";
    var searchCondition = filter.search ? Sequelize.Op.like : Sequelize.Op.ne;
   

    var data = await RoleModel.findAll({
      where: Sequelize.and(Sequelize.or({ title: { [searchCondition]: search } }), { deleted_at: null }),
    });
    return {
      Role: data,
    };
  } catch (error) {
    logger.error(error);
    return error;
  }
};

module.exports = role;
