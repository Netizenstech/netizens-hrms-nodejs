/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');
const { ApolloError } = require('apollo-server-express');
const getOrganizationLocationByOrganizationId = async (_, args, { models }) => {
  try {
    const {
      OrganizationLocation: OrganizationLocationModel,
    } = models;

    var search = args.data.search ? "%" + args.data.search + "%" : "";
    var searchCondition = args.data.search ? Sequelize.Op.iLike : Sequelize.Op.ne;
    var data = await OrganizationLocationModel.findAll({
      where: Sequelize.and(Sequelize.or({ organization_location: { [searchCondition]: search } }), { organization_id: args.data.organization_id }, { deleted_at: null }),
      include: [{
        model: models.Country
      }, {
        model: models.CountryTimeZone
      }, {
        model: models.State
      }, {
        separated: true,
        model: models.OrganizationLocationHead,
        include: [{
          model: models.Employee,
          attributes: ['employee_id', 'user_id'],
          include: [{
            model: models.User,
            attributes: ['user_id', 'firstName', 'lastName', 'display_name'],
          }]
        }]
      }]
    });
    return data;
  } catch (error) {
    logger.error(error);
    throw new ApolloError(error.message, "500");
    // return error;
  }
};

module.exports = getOrganizationLocationByOrganizationId;
