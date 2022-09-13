const adminUpdate = require('./admin-update');
const createUser = require('./create-user');
const login = require('./login');
const updateProfile = require('./update');
const updateUser = require('./update-user');
const updatePassword = require('./update-password');
const user = require('./user');
const users = require('./users');
const verifyUser = require('./verify-user');
const getSingleUserById = require('./get-single-user-by-id');
const uploadProfile = require('./upload-profile');
const createOrganizationAdmin = require('./create-organization-user');
const resolvers = {
  UserListing: {
    user_id: {
      resolve: UserListing => UserListing.user_id,
    },
    firstName: {
      resolve: UserListing => UserListing.firstName
    },
    lastName: {
      resolve: UserListing => UserListing.lastName
    },
    date_of_birth: {
      resolve: UserListing => UserListing.date_of_birth,
    },
    address: {
      resolve: UserListing => UserListing.address
    },
    mobile_number: {
      resolve: UserListing => UserListing.mobile_number,
    },
    gender: {
      resolve: UserListing => UserListing.gender,
    },
    blood_group: {
      resolve: UserListing => UserListing.blood_group,
    },
    profile_url:{
      resolve: UserListing => UserListing.profile_url,
    },
    middle_name:{
      resolve: UserListing => UserListing.middle_name,
    },
    display_name:{
      resolve: UserListing => UserListing.display_name,
    },
    work_email:{
      resolve: UserListing => UserListing.work_email,
    },
    work_phone:{
      resolve: UserListing => UserListing.work_phone,
    },
    residence_phone:{
      resolve: UserListing => UserListing.residence_phone,
    },
    current_address:{
      resolve: UserListing => UserListing.current_address,
    },
    profile_url:{
      resolve: UserListing => UserListing.profile_url,
    },
  },
  Query: {
    user,
    users
  },
  Mutation: {
    createUser,
    updateProfile,
    updatePassword,
    verifyUser,
    adminUpdate,
    login,
    updateUser,
    getSingleUserById,
    uploadProfile,
    createOrganizationAdmin
  },
};

module.exports = resolvers;
