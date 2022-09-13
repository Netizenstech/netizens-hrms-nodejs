
const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const moment = require('moment');

const cloneLeavePlan = async (_, args, ctx) => {
    try {
        const {
            OrganizationLeavePlan: OrganizationLeavePlanModel,
            OrganizationLeavePlanAssigned: OrganizationLeavePlanAssignedAssignedModel,
        } = ctx.models;

        const createDataObj = {
            organization_id: args.data.organization_id,
            name: args.data.name,
            leave_calendar_year_start: moment(new Date(args.data.leave_calendar_year_start)).format('YYYY-MM-DD'),
            leave_calendar_year_end: moment(new Date(args.data.leave_calendar_year_start)).endOf('year').format('YYYY-MM-DD')
        }

        const OrganizationLeavePlanInstance = await OrganizationLeavePlanModel.create(createDataObj, { returning: true });

        var assignedLeavesType = [];
        args.data.organization_assigned_types.forEach(element => {
            assignedLeavesType.push({
                organization_leave_plan_id: OrganizationLeavePlanInstance.organization_leave_plan_id,
                organization_leave_type_id: element
            })
        })
        await OrganizationLeavePlanAssignedAssignedModel.bulkCreate(assignedLeavesType, { returning: true });
        const response = {
            status: 'SUCCESS',
            message: getMessage('ORGANIZATION_LEAVE_PLAN_CLONE_SUCCESS'),
        };

        return response;

    } catch (error) {
        logger.error('ERROR FROM create ORGANIZATION_LEAVE_PLAN>>>', error);
        // return error;
        throw new ApolloError(error.message, "500");
    }
};

module.exports = cloneLeavePlan;
