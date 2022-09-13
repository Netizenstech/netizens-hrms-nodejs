
const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const createOrganizationLocation = async (_, args, ctx) => {
  try {
    const {
        OrganizationLocationHead: OrganizationLocationHeadModel
    } = ctx.models;

    const createDataObj = {
      employee_id: args.data.employee_id,
      organization_location_id: args.data.organization_location_id,
    }
  
    const OrganizationLocationHeadCount = await OrganizationLocationHeadModel.count({ where: { organization_location_id: args.data.organization_location_id, employee_id : args.data.employee_id } });

    if (OrganizationLocationHeadCount) {
      throw new Error(getMessage('ORGANIZATION_LOCATION_HEAD_EXISTS'), "409");
    }

    const OrganizationLocationHeadInstance = await OrganizationLocationHeadModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('ORGANIZATION_LOCATION_HEAD_CREATE_SUCCESS'),
    };

    return response;

  } catch (error) {
    logger.error('ERROR FROM create ORGANIZATION_LOCATION_HEAD>>>', error);
    // return error;
    throw new ApolloError(error.message, "409");
  }
};

module.exports = createOrganizationLocation;
