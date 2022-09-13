const createOrganizationJobTitle = require('./create-organization-job-title');
const updateOrganizationJobTitle = require('./update-organization-job-title');
const deleteOrganizationJobTitle = require('./delete-organization-job-title');
const getOrganizationJobTitleByOrganizationId = require('./get-organization-job-title-by-organization-id');

const resolvers = {
  OrganizationJobTitleListing: {
    organization_id:{
      resolve: OrganizationJobTitleListing => OrganizationJobTitleListing.organization_id,
    }
  },

  Mutation: {
    createOrganizationJobTitle,
    updateOrganizationJobTitle,
    deleteOrganizationJobTitle,
    getOrganizationJobTitleByOrganizationId
  },
};

module.exports = resolvers;
