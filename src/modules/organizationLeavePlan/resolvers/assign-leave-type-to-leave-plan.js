
const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const moment = require('moment');
const { Sequelize } = require('../../../models')

const assignedLeaveType = async (_, args, ctx) => {
    try {
        const {
            OrganizationLeavePlanAssigned: OrganizationLeavePlanAssignedAssignedModel,
        } = ctx.models;

        const createDataObj = [], updatedIds = [];


        await OrganizationLeavePlanAssignedAssignedModel.destroy({ where: { organization_leave_plan_id: args.data.organization_leave_plan_id } })
        if (args.data.organization_assigned_types.length) {
            args.data.organization_assigned_types.forEach(element => {
                if (element.organization_leave_plan_assigned_id) {
                    updatedIds.push(element.organization_leave_plan_assigned_id)
                } else {
                    createDataObj.push({
                        organization_leave_plan_id: args.data.organization_leave_plan_id,
                        organization_leave_type_id: element.organization_leave_type_id
                    })
                }
            });
        }
        if (updatedIds.length) {
            await OrganizationLeavePlanAssignedAssignedModel.restore( { where: { organization_leave_plan_assigned_id: { [Sequelize.Sequelize.Op.in]: updatedIds } }, paranoid: false })
        }

        if (createDataObj.length) {
            await OrganizationLeavePlanAssignedAssignedModel.bulkCreate(createDataObj, { returning: true });
        }

        const response = {
            status: 'SUCCESS',
            message: getMessage('ORGANIZATION_LEAVE_TYPE_ASSIGNED_CREATE_SUCCESS'),
        };

        return response;

    } catch (error) {
        logger.error('ERROR FROM create ORGANIZATION_LEAVE_TYPE_ASSIGNED>>>', error);
        // return error;
        throw new ApolloError(error.message, "500");
    }
};

module.exports = assignedLeaveType;
