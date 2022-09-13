/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');
const { ApolloError } = require('apollo-server-express');
const getOrganizationProbationPolicyByOrganizationId = async (_, args, { models }) => {
  try {
    const {
      OrganizationProbationPolicy: OrganizationProbationPolicyModel,
    } = models;

    var data = await OrganizationProbationPolicyModel.findAll({
      where: Sequelize.and({ organization_id: args.data.organization_id }, { deleted_at: null }),

    });
    return data;
  } catch (error) {
    logger.error(error);
    throw new ApolloError(error.message, "500");
    // return error;
  }
};

module.exports = getOrganizationProbationPolicyByOrganizationId;
