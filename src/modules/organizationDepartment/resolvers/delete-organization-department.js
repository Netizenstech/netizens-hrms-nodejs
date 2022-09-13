const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteOrganizationBusinessUnit = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            OrganizationDepartment: OrganizationDepartmentModel,
        } = models;
        // const { user } = req;
        const OrganizationDepartmentInstance = await OrganizationDepartmentModel.findByPk(args.data.organization_department_id);
        if (!OrganizationDepartmentInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_DEPARTMENT_NOT_FOUND'), "404");
        }
        await OrganizationDepartmentInstance.destroy();
        return { message: getMessage('ORGANIZATION_DEPARTMENT_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete ORGANIZATION_DEPARTMENT>>>', error);
        throw new ApolloError(error.message, '500');
    }
};

module.exports = deleteOrganizationBusinessUnit;
