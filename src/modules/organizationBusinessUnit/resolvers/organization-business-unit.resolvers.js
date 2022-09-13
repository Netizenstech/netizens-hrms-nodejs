const createOrganizationBusinessUnit = require('./create-organization-business-unit');
const deleteOrganizationBusinessUnit = require('./delete-organization-business-unit');
const getOrganizationBusinessUnitByOrganizationId = require('./get-organization-business-unit-by-organization-id');
const updateOrganizationBusinessUnit = require('./update-organization-business-unit');
const createUpdateOrganizationBusinessHead = require('./create-update-organization-business-head');
const getSingleOrganizationBusinessUnit = require('./get-single-organization-business-unit');
const createOrganizationBusinessUnitHead = require('./create-organization-business-unit-head');
const deleteOrganizationBusinessUnitHead = require('./delete-organization-business-unit-head');
const updateEmployeeBusinessUnit = require('./update-employee-business-unit-by-employee-number');

const resolvers = {
  OrganizationBusinessUnitListing: {
    organization_business_unit_id: {
      resolve: OrganizationBusinessUnitListing => OrganizationBusinessUnitListing.organization_business_unit_id,
    },
    organization_id: {
      resolve: OrganizationBusinessUnitListing => OrganizationBusinessUnitListing.organization_id,
    },
    business_unit_name: {
      resolve: OrganizationBusinessUnitListing => OrganizationBusinessUnitListing.business_unit_name,
    },
    business_unit_email: {
      resolve: OrganizationBusinessUnitListing => OrganizationBusinessUnitListing.business_unit_email,
    },
    description: {
      resolve: OrganizationBusinessUnitListing => OrganizationBusinessUnitListing.description,
    }
  },
  Mutation: {
    createOrganizationBusinessUnit,
    deleteOrganizationBusinessUnit,
    getOrganizationBusinessUnitByOrganizationId,
    updateOrganizationBusinessUnit,
    createUpdateOrganizationBusinessHead,
    getSingleOrganizationBusinessUnit,
    createOrganizationBusinessUnitHead,
    deleteOrganizationBusinessUnitHead,
    updateEmployeeBusinessUnit
  },
};

module.exports = resolvers;
