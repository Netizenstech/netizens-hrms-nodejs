const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models');
const { NUMBER } = require('sequelize');
const updateOrganizationAttendanceRegularization = async (_, args, ctx) => {
    try {

        const { models, req } = ctx;
        const {
            OrganizationAttendanceCaptureScheme: OrganizationAttendanceCaptureSchemeModel,
        } = models;

        const OrganizationAttendanceCaptureSchemeInstance = await OrganizationAttendanceCaptureSchemeModel.findOne({ where: { attendance_capture_scheme_id: args.data.attendance_capture_scheme_id } });

        if (!OrganizationAttendanceCaptureSchemeInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_ATTENDANCE_SCHEME_NOT_FOUND'), "404");
        }

        const data = {
            allow_emp_to_adjust_attendance:args.data.allow_emp_to_adjust_attendance || false,
            allow_attendance_type:args.data.allow_attendance_type || "",
            emp_allowed_times_option:args.data.emp_allowed_times_option || false,
            emp_allowed_times:args.data.emp_allowed_times || 0,
            emp_allowed_times_in:args.data.emp_allowed_times_in || "",
            emp_allowed_raised_past_date_option:args.data.emp_allowed_raised_past_date_option || false,
            emp_allowed_raised_past_date_beyond:args.data.emp_allowed_raised_past_date_beyond || null,
            emp_allowed_raised_past_date_ending_on:args.data.emp_allowed_raised_past_date_ending_on || null,
            restrict_past_date_adjust_option:args.data.restrict_past_date_adjust_option || false,
            restrict_past_date_adjust_days_back:args.data.restrict_past_date_adjust_days_back || 0,
            allow_emp_to_regularise_attendance_log:args.data.allow_emp_to_regularise_attendance_log || false,
            emp_allow_regularise_time_option:args.data.emp_allow_regularise_time_option || false,
            emp_allow_regularise_time:args.data.emp_allow_regularise_time || 0,
            emp_allow_regularise_time_in:args.data.emp_allow_regularise_time_in || "",
            emp_allow_regularise_past_date_option:args.data.emp_allow_regularise_past_date_option || false,
            emp_allow_regularise_past_date_beyond:args.data.emp_allow_regularise_past_date_beyond || null,
            emp_allow_regularise_past_date_ending:args.data.emp_allow_regularise_past_date_ending || null,
            emp_allow_regularise_past_date_restrict_option:args.data.emp_allow_regularise_past_date_restrict_option || false,
            emp_allow_regularise_past_date_restrict_days:args.data.emp_allow_regularise_past_date_restrict_days || 0,
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

module.exports = updateOrganizationAttendanceRegularization;
