const { ApolloError } = require('apollo-server-express');

const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models')
const updateOrganizationDepartment = async (_, args, ctx) => {
    try {
        const data = {
            department_name: args.data.department_name,
            department_email: args.data.department_email || "",
            description: args.data.description || ""
        };
        const { models, req } = ctx;
        const {
            OrganizationDepartment: OrganizationDepartmentModel,
        } = models;

        const OrganizationDepartmentInstance = await OrganizationDepartmentModel.findOne({ where: { organization_department_id: args.data.organization_department_id } });

        if (!OrganizationDepartmentInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_DEPARTMENT_NOT_FOUND'), "404");
        }
        const OrganizationDepartmentInstance2 = await OrganizationDepartmentModel.findOne({ where: { organization_id: OrganizationDepartmentInstance.organization_id, department_name: args.data.department_name } });
        if (OrganizationDepartmentInstance2) {
            throw new ApolloError(getMessage('ORGANIZATION_DEPARTMENT_EXISTS'), "409");
        }
        let updatedOrganizationDepartment = await OrganizationDepartmentModel.update(data, { where: { organization_department_id: args.data.organization_department_id }, returning: true });

        [, [updatedOrganizationDepartment]] = updatedOrganizationDepartment;

        updatedOrganizationDepartment.message = getMessage('ORGANIZATION_DEPARTMENT_UPDATE_SUCCESS');

        return updatedOrganizationDepartment;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING ORGANIZATION_DEPARTMENT>>>', error);
        return error;
    }
};

module.exports = updateOrganizationDepartment;
