const createTeam = require('./create-team');
const updateTeam = require('./update-team');
const teams = require('./teams');
const deleteTeam = require('./delete-team');

const resolvers = {
  TeamListing: {
    title: {
      resolve: TeamListing => TeamListing.title
    },
    description: {
      resolve: TeamListing => TeamListing.description
    }
  },
  Query: {
    teams
  },
  Mutation: {
    createTeam,
    updateTeam,
    deleteTeam
  }
};

module.exports = resolvers;
