const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models')
const updateOrganizationDepartmentSetting = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            OrganizationDepartment: OrganizationDepartmentModel,
        } = models;

        const OrganizationDepartmentInstance = await OrganizationDepartmentModel.findOne({ where: { organization_department_id: args.data.organization_department_id } });

        if (!OrganizationDepartmentInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_DEPARTMENT_NOT_FOUND'), "404");
        }
        const data = {
            allow_employee_post: args.data.allow_employee_post || OrganizationDepartmentInstance.allow_employee_post,
            allow_employee_post_announcement: args.data.allow_employee_post_announcement || OrganizationDepartmentInstance.allow_employee_post_announcement,
            allow_employee_post_polls: args.data.allow_employee_post_polls || OrganizationDepartmentInstance.allow_employee_post_polls
        };

        let updatedOrganizationDepartment = await OrganizationDepartmentModel.update(data, { where: { organization_department_id: args.data.organization_department_id }, returning: true });

        [, [updatedOrganizationDepartment]] = updatedOrganizationDepartment;

        updatedOrganizationDepartment.message = getMessage('ORGANIZATION_DEPARTMENT_SETTING_UPDATE_SUCCESS');

        return updatedOrganizationDepartment;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING ORGANIZATION_SETTING_DEPARTMENT>>>', error);
        return error;
    }
};

module.exports = updateOrganizationDepartmentSetting;
