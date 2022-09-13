const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const deleteOrganizationBusinessUnit = async (_, args, ctx) => {
    try {
        const { models, req } = ctx;
        const {
            OrganizationDepartmentHead: OrganizationDepartmentHeadModel
        } = models;
        // const { user } = req;
        const OrganizationDepartmentHeadInstance = await OrganizationDepartmentHeadModel.findByPk(args.data.org_department_head_id);
        if (!OrganizationDepartmentHeadInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_DEPARTMENT_HEAD_NOT_FOUND'), "404");
        }
        await OrganizationDepartmentHeadInstance.destroy();
        return { message: getMessage('ORGANIZATION_DEPARTMENT_HEAD_DELETE_SUCCESS') };
    } catch (error) {
        logger.error('ERROR WHILE Delete ORGANIZATION_DEPARTMENT_HEAD>>>', error);
        throw new ApolloError(error.message, '500');
    }
};

module.exports = deleteOrganizationBusinessUnit;
