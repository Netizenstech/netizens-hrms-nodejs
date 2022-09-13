
const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { sequelize } = require('../../../models');
const createUpdateOrganizationBusinessUnitHead = async (_, args, ctx) => {
    try {
        // const { user } = args;
        const {
            OrganizationDepartmentHead: OrganizationDepartmentHeadModel
        } = ctx.models;

        const createDataObj = [], alreadyAdded = [];
        args.data.headIds.forEach(element => {
            if (!element.org_department_head_id) {
                createDataObj.push({
                    employee_id: element.employee_id,
                    organization_department_id: args.data.organization_department_id,
                })
            } else {
                alreadyAdded.push(element.org_department_head_id)
            }
        });
        var data = await OrganizationDepartmentHeadModel.destroy({ where: { org_department_head_id: { [sequelize.Sequelize.Op.notIn]: alreadyAdded } } })
        if (createDataObj.length) {
            await OrganizationDepartmentHeadModel.bulkCreate(createDataObj)
        }

        const response = {
            status: 'SUCCESS',
            message: getMessage('ORGANIZATION_DEPARTMENT_HEAD_UPDATE_SUCCESS'),
        };
        return response;
    } catch (error) {
        logger.error('ERROR FROM create ORGANIZATION_DEPARTMENT_UNIT>>>', error);
        // return error;
        throw new ApolloError(error.message, "500");
    }
};

module.exports = createUpdateOrganizationBusinessUnitHead;
