const createEducation = require('./create-user-education');
const updateEducation = require('./update-user-education');
const deleteEducation = require('./delete-user-education');
const getEducationDetailByUserId = require('./get-user-education-by-user-id');
const updateMultipleEducation = require('./update-multiple-education-of-user');

const resolvers = {
  EducationListing: {
    user_education_id:{
      resolve: EducationListing => EducationListing.user_education_id,
    },
    user_id: {
      resolve: EducationListing => EducationListing.user_id,
    },
    education_center_name: {
      resolve: EducationListing => EducationListing.education_center_name,
    },
    course: {
      resolve: EducationListing => EducationListing.course,
    },
    degree: {
      resolve: EducationListing => EducationListing.degree,
    },
    joining_date: {
      resolve: EducationListing => EducationListing.joining_date,
    },
    leaving_date: {
      resolve: EducationListing => EducationListing.leaving_date,
    }
  },
  Mutation: {
    createEducation,
    updateEducation,
    deleteEducation,
    getEducationDetailByUserId,
    updateMultipleEducation
  },
};

module.exports = resolvers;
