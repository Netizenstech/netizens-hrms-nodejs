const createPermission = require('./create-permission');
const updatePermission = require('./update-permission');
const permissions = require('./permissions');
const deletePermission = require('./delete-permission');

const resolvers = {
  PermissionListing: {
    title: {
      resolve: PermissionListing => PermissionListing.title
    },
    description: {
      resolve: PermissionListing => PermissionListing.description
    }
  },
  Query: {
    permissions
  },
  Mutation: {
    createPermission,
    updatePermission,
    deletePermission
  }
};

module.exports = resolvers;
