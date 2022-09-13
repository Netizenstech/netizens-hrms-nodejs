const createOrganizationHolidayList = require('./create-organization-holiday-list');
const deleteOrganizationHolidayList = require('./delete-organization-holiday-list');
const getOrganizationHolidayListByOrganizationId = require('./get-organization-holiday-list-by-organization-id');
const updateOrganizationHolidayList = require('./update-organization-holiday-list');


const resolvers = {
  OrganizationHolidayListing: {
    organization_id: {
      resolve: OrganizationHolidayListing => OrganizationHolidayListing.organization_id,
    }
  },
  Mutation: {
    createOrganizationHolidayList,
    deleteOrganizationHolidayList,
    getOrganizationHolidayListByOrganizationId,
    updateOrganizationHolidayList,
  },
};

module.exports = resolvers;
