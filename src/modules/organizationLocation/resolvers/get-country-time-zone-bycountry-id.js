/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');
const { ApolloError } = require('apollo-server-express');
const getCountryTimeZoneByCountryId = async (_, args, { models }) => {
    try {
        const {
            CountryTimeZone: CountryTimeZoneModel,
        } = models;
        var search = args.data.search ? "%" + args.data.search + "%" : "";
        var searchCondition = args.data.search ? Sequelize.Op.iLike : Sequelize.Op.ne;
        var data = await CountryTimeZoneModel.findAll({
            where: Sequelize.and(Sequelize.or({ time_zone: { [searchCondition]: search } }), { country_id: args.data.country_id }, { deleted_at: null }),
        });
        return data;
    } catch (error) {
        logger.error(error);
        throw new ApolloError(error.message, "500");
        // return error;
    }
};

module.exports = getCountryTimeZoneByCountryId;
