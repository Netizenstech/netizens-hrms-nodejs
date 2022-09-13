const createProject = require('./create-project');
const updateProject = require('./update-project');
const projects = require('./projects');
const deleteProject = require('./delete-project');

const resolvers = {
  ProjectListing: {
    project_id:{
      resolve: ProjectListing => ProjectListing.project_id,
    },
    title: {
      resolve: ProjectListing => ProjectListing.title
    },
    description: {
      resolve: ProjectListing => ProjectListing.description
    }
  },
  Query: {
    projects
  },
  Mutation: {
    createProject,
    updateProject,
    deleteProject
  }
};

module.exports = resolvers;
