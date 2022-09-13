
const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const createOrganizationBusinessUnit = async (_, args, ctx) => {
  try {
    const {
        OrganizationBusinessUnitHead: OrganizationBusinessUnitHeadModel
    } = ctx.models;

    const createDataObj = {
        employee_id: args.data.employee_id,
        organization_business_unit_id: args.data.organization_business_unit_id,
    }
  
    const OrganizationBusinessUnitHeadCount = await OrganizationBusinessUnitHeadModel.count({ where: { organization_business_unit_id: args.data.organization_business_unit_id, employee_id : args.data.employee_id } });

    if (OrganizationBusinessUnitHeadCount) {
      throw new ApolloError(getMessage('ORGANIZATION_BUSINESS_UNIT_HEAD_EXISTS'), "409");
    }

    const OrganizationBusinessUnitHeadInstance = await OrganizationBusinessUnitHeadModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('ORGANIZATION_BUSINESS_UNIT_HEAD_CREATE_SUCCESS'),
    };

    return response;


  } catch (error) {
    logger.error('ERROR FROM create ORGANIZATION_BUSINESS_UNIT_HEAD>>>', error);
    // return error;
    
    throw new ApolloError(error.message, "409");
  }
};

module.exports = createOrganizationBusinessUnit;
