/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');
const { ApolloError } = require('apollo-server-express');
const getOrganizationShiftPolicyByOrganizationId = async (_, args, { models }) => {
  try {
    const {
      OrganizationShiftPolicy: OrganizationShiftPolicyModel,
    } = models;

    // Search 
    var search = args.data.search ? "%" + args.data.search + "%" : "";
    var searchCondition = args.data.search ? Sequelize.Op.iLike : Sequelize.Op.ne;
    var data = await OrganizationShiftPolicyModel.findAll({
      where: Sequelize.and({ shift_name: { [searchCondition]: search } }, { organization_id: args.data.organization_id }, { deleted_at: null }),
      include: [{
        separated: true,
        require: false,
        model: models.Employee,
      }]
    });
    return data;
  } catch (error) {
    logger.error(error);
    throw new ApolloError(error.message, "500");
    // return error;
  }
};

module.exports = getOrganizationShiftPolicyByOrganizationId;
