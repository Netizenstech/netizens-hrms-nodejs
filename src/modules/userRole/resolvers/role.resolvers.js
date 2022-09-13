const createRole = require('./create-role');
const updateRole = require('./update-role');
const role = require('./roles');
const deleteRole = require('./delete-role');
const getAllRole = require('./get-all-role');
const getRoleByOrganizationId = require('./get-role-by-organization-id');

const resolvers = {
  UserRoleListing: {
    role_id:{
      resolve: UserRoleListing => UserRoleListing.role_id,
    },
    title: {
      resolve: UserRoleListing => UserRoleListing.title,
    },
    organization_id: {
      resolve: UserRoleListing => UserRoleListing.organization_id,
    }
  },
  Query: {
    role,
    getAllRole
  },
  Mutation: {
    createRole,
    updateRole,
    deleteRole,
    getRoleByOrganizationId,
  },
};

module.exports = resolvers;
