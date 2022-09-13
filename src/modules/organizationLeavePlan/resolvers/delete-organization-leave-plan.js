const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteOrganizationLeaveType = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            OrganizationLeavePlan: OrganizationLeavePlanModel,
        } = models;
        const OrganizationLeavePlanInstance = await OrganizationLeavePlanModel.findByPk(args.data.organization_leave_plan_id);
        if (!OrganizationLeavePlanInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_LEAVE_PLAN_NOT_FOUND'), "404");
        }
        await OrganizationLeavePlanInstance.destroy();
        return { message: getMessage('ORGANIZATION_LEAVE_PLAN_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete ORGANIZATION_LEAVE_PLAN>>>', error);
        throw new ApolloError(error.message, '500');
    }
};

module.exports = deleteOrganizationLeaveType;
