
const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { sequelize } = require('../../../models');
const createUpdateOrganizationBusinessUnitHead = async (_, args, ctx) => {
    try {
        // const { user } = args;
        const {
            OrganizationLocation: OrganizationLocationModel,
            OrganizationLocationHead: OrganizationLocationHeadModel
        } = ctx.models;

        const createDataObj = [], alreadyAdded = [];
        args.data.headIds.forEach(element => {
            if (!element.organization_location_head_id) {
                createDataObj.push({
                    employee_id: element.employee_id,
                    organization_location_id: args.data.organization_location_id,
                })
            } else {
                alreadyAdded.push(element.organization_location_head_id)
            }
        });
        var data = await OrganizationLocationHeadModel.destroy({ where: { organization_location_head_id: { [sequelize.Sequelize.Op.notIn]: alreadyAdded } } })
        if (createDataObj.length) {
            await OrganizationLocationHeadModel.bulkCreate(createDataObj)
        }

        const response = {
            status: 'SUCCESS',
            message: getMessage('ORGANIZATION_LOCATION_HEAD_UPDATE_SUCCESS'),
        };

        return response;


    } catch (error) {
        logger.error('ERROR FROM create ORGANIZATION_BUSINESS_UNIT>>>', error);
        // return error;
        throw new ApolloError(error.message, "500");
    }
};

module.exports = createUpdateOrganizationBusinessUnitHead;
