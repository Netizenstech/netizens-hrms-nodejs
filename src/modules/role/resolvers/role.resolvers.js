const createRole = require('./create-role');
const updateRole = require('./update-role');
const roles = require('./roles');
const deleteRole = require('./delete-role');

const resolvers = {
  // RoleListing: {
  //   title: {
  //     resolve: RoleListing => RoleListing.title
  //   },
  //   description: {
  //     resolve: RoleListing => RoleListing.description
  //   }
  // },
  Query: {
    roles
  },
  Mutation: {
    createRole,
    updateRole,
    deleteRole
  }
};

module.exports = resolvers;
