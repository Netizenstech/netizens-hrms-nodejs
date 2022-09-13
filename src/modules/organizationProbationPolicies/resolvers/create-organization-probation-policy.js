
const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const {sequelize} = require('../../../models')
const createOrganizationProbationPolicy = async (_, args, ctx) => {
  try {
    const {
      OrganizationProbationPolicy: OrganizationProbationPolicyModel,
    } = ctx.models;

    const createDataObj = {
      organization_id: args.data.organization_id || null,
      probation_policy_name: args.data.probation_policy_name,
      probation_period_duration: args.data.probation_period_duration,
      probation_type: args.data.probation_type,
      description: args.data.description || "",
      max_time_probation_extended: args.data.max_time_probation_extended || 0
    }

    var organizationValue = args.data.organization_id || null;
      
    const OrganizationProbationPolicyCount = await OrganizationProbationPolicyModel.count({ where: { probation_policy_name: args.data.probation_policy_name, organization_id : organizationValue } });

    if (OrganizationProbationPolicyCount) {
      throw new Error(getMessage('ORGANIZATION_PROBATION_POLICY_EXISTS'), "409");
    }

    const OrganizationProbationPolicyInstance = await OrganizationProbationPolicyModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('ORGANIZATION_PROBATION_POLICY_CREATE_SUCCESS'),
    };

    return response;


  } catch (error) {
    logger.error('ERROR FROM create ORGANIZATION_PROBATION_POLICY>>>', error);
    // return error;
    throw new ApolloError(error.message, "500");
  }
};

module.exports = createOrganizationProbationPolicy;
