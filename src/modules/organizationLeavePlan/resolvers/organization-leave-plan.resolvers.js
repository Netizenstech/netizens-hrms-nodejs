const createOrganizationLeavePlan = require('./create-organization-leave-plan');
const updateOrganizationLeavePlan = require('./update-organization-leave-plan');
const deleteOrganizationLeavePlan = require('./delete-organization-leave-plan');
const getOrganizationLeavePlanByOrganizationId = require('./get-organization-leave-plan-by-organization-id');
const assignedLeaveTypeToLeavePlan = require('./assign-leave-type-to-leave-plan');
const configureAssignedLeaveType = require('./update-assigned-type-configuration');
const deleteLeaveAssignedType = require('./delete-assigned-leave-type');
const getAssignedLeaveTypeByLeavePlanId = require('./get-assigned-leave-type-by-leave-plan-id');
const cloneLeavePlan = require('./clone-leave-plan');

const resolvers = {
  OrganizationLeavePlanListing: {
    organization_id: {
      resolve: OrganizationLeavePlanListing => OrganizationLeavePlanListing.organization_id,
    },
  },
  Mutation: {
    createOrganizationLeavePlan,
    updateOrganizationLeavePlan,
    deleteOrganizationLeavePlan,
    getOrganizationLeavePlanByOrganizationId,
    assignedLeaveTypeToLeavePlan,
    configureAssignedLeaveType,
    deleteLeaveAssignedType,
    getAssignedLeaveTypeByLeavePlanId,
    cloneLeavePlan
  },
};

module.exports = resolvers;
