const createOrganizationProbationPolicy = require('./create-organization-probation-policy');
const deleteOrganizationProbationPolicy = require('./delete-organization-probation-policy');
const getOrganizationProbationPolicyByOrganizationId = require('./get-organization-probation-policy-by-organization-id');
const updateEmployeeProbationStatus = require('./change-employee-probation-status');
const editOrganizationProbationPolicy = require('./edit-organization-probation-policy');

const resolvers = {
  OrganizationProbationPolicyListing: {
    organization_probation_policy_id: {
      resolve: OrganizationProbationPolicyListing => OrganizationProbationPolicyListing.organization_probation_policy_id,
    },
    organization_id: {
      resolve: OrganizationProbationPolicyListing => OrganizationProbationPolicyListing.organization_id,
    },
    probation_policy_name: {
      resolve: OrganizationProbationPolicyListing => OrganizationProbationPolicyListing.probation_policy_name,
    },
    probation_period_duration: {
      resolve: OrganizationProbationPolicyListing => OrganizationProbationPolicyListing.probation_period_duration,
    },
    probation_type: {
      resolve: OrganizationProbationPolicyListing => OrganizationProbationPolicyListing.probation_type,
    }
  },
  Mutation: {
    createOrganizationProbationPolicy,
    deleteOrganizationProbationPolicy,
    getOrganizationProbationPolicyByOrganizationId,
    updateEmployeeProbationStatus,
    editOrganizationProbationPolicy
  },
};

module.exports = resolvers;
