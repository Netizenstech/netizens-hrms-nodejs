const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteLeaveAssignedType = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            OrganizationLeavePlanAssigned: OrganizationLeavePlanAssignedAssignedModel,
        } = models;
        const OrganizationLeavePlanAssignedInstance = await OrganizationLeavePlanAssignedAssignedModel.findByPk(args.data.organization_leave_plan_assigned_id);
        if (!OrganizationLeavePlanAssignedInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_LEAVE_ASSIGNED_NOT_FOUND'), "404");
        }
        await OrganizationLeavePlanAssignedInstance.destroy();
        return { message: getMessage('ORGANIZATION_LEAVE_ASSIGNED_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete ORGANIZATION_LEAVE_ASSIGNED>>>', error);
        throw new ApolloError(error.message, '500');
    }
};

module.exports = deleteLeaveAssignedType;
