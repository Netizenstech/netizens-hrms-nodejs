const createOrganizationDepartment = require('./create-organization-department');
const deleteOrganizationDepartment = require('./delete-organization-department');
const getOrganizationDepartmentByOrganizationId = require('./get-organization-department-by-organization-id');
const updateOrganizationDepartment = require('./update-organization-department');
const createUpdateOrganizationDepartment = require('./create-update-department-head');
const createOrganizationDepartmentHead = require('./create-organization-department-head');
const deleteOrganizationDepartmentHead = require('./delete-organization-department-head');
const updateEmployeeDepartment = require('./update-employee-department-id-by-employee-number');
const updateOrganizationDepartmentSetting = require('./change-department-setting');

const resolvers = {
  OrganizationDepartmentListing: {
    organization_department_id: {
      resolve: OrganizationDepartmentListing => OrganizationDepartmentListing.organization_department_id,
    },
    organization_id: {
      resolve: OrganizationDepartmentListing => OrganizationDepartmentListing.organization_id,
    },
    department_name: {
      resolve: OrganizationDepartmentListing => OrganizationDepartmentListing.department_name,
    },
    department_email: {
      resolve: OrganizationDepartmentListing => OrganizationDepartmentListing.department_email,
    },
    description: {
      resolve: OrganizationDepartmentListing => OrganizationDepartmentListing.description,
    }
  },
  Mutation: {
    createOrganizationDepartment,
    deleteOrganizationDepartment,
    getOrganizationDepartmentByOrganizationId,
    updateOrganizationDepartment,
    createUpdateOrganizationDepartment,
    createOrganizationDepartmentHead,
    deleteOrganizationDepartmentHead,
    updateEmployeeDepartment,
    updateOrganizationDepartmentSetting
  },
};

module.exports = resolvers;
