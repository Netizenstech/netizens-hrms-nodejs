const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models');
const updateOrganizationAttendanceBiometricAndWebClockIn = async (_, args, ctx) => {
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
            is_used_bio_metric: args.data.is_used_bio_metric,
            is_used_web_clock: args.data.is_used_web_clock,
            allow_user_web_clock_if_forgot_id_card: args.data.allow_user_web_clock_if_forgot_id_card
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

module.exports = updateOrganizationAttendanceBiometricAndWebClockIn;
