const createOrganizationShiftPolicy = require('./create-organization-shift-policy');
const updateOrganizationShiftPolicy = require('./update-organization-shift-policy');
const deleteOrganizationShiftPolicy = require('./delete-organization-shift-policy');
const getOrganizationShiftPolicyByOrganizationId = require('./get-organization-shift-policy-by-organization-id');
const setAsDefaultOrganizationShiftPolicy = require('./set-as-default-shift-policy');

const resolvers = {
  OrganizationShiftPolicyListing: {
    organization_shift_policy_id: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.organization_shift_policy_id,
    },
    organization_id: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.organization_id,
    },
    shift_name: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.shift_name,
    },
    shift_code: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.shift_code,
    },
    description: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.description,
    },
    flexible_time: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.flexible_time,
    },
    different_for_different_day_time: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.different_for_different_day_time,
    },
    different_for_different_day_break: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.different_for_different_day_break,
    },
    monday_start_time: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.monday_start_time,
    },
    monday_end_time: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.monday_end_time,
    },
    tuesday_start_time: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.tuesday_start_time,
    },
    tuesday_end_time: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.tuesday_end_time,
    },
    wednesday_start_time: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.wednesday_start_time,
    },
    wednesday_end_time: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.wednesday_end_time,
    },
    thursday_start_time: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.thursday_start_time,
    },
    thursday_end_time: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.thursday_end_time,
    },
    friday_start_time: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.friday_start_time,
    },
    friday_end_time: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.friday_end_time,
    },
    saturday_start_time: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.saturday_start_time,
    },
    saturday_end_time: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.saturday_end_time,
    },
    sunday_start_time: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.sunday_start_time,
    },
    sunday_end_time: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.sunday_end_time,
    },
  },
  Mutation: {
    createOrganizationShiftPolicy,
    updateOrganizationShiftPolicy,
    deleteOrganizationShiftPolicy,
    getOrganizationShiftPolicyByOrganizationId,
    setAsDefaultOrganizationShiftPolicy
  },
};

module.exports = resolvers;
