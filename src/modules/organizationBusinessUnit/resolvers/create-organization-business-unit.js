
const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const createOrganizationBusinessUnit = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const {
      OrganizationBusinessUnit: OrganizationBusinessUnitModel,
    } = ctx.models;

    const createDataObj = {
      organization_id: args.data.organization_id,
      business_unit_name: args.data.business_unit_name,
      business_unit_email: args.data.business_unit_email || "",
      description: args.data.description || ""
    }
  
    const OrganizationBusinessUnitCount = await OrganizationBusinessUnitModel.count({ where: { business_unit_name: args.data.business_unit_name, organization_id : args.data.organization_id } });

    if (OrganizationBusinessUnitCount) {
      throw new Error(getMessage('ORGANIZATION_BUSINESS_UNIT_EXISTS'), "409");
    }

    const OrganizationBusinessUnitInstance = await OrganizationBusinessUnitModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('ORGANIZATION_BUSINESS_UNIT_CREATE_SUCCESS'),
    };

    return response;


  } catch (error) {
    logger.error('ERROR FROM create ORGANIZATION_BUSINESS_UNIT>>>', error);
    // return error;
    throw new ApolloError(error.message, "500");
  }
};

module.exports = createOrganizationBusinessUnit;
