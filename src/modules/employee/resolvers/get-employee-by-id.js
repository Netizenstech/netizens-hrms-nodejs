/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');

const organization = async (_, args, { models }) => {
  try {
    const { filter } = args;
    const {
      // eslint-disable-next-line no-unused-vars
      Employee: EmployeeModel,
    } = models;

    var data = await EmployeeModel.findOne({
      where: Sequelize.and({ employee_id: args.data.employee_id }, { deleted_at: null }),
      
    });
    return data;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

module.exports = organization;
