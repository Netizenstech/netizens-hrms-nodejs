const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models');
var uuidv4 = require('uuid');
const fs = require("fs");
const uploadSample = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            Country: countryModel,
            CountryTimeZone: CountryTimeZoneModel,
            State: StateModel
        } = models;

        var xlsx = require('node-xlsx');

        var country = xlsx.parse(__dirname + '/country 22 agu.xlsx'); // parses a file

        var country = xlsx.parse(fs.readFileSync(__dirname + '/country 22 agu.xlsx')); // parses a buffer

        var Timezone = xlsx.parse(__dirname + '/timezon 22 Aug.xlsx'); // parses a file

        var Timezone = xlsx.parse(fs.readFileSync(__dirname + '/timezon 22 Aug.xlsx')); // parses a buffer

        var State = xlsx.parse(__dirname + '/State 22 Aug.xlsx'); // parses a file

        var State = xlsx.parse(fs.readFileSync(__dirname + '/State 22 Aug.xlsx')); // parses a buffer
        var countrys = [], timeZone = [], States = [];
        country[0].data.forEach(ele => {
            var uui = uuidv4.v4()
            countrys.push({
                country_name: ele[0],
                uuid: uui
            });
            Timezone[0].data.forEach(eleCountry => {
                if (eleCountry[1] == ele[0]) {
                    timeZone.push({
                        time_zone: eleCountry[0],
                        country_id: uui
                    })
                }
            })
            if (State[0].data.some(x => x[0] == ele[0])) {
                var statesI = State[0].data.find(x => x[0] == ele[0]);
                statesI.shift()
                statesI.forEach(stateEle => {
                    States.push({
                        state_name: stateEle,
                        country_id: uui
                    })
                })
            }
        });
        var countryInstance = await countryModel.bulkCreate(countrys)
        timeZone.forEach(ele=>{
            if(countryInstance.some(x=>x.uuid == ele.country_id)){
                ele.country_id = countryInstance.find(x=>x.uuid == ele.country_id).country_id
            }
        });
        States.forEach(ele=>{
            if(countryInstance.some(x=>x.uuid == ele.country_id)){
                ele.country_id = countryInstance.find(x=>x.uuid == ele.country_id).country_id
            }
        })
        var countryTimeZoneInstance = await CountryTimeZoneModel.bulkCreate(timeZone)
        var stateInstance = await StateModel.bulkCreate(States)
        return {
            message: getMessage('EMPLOYEE_UPDATE_SUCCESS')
        };
    } catch (error) {
        logger.error('ERROR WHILE UPDATING EMPLOYEE>>>', error);
        // return error;
        throw new ApolloError(error.message, "500");
    }
};

module.exports = uploadSample;
