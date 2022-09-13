const createTask = require('./create-task');
const updateTask = require('./update-task');
const tasks = require('./tasks');
const deleteTask = require('./delete-task');

const resolvers = {
  TaskListing: {
    title: {
      resolve: TaskListing => TaskListing.title
    },
    description: {
      resolve: TaskListing => TaskListing.description
    }
  },
  Query: {
    tasks
  },
  Mutation: {
    createTask,
    updateTask,
    deleteTask
  }
};

module.exports = resolvers;
