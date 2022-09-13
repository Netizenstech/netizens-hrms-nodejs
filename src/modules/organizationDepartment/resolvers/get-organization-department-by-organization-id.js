/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');
const { ApolloError } = require('apollo-server-express');
const getOrganizationBusinessUnitByOrganizationId = async (_, args, { models }) => {
  try {
    const {
      OrganizationDepartment: OrganizationDepartmentModel,
    } = models;

    var search = args.data.search ? "%" + args.data.search + "%" : "";
    var searchCondition = args.data.search ? Sequelize.Op.iLike : Sequelize.Op.ne;
    var data = await OrganizationDepartmentModel.findAll({
      where: Sequelize.and(Sequelize.or({ department_name: { [searchCondition]: search } }), { organization_id: args.data.organization_id }, { deleted_at: null }),
      include: [{
        separated: true,
        // require: false,
        model: models.OrganizationDepartmentHead,
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

module.exports = getOrganizationBusinessUnitByOrganizationId;
