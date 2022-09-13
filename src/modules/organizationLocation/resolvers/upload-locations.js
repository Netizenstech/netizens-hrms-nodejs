
const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('sequelize')
const uploadLocations = async (_, args, ctx) => {
    try {
        const {
            OrganizationLocation: OrganizationLocationModel,
            CountryTimeZone: CountryTimeZoneModel,
            Country: countryModel,
            State: StateModel
        } = ctx.models;

        const createDataObj = [], time_zones = [], states = [], countrys = [];
        args.data.locations.forEach(async ele => {
            time_zones.push("%" + ele.time_zone + "%")
            countrys.push("%" + ele.country + "%")
            states.push("%" + ele.state + "%")
        });
        var time_zone_res = await CountryTimeZoneModel.findAll({
            where: Sequelize.and(Sequelize.or({ time_zone: { [Sequelize.Op.like]: { [Sequelize.Op.any]: time_zones } } }), { deleted_at: null }),
        });
        var country_res = await countryModel.findAll({
            where: Sequelize.and(Sequelize.or({ country_name: { [Sequelize.Op.like]: { [Sequelize.Op.any]: countrys } } }), { deleted_at: null }),
        });
        var state_res = await StateModel.findAll({
            where: Sequelize.and(Sequelize.or({ state_name: { [Sequelize.Op.like]: { [Sequelize.Op.any]: states } } }), { deleted_at: null }),
        });
        args.data.locations.forEach(async ele => {
            createDataObj.push({
                organization_id: args.data.organization_id,
                organization_location: ele.organization_location,
                time_zone: time_zone_res.some(x => x.time_zone.toLowerCase().includes(ele.time_zone.toLowerCase())) ? time_zone_res.find(x => x.time_zone.toLowerCase().includes(ele.time_zone.toLowerCase())).country_time_zone_id : null,
                country: country_res.some(x => x.country_name.toLowerCase().includes(ele.country.toLowerCase())) ? country_res.find(x => x.country_name.toLowerCase().includes(ele.country.toLowerCase())).country_id : null,
                state: state_res.some(x => x.state_name.toLowerCase().includes(ele.state.toLowerCase())) ? state_res.find(x => x.state_name.toLowerCase().includes(ele.state.toLowerCase())).state_id : null,
                address_line_1: ele.address_line_1 || "",
                address_line_2: ele.address_line_2 || "",
                city: ele.city || "",
                zip: ele.zip || "",
                description: ele.description || "",
                email: ele.email || ""
            })
        })

        const OrganizationLocationModelInstance = await OrganizationLocationModel.bulkCreate(createDataObj, { returning: true });

        const response = {
            status: 'SUCCESS',
            message: getMessage('ORGANIZATION_LOCATION_CREATE_SUCCESS'),
        };

        return response;

    } catch (error) {
        logger.error('ERROR FROM create ORGANIZATION_LOCATION_HEAD>>>', error);
        // return error;
        throw new ApolloError(error.message, "409");
    }
};

async function getTimezone(ctx, search) {
    try {
        const {
            CountryTimeZone: CountryTimeZoneModel,
        } = ctx.models;
        var data = await CountryTimeZoneModel.findOne({
            where: Sequelize.and(Sequelize.or({ time_zone: { [Sequelize.Op.in]: search } }), { deleted_at: null }),
        });
        return data;
    } catch (err) {
        return null;
    }
}

async function getCountry(ctx, search) {
    try {
        const {
            Country: countryModel,
        } = ctx.models;
        var data = await countryModel.findOne({
            where: Sequelize.and(Sequelize.or({ country_name: { [Sequelize.Op.iLike]: search } }), { deleted_at: null }),
        });
        return data;
    } catch (err) {
        return null;
    }
}

async function getState(ctx, search) {
    try {
        const {
            State: StateModel
        } = ctx.models;
        var data = await StateModel.findOne({
            where: Sequelize.and(Sequelize.or({ state_name: { [Sequelize.Op.iLike]: search } }), { deleted_at: null }),
        });
        return data;
    } catch (err) {
        return null;
    }
}
module.exports = uploadLocations;
