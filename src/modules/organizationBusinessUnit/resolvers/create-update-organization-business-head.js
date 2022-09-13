
const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { sequelize } = require('../../../models');
const createUpdateOrganizationBusinessUnitHead = async (_, args, ctx) => {
    try {
        // const { user } = args;
        const {
            OrganizationBusinessUnit: OrganizationBusinessUnitModel,
            OrganizationBusinessUnitHead: OrganizationBusinessUnitHeadModel
        } = ctx.models;

        const createDataObj = [], alreadyAdded = [];
        args.data.headIds.forEach(element => {
            if (!element.org_business_unit_head_id) {
                createDataObj.push({
                    employee_id: element.employee_id,
                    organization_business_unit_id: args.data.organization_business_unit_id,
                })
            } else {
                alreadyAdded.push(element.org_business_unit_head_id)
            }
        });
        var data = await OrganizationBusinessUnitHeadModel.destroy({ where: { org_business_unit_head_id: { [sequelize.Sequelize.Op.notIn]: alreadyAdded } } })
        if (createDataObj.length) {
            await OrganizationBusinessUnitHeadModel.bulkCreate(createDataObj)
        }

        const response = {
            status: 'SUCCESS',
            message: getMessage('ORGANIZATION_BUSINESS_UNIT_HEAD_UPDATE_SUCCESS'),
        };

        return response;


    } catch (error) {
        logger.error('ERROR FROM create ORGANIZATION_BUSINESS_UNIT>>>', error);
        // return error;
        throw new ApolloError(error.message, "500");
    }
};

module.exports = createUpdateOrganizationBusinessUnitHead;
