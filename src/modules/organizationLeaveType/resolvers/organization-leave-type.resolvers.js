const createOrganizationLeaveType = require('./create-organization-leave-type');
const updateOrganizationLeaveType = require('./update-organization-leave-type');
const deleteOrganizationLeaveType = require('./delete-organization-leave-type');
const getOrganizationLeaveTypeByOrganizationId = require('./get-organization-leave-type-by-organization-id');

const resolvers = {
  OrganizationLeaveTypeListing: {
    organization_id: {
      resolve: OrganizationLeaveTypeListing => OrganizationLeaveTypeListing.organization_id,
    },
  },
  Mutation: {
    createOrganizationLeaveType,
    updateOrganizationLeaveType,
    deleteOrganizationLeaveType,
    getOrganizationLeaveTypeByOrganizationId,
  },
};

module.exports = resolvers;
