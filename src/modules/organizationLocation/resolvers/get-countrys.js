/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');
const { ApolloError } = require('apollo-server-express');
const getCountry = async (_, args, { models }) => {
  try {
    const {
      Country: countryModel,
    } = models;

    var search = args.data.search ? "%" + args.data.search + "%" : "";
    var searchCondition = args.data.search ? Sequelize.Op.iLike : Sequelize.Op.ne;
    var data = await countryModel.findAll({
      where: Sequelize.and(Sequelize.or({ country_name: { [searchCondition]: search } }),{ deleted_at: null }),
    });
    return data;
  } catch (error) {
    logger.error(error);
    throw new ApolloError(error.message, "500");
    // return error;
  }
};

module.exports = getCountry;
