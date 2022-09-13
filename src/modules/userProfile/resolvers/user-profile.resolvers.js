const myProfile = require('./user-profile-list');
const personalInfo = require('./user-personal-info');
const updatePrimaryInfo = require('./update-primary-info');
const updateContactInfo =require('./update-contact-detail');
var multer = require("multer");

const resolvers = {
  DashboardListing: {
    user_id:{
      resolve: DashboardListing => DashboardListing.user_id,
    },
    employeeInfo:{
      resolve: DashboardListing => DashboardListing.employeeInfo,
    },
    firstName:{
      resolve: DashboardListing => DashboardListing.firstName,
    },
    lastName:{
      resolve: DashboardListing => DashboardListing.lastName,
    },
    middle_name:{
      resolve: DashboardListing => DashboardListing.middle_name,
    },
    display_name:{
      resolve: DashboardListing => DashboardListing.display_name,
    },
    marital_status:{
      resolve: DashboardListing => DashboardListing.marital_status,
    },
    date_of_birth:{
      resolve: DashboardListing => DashboardListing.date_of_birth,
    },
    gender:{
      resolve: DashboardListing => DashboardListing.gender,
    },
    blood_group:{
      resolve: DashboardListing => DashboardListing.blood_group,
    },
    work_email:{
      resolve: DashboardListing => DashboardListing.work_email,
    },
    email:{
      resolve: DashboardListing => DashboardListing.email,
    },
    mobile_number:{
      resolve: DashboardListing => DashboardListing.mobile_number,
    },
    work_phone:{
      resolve: DashboardListing => DashboardListing.work_phone,
    },
    residence_phone:{
      resolve: DashboardListing => DashboardListing.residence_phone,
    },
    address:{
      resolve: DashboardListing => DashboardListing.address,
    },
    current_address:{
      resolve: DashboardListing => DashboardListing.current_address,
    },
  },
  // Query: {
    
  // },
  Mutation: {
    myProfile,
    personalInfo,
    updatePrimaryInfo,
    updateContactInfo
  },
};

module.exports = resolvers;
