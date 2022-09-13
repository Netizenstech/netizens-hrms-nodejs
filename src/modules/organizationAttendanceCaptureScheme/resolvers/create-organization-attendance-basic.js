
const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const createOrganizationAttendanceBasicInfo = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const {
      OrganizationAttendanceCaptureScheme: OrganizationAttendanceCaptureSchemeModel,
    } = ctx.models;

    const createDataObj = {
      organization_id: args.data.organization_id,
      attendance_capture_scheme: args.data.attendance_capture_scheme,
      description: args.data.description || ""
    }
    var organizationValue = args.data.organization_id || null;
    const OrganizationAttendanceCaptureSchemeCount = await OrganizationAttendanceCaptureSchemeModel.count({ where: { attendance_capture_scheme: args.data.attendance_capture_scheme, organization_id: organizationValue } });

    if (OrganizationAttendanceCaptureSchemeCount) {
      throw new Error(getMessage('ORGANIZATION_ATTENDANCE_SCHEME_EXISTS'), "409");
    }

    const OrganizationAttendanceCaptureSchemeInstance = await OrganizationAttendanceCaptureSchemeModel.create(createDataObj, { returning: true });

    const response = {
      status: 'SUCCESS',
      attendance_capture_scheme_id: OrganizationAttendanceCaptureSchemeInstance.attendance_capture_scheme_id,
      message: getMessage('ORGANIZATION_ATTENDANCE_SCHEME_CREATE_SUCCESS'),
    };

    return response;


  } catch (error) {
    logger.error('ERROR FROM create ORGANIZATION_ATTENDANCE_SCHEME>>>', error);
    // return error;
    throw new ApolloError(error.message, "500");
  }
};

module.exports = createOrganizationAttendanceBasicInfo;
