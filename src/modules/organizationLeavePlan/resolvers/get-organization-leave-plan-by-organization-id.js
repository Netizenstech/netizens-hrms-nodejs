/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');
const { ApolloError } = require('apollo-server-express');
const getOrganizationPolicyByOrganizationId = async (_, args, { models }) => {
  try {
    const {
      OrganizationLeavePlan: OrganizationLeavePlanModel,
    } = models;

    var search = args.data.search ? "%" + args.data.search + "%" : "";
    var searchCondition = args.data.search ? Sequelize.Op.iLike : Sequelize.Op.ne;

    var data = await OrganizationLeavePlanModel.findAll({
      where: Sequelize.and(Sequelize.or({ name: { [searchCondition]: search } }), { organization_id: args.data.organization_id }, { deleted_at: null }),
    });
    return data;
  } catch (error) {
    logger.error(error);
    throw new ApolloError(error.message, "500");
    // return error;
  }
};

module.exports = getOrganizationPolicyByOrganizationId;
