/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');

const getUserEducationIdWise = async (_, args, { models }) => {
  try {
    const { filter } = args;
    const {
      UserEducation: UserEducationModel,
    } = models;

    var data = await UserEducationModel.findAll({
      where: Sequelize.and({ user_id: args.data.user_id}, { deleted_at: null }),

    });
    return data;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

module.exports = getUserEducationIdWise;
