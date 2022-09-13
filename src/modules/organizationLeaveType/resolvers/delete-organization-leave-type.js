const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteOrganizationLeaveType = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            OrganizationLeaveType: OrganizationLeaveTypeModel,
        } = models;
        const OrganizationLeaveTypeInstance = await OrganizationLeaveTypeModel.findByPk(args.data.organization_leave_type_id);
        if (!OrganizationLeaveTypeInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_LEAVE_TYPE_NOT_FOUND'), "404");
        }
        await OrganizationLeaveTypeInstance.destroy();
        return { message: getMessage('ORGANIZATION_LEAVE_TYPE_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete ORGANIZATION_LEAVE_TYPE>>>', error);
        throw new ApolloError(error.message, '500');
    }
};

module.exports = deleteOrganizationLeaveType;
