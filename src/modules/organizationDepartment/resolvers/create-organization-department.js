
const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const createOrganizationDepartment = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const {
      OrganizationDepartment: OrganizationDepartmentModel,
    } = ctx.models;

    const createDataObj = {
      organization_id: args.data.organization_id,
      department_name: args.data.department_name,
      department_email: args.data.department_email || "",
      description: args.data.description || ""
    }
  
    const OrganizationDepartmentCount = await OrganizationDepartmentModel.count({ where: { department_name: args.data.department_name, organization_id : args.data.organization_id } });

    if (OrganizationDepartmentCount) {
      throw new Error(getMessage('ORGANIZATION_DEPARTMENT_EXISTS'), "409");
    }

    const OrganizationDepartmentInstance = await OrganizationDepartmentModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('ORGANIZATION_DEPARTMENT_CREATE_SUCCESS'),
    };

    return response;


  } catch (error) {
    logger.error('ERROR FROM create ORGANIZATION_DEPARTMENT>>>', error);
    // return error;
    throw new ApolloError(error.message, "500");
  }
};

module.exports = createOrganizationDepartment;
