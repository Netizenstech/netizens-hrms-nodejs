const createExperience = require('./create-user-experience');
const updateExperience = require('./update-user-experience');
const deleteExperience = require('./delete-user-experience');
const getExperienceDetailByUserId = require('./get-user-experience-by-user-id');
const updateMultipleExperience = require('./update-multiple-experience-of-user');

const resolvers = {
  ExperienceListing: {
    user_experience_id: {
      resolve: ExperienceListing => ExperienceListing.user_experience_id,
    },
    user_id: {
      resolve: ExperienceListing => ExperienceListing.user_id,
    },
    organization_name: {
      resolve: ExperienceListing => ExperienceListing.organization_name,
    },
    designation: {
      resolve: ExperienceListing => ExperienceListing.designation,
    },
    joining_date: {
      resolve: ExperienceListing => ExperienceListing.joining_date,
    },
    leaving_date: {
      resolve: ExperienceListing => ExperienceListing.leaving_date,
    },
    location: {
      resolve: ExperienceListing => ExperienceListing.location,
    },
  },
  Mutation: {
    createExperience,
    updateExperience,
    deleteExperience,
    getExperienceDetailByUserId,
    updateMultipleExperience
  },
};

module.exports = resolvers;
