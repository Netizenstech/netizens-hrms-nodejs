/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');

const getUserExperienceUserIdWise = async (_, args, { models }) => {
  try {
    const { filter } = args;
    const {
      UserExperience: UserExperienceModel,
    } = models;

    var data = await UserExperienceModel.findAll({
      where: Sequelize.and({ user_id: args.data.user_id}, { deleted_at: null }),

    });
    return data;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

module.exports = getUserExperienceUserIdWise;
