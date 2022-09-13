/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require('../../../logger');
const { sequelize } = require('../../../models');
const { ApolloError } = require('apollo-server-express');
const getAssignedLeaveTypeByLeavePlanId = async (_, args, { models }) => {
    try {
        const {
            OrganizationLeavePlanAssigned: OrganizationLeavePlanAssignedAssignedModel,
        } = models;

        var data = await OrganizationLeavePlanAssignedAssignedModel.findAll({
            where: Sequelize.and({ organization_leave_plan_id: args.data.organization_leave_plan_id }, { deleted_at: null }),
            include: [{
                model: models.OrganizationLeaveType,
            }]
        });
        return data;
    } catch (error) {
        logger.error(error);
        throw new ApolloError(error.message, "500");
        // return error;
    }
};

module.exports = getAssignedLeaveTypeByLeavePlanId;
