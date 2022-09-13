const createOrganizationHolidays = require('./create-organization-holidays');
const updateOrganizationHolidays = require('./update-organization-holidays');
const deleteMultipleOrganizationHolidays = require('./delete-multiple-organization-holidays');
const deleteOrganizationHolidays = require('./delete-organization-holidays');
const getOrganizationHolidaysByOrganizationListId = require('./get-organization-holidays-by-organization-list-id');

const resolvers = {
  OrganizationHolidaysListing: {
    organization_id: {
      resolve: OrganizationHolidaysListing => OrganizationHolidaysListing.organization_id,
    }
  },
  Mutation: {
    createOrganizationHolidays,
    updateOrganizationHolidays,
    deleteMultipleOrganizationHolidays,
    deleteOrganizationHolidays,
    getOrganizationHolidaysByOrganizationListId,
  },
};

module.exports = resolvers;
