/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');
const { ApolloError } = require('apollo-server-express');
const getSingleOrganizationBusinessUnit = async (_, args, { models }) => {
  try {
    const {
      OrganizationBusinessUnit: OrganizationBusinessUnitModel,
    } = models;

    var data = await OrganizationBusinessUnitModel.findOne({
      where: Sequelize.and({ organization_business_unit_id: args.data.organization_business_unit_id }, { deleted_at: null }),
      include: [{
        separated:true,
        model: models.OrganizationBusinessUnitHead,
        include: [{
          model: models.Employee,
          attributes:['employee_id','user_id'],
          include: [{
            model: models.User,
            attributes:['user_id','firstName','lastName','display_name'],
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

module.exports = getSingleOrganizationBusinessUnit;
