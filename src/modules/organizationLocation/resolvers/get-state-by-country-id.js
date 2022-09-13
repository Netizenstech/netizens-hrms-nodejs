/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');
const { ApolloError } = require('apollo-server-express');
const getStateByCountryIdWise = async (_, args, { models }) => {
    try {
        const {
            State: StateModel
        } = models;
        var search = args.data.search ? "%" + args.data.search + "%" : "";
        var searchCondition = args.data.search ? Sequelize.Op.iLike : Sequelize.Op.ne;
        var data = await StateModel.findAll({
            where: Sequelize.and(Sequelize.or({ state_name: { [searchCondition]: search } }), { country_id: args.data.country_id }, { deleted_at: null }),
        });
        return data;
    } catch (error) {
        logger.error(error);
        throw new ApolloError(error.message, "500");
        // return error;
    }
};

module.exports = getStateByCountryIdWise;
