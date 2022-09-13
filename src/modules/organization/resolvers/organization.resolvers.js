const createOrganization = require('./create-organization');
const updateOrganization = require('./update-organization');
const Organizations = require('./organizations');
const deleteOrganization = require('./delete-organization');
const getOrganizationByOrganizationId = require('./get-organization-by-organization-id');

const resolvers = {
  OrganizationListing: {
    organization_id:{
      resolve: OrganizationListing => OrganizationListing.organization_id,
    },
    name: {
      resolve: OrganizationListing => OrganizationListing.name,
    },
    type: {
      resolve: OrganizationListing => OrganizationListing.type,
    },
    description: {
      resolve: OrganizationListing => OrganizationListing.description,
    }
  },
  Query: {
    Organizations,
  },
  Mutation: {
    createOrganization,
    updateOrganization,
    deleteOrganization,
    getOrganizationByOrganizationId
  },
};

module.exports = resolvers;
