/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { ApolloError } = require('apollo-server-express');
const getOrganizationHolidayByOrganizationId = async (_, args, { models }) => {
  try {
    const {
      OrganizationHolidayList: OrganizationHolidayListModel,
    } = models;

    var search = args.data.search ? "%" + args.data.search + "%" : "";
    var searchCondition = args.data.search ? Sequelize.Op.iLike : Sequelize.Op.ne;
    var data = await OrganizationHolidayListModel.findAll({
      where: Sequelize.and(Sequelize.or({ holiday_list_name: { [searchCondition]: search } }), { organization_id: args.data.organization_id }, { deleted_at: null }),
    });
    return data;
  } catch (error) {
    logger.error(error);
    throw new ApolloError(error.message, "500");
    // return error;
  }
};

module.exports = getOrganizationHolidayByOrganizationId;
