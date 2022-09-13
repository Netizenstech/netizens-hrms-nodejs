const createMediclaimDetail = require('./create-mediclaim-detail');
const updateMediclaimDetail = require('./update-mediclaim-detail');
const deleteMediclaimDetail = require('./delete-mediclaim-detail');
const getMediclaimDetailById = require('./get-mediclaim-detail-by-id');

const resolvers = {
  MediclaimDetailListing: {
    mediclaim_detail_id:{
      resolve: MediclaimDetailListing => MediclaimDetailListing.mediclaim_detail_id,
    },
    employee_id: {
      resolve: MediclaimDetailListing => MediclaimDetailListing.employee_id,
    },
    organization_id: {
      resolve: MediclaimDetailListing => MediclaimDetailListing.organization_id,
    },
    policy_no: {
      resolve: MediclaimDetailListing => MediclaimDetailListing.policy_no,
    },
    mediclaim_amount: {
      resolve: MediclaimDetailListing => MediclaimDetailListing.mediclaim_amount,
    },
    date_of_commencement: {
      resolve: MediclaimDetailListing => MediclaimDetailListing.date_of_commencement,
    },
    mobile_no: {
      resolve: MediclaimDetailListing => MediclaimDetailListing.mobile_no,
    },
    last_premium_due_date: {
      resolve: MediclaimDetailListing => MediclaimDetailListing.last_premium_due_date,
    },
    mediclaim_amount: {
      resolve: MediclaimDetailListing => MediclaimDetailListing.mediclaim_amount,
    }
  },
  Mutation: {
    createMediclaimDetail,
    updateMediclaimDetail,
    deleteMediclaimDetail,
    getMediclaimDetailById
  },
};

module.exports = resolvers;
