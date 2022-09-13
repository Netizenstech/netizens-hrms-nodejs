const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models');
const updateOrganizationPolicy = async (_, args, ctx) => {
    try {
        
        const { models, req } = ctx;
        const {
            OrganizationLeaveType: OrganizationLeaveTypeModel,
        } = models;
        // const { user } = req;

        const OrganizationLeaveTypeInstance = await OrganizationLeaveTypeModel.findOne({ where: { organization_leave_type_id: args.data.organization_leave_type_id } });

        if (!OrganizationLeaveTypeInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_POLICY_NOT_FOUND'), "404");
        }

        const data = {
            name: args.data.name,
            code: args.data.code,
            description: args.data.description || OrganizationLeaveTypeInstance.description,
            is_show_list_description_applying: args.data.is_show_list_description_applying || OrganizationLeaveTypeInstance.is_show_list_description_applying,
            is_paid: args.data.is_paid || OrganizationLeaveTypeInstance.is_paid,
            is_sick: args.data.is_sick || OrganizationLeaveTypeInstance.is_sick,
            is_statutory: args.data.is_statutory || OrganizationLeaveTypeInstance.is_statutory,
            is_restrict_to_gender: args.data.is_restrict_to_gender || OrganizationLeaveTypeInstance.is_restrict_to_gender,
            gender: args.data.gender || OrganizationLeaveTypeInstance.gender,
            is_restrict_to_employee: args.data.is_restrict_to_employee || OrganizationLeaveTypeInstance.is_restrict_to_employee,
            marital_status: args.data.marital_status || OrganizationLeaveTypeInstance.marital_status,
            is_list_of_reason: args.data.is_list_of_reason || OrganizationLeaveTypeInstance.is_list_of_reason,
            reason: args.data.reason || OrganizationLeaveTypeInstance.reason,
        };

        let updatedOrganizationLeaveType = await OrganizationLeaveTypeModel.update(data, { where: { organization_leave_type_id: args.data.organization_leave_type_id }, returning: true });

        [, [updatedOrganizationLeaveType]] = updatedOrganizationLeaveType;

        updatedOrganizationLeaveType.message = getMessage('ORGANIZATION_LEAVE_TYPE_UPDATE_SUCCESS');

        return updatedOrganizationLeaveType;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING ORGANIZATION_LEAVE_TYPE>>>', error);
        throw new ApolloError(error.message, "500");
        // return error;
    }
};

module.exports = updateOrganizationPolicy;
