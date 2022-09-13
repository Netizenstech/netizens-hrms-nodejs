
const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const createOrganizationLocation = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const {
      OrganizationLocation: OrganizationLocationModel,
    } = ctx.models;

    const createDataObj = {
      organization_id: args.data.organization_id,
      organization_location: args.data.organization_location,
      time_zone: args.data.time_zone || "",
      country: args.data.country || "",
      state: args.data.state || "",
      address_line_1: args.data.address_line_1 || "",
      address_line_2: args.data.address_line_2 || "",
      city: args.data.city || "",
      zip: args.data.zip || "",
      description: args.data.description || "",
      email: args.data.email || ""
    }
  
    const OrganizationLocationCount = await OrganizationLocationModel.count({ where: { organization_location: args.data.organization_location, organization_id : args.data.organization_id } });

    if (OrganizationLocationCount) {
      throw new Error(getMessage('ORGANIZATION_LOCATION_EXISTS'), "409");
    }

    const OrganizationLocationInstance = await OrganizationLocationModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('ORGANIZATION_LOCATION_CREATE_SUCCESS'),
    };

    return response;


  } catch (error) {
    logger.error('ERROR FROM create ORGANIZATION_LOCATION>>>', error);
    // return error;
    throw new ApolloError(error.message, "500");
  }
};

module.exports = createOrganizationLocation;
