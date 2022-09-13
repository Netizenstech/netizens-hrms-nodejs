const createOrganizationLocation = require('./create-organization-location');
const deleteOrganizationLocation = require('./delete-organization-location');
const getOrganizationLocationByOrganizationId = require('./get-organization-location-by-organization-id');
const updateOrganizationLocation = require('./update-organization-location');
const createUpdateOrganizationLocationHead = require('./create-update-location-head');
const createOrganizationLocationHead = require('./create-organization-location-head');
const deleteOrganizationLocationHead = require('./delete-organization-location-head');
const updateEmployeeLocation = require('./update-employee-Location-id-by-employee-number');
const uploadSample = require("./uploadsample");
const getCountry = require('./get-countrys');
const getStateByCountryIdWise = require('./get-state-by-country-id');
const getCountryTimeZoneByCountryId = require('./get-country-time-zone-bycountry-id');
const uploadLocations = require('./upload-locations');
const resolvers = {
  OrganizationLocationListing: {
    organization_location_id: {
      resolve: OrganizationLocationListing => OrganizationLocationListing.organization_location_id,
    },
    organization_id: {
      resolve: OrganizationLocationListing => OrganizationLocationListing.organization_id,
    },
    organization_location: {
      resolve: OrganizationLocationListing => OrganizationLocationListing.organization_location,
    },
    time_zone: {
      resolve: OrganizationLocationListing => OrganizationLocationListing.time_zone,
    },
    country: {
      resolve: OrganizationLocationListing => OrganizationLocationListing.country,
    },
    state: {
      resolve: OrganizationLocationListing => OrganizationLocationListing.state,
    },
    address_line_1: {
      resolve: OrganizationLocationListing => OrganizationLocationListing.address_line_1,
    },
    address_line_2: {
      resolve: OrganizationLocationListing => OrganizationLocationListing.address_line_2,
    },
    city: {
      resolve: OrganizationLocationListing => OrganizationLocationListing.city,
    },
    zip: {
      resolve: OrganizationLocationListing => OrganizationLocationListing.zip,
    },
    description: {
      resolve: OrganizationLocationListing => OrganizationLocationListing.description,
    }
  },
  Mutation: {
    createOrganizationLocation,
    deleteOrganizationLocation,
    getOrganizationLocationByOrganizationId,
    updateOrganizationLocation,
    createUpdateOrganizationLocationHead,
    createOrganizationLocationHead,
    deleteOrganizationLocationHead,
    updateEmployeeLocation,
    uploadSample,
    getCountry,
    getStateByCountryIdWise,
    getCountryTimeZoneByCountryId,
    uploadLocations,
  },
};

module.exports = resolvers;
