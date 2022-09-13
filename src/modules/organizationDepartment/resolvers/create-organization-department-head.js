
const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const createOrganizationDepartment = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const {
        OrganizationDepartmentHead: OrganizationDepartmentHeadModel
    } = ctx.models;

    const createDataObj = {
      employee_id: args.data.employee_id,
      organization_department_id: args.data.organization_department_id,
    }
  
    const OrganizationDepartmentHeadCount = await OrganizationDepartmentHeadModel.count({ where: { organization_department_id: args.data.organization_department_id, employee_id : args.data.employee_id } });

    if (OrganizationDepartmentHeadCount) {
      throw new Error(getMessage('ORGANIZATION_DEPARTMENT_HEAD_EXISTS'), "409");
    }

    const OrganizationDepartmentHeadInstance = await OrganizationDepartmentHeadModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('ORGANIZATION_DEPARTMENT_HEAD_CREATE_SUCCESS'),
    };

    return response;


  } catch (error) {
    logger.error('ERROR FROM create ORGANIZATION_DEPARTMENT>>>', error);
    // return error;
    throw new ApolloError(error.message, "409");
  }
};

module.exports = createOrganizationDepartment;
