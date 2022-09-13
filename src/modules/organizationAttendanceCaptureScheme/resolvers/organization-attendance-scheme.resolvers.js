const createAttendanceCaptureSchemeBasicInfo = require('./create-organization-attendance-basic');
const updateAttendanceCaptureSchemeBiometricAndWebClockIn = require('./update-organization-attendance-biometric-and-web-clock-in');
const updateOrganizationAttendanceCaptureSchemeRemotePunch = require('./update-organization-attendance-remote-punch');
const updateOrganizationAttendanceCaptureSchemeWFH = require('./update-organization-attendance-wfh');
const updateOrganizationAttendanceCaptureSchemeRegularization = require('./update-organization-attendance-regularization');
const getOrganizationAttendanceCaptureScheme = require('./get-organization-attendance-capture-scheme-by-organization-id');

const resolvers = {
  OrganizationShiftPolicyListing: {
    organization_shift_policy_id: {
      resolve: OrganizationShiftPolicyListing => OrganizationShiftPolicyListing.organization_shift_policy_id,
    },
    
  },
  Mutation: {
    createAttendanceCaptureSchemeBasicInfo,
    updateAttendanceCaptureSchemeBiometricAndWebClockIn,
    updateOrganizationAttendanceCaptureSchemeRemotePunch,
    updateOrganizationAttendanceCaptureSchemeWFH,
    updateOrganizationAttendanceCaptureSchemeRegularization,
    getOrganizationAttendanceCaptureScheme
  },
};

module.exports = resolvers;
