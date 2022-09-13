const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models');
const updateOrganizationAttendanceRemotePunch = async (_, args, ctx) => {
    try {

        const { models, req } = ctx;
        const {
            OrganizationAttendanceCaptureScheme: OrganizationAttendanceCaptureSchemeModel
        } = models;

        const OrganizationAttendanceCaptureSchemeInstance = await OrganizationAttendanceCaptureSchemeModel.findOne({ where: { attendance_capture_scheme_id: args.data.attendance_capture_scheme_id } });

        if (!OrganizationAttendanceCaptureSchemeInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_ATTENDANCE_SCHEME_NOT_FOUND'), "404");
        }
        
        const data = {
            allow_remote_clock_in_mobile: args.data.allow_remote_clock_in_mobile,
            allow_remote_clock_in_web: args.data.allow_remote_clock_in_web,
            is_comment_require_for_remote_clock_in: args.data.is_comment_require_for_remote_clock_in,
            is_approval_require_for_remote_clock_in: args.data.is_approval_require_for_remote_clock_in,
        };
        let updatedOrganizationAttendanceCaptureScheme = await OrganizationAttendanceCaptureSchemeModel.update(data, { where: { attendance_capture_scheme_id: args.data.attendance_capture_scheme_id }, returning: true });

        [, [updatedOrganizationAttendanceCaptureScheme]] = updatedOrganizationAttendanceCaptureScheme;

        updatedOrganizationAttendanceCaptureScheme.message = getMessage('ORGANIZATION_ATTENDANCE_SCHEME_UPDATE_SUCCESS');

        return updatedOrganizationAttendanceCaptureScheme;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING ORGANIZATION_ATTENDANCE_SCHEME>>>', error);
        throw new ApolloError(error.message, "500");
        // return error;
    }
};

module.exports = updateOrganizationAttendanceRemotePunch;
