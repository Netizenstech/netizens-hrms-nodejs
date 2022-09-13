const createOrganizationWeeklyOff = require('./create-organization-weekly-off');
const updateOrganizationWeeklyOff = require('./update-organization-weekly-off');
const deleteOrganizationWeeklyOff = require('./delete-organization-weekly-off');
const getOrganizationWeeklyOffByOrganizationId = require('./get-organization-weekly-off-by-organization-id');
const setAsDefaultOrganizationWeeklyOff = require('./set-as-default-weekly-off');

const resolvers = {
  OrganizationWeeklyOffListing: {
    organization_id:{
      resolve: OrganizationWeeklyOffListing => OrganizationWeeklyOffListing.organization_id,
    },
  },
  Mutation: {
    createOrganizationWeeklyOff,
    updateOrganizationWeeklyOff,
    deleteOrganizationWeeklyOff,
    getOrganizationWeeklyOffByOrganizationId,
    setAsDefaultOrganizationWeeklyOff
  },
};

module.exports = resolvers;
