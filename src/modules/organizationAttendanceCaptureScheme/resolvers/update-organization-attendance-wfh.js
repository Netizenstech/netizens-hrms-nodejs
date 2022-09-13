const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { Sequelize } = require('../../../models');
const { NUMBER } = require('sequelize');
const updateOrganizationAttendanceWFH = async (_, args, ctx) => {
    try {

        const { models, req } = ctx;
        const {
            OrganizationAttendanceCaptureScheme: OrganizationAttendanceCaptureSchemeModel,
            OrganizationAttendanceWFH: OrganizationAttendanceWFHModel
        } = models;

        const OrganizationAttendanceCaptureSchemeInstance = await OrganizationAttendanceCaptureSchemeModel.findOne({ where: { attendance_capture_scheme_id: args.data.attendance_capture_scheme_id } });

        if (!OrganizationAttendanceCaptureSchemeInstance) {
            throw new ApolloError(getMessage('ORGANIZATION_ATTENDANCE_SCHEME_NOT_FOUND'), "404");
        }

        const data = {
            allow_wfh: args.data.allow_wfh,
            allow_on_duty: args.data.allow_on_duty,
        };

        let updatedOrganizationAttendanceCaptureScheme = await OrganizationAttendanceCaptureSchemeModel.update(data, { where: { attendance_capture_scheme_id: args.data.attendance_capture_scheme_id }, returning: true });
        const OrganizationAttendanceWFHInstance = await OrganizationAttendanceWFHModel.findOne({ where: { attendance_capture_scheme_id: args.data.attendance_capture_scheme_id } });
        var wfhData = {}
        if (args.data.allow_wfh == true) {
            if (OrganizationAttendanceWFHInstance) {
                wfhData = {
                    allow_for_half_day_request: args.data.wfhInput.allow_for_half_day_request || OrganizationAttendanceWFHInstance.allow_for_half_day_request,
                    allow_to_do_hourly_wfh: args.data.wfhInput.allow_to_do_hourly_wfh || OrganizationAttendanceWFHInstance.allow_to_do_hourly_wfh,
                    required_attachment_when_applied: args.data.wfhInput.required_attachment_when_applied || OrganizationAttendanceWFHInstance.required_attachment_when_applied,
                    allow_clock_in_out: args.data.wfhInput.allow_clock_in_out || OrganizationAttendanceWFHInstance.allow_clock_in_out,
                    rais_wfh_days_option: args.data.wfhInput.rais_wfh_days_option || OrganizationAttendanceWFHInstance.rais_wfh_days_option,
                    rais_wfh_days: args.data.wfhInput.rais_wfh_days || OrganizationAttendanceWFHInstance.rais_wfh_days,
                    rais_wfh_days_in: args.data.wfhInput.rais_wfh_days_in || OrganizationAttendanceWFHInstance.rais_wfh_days_in,
                    rais_wfh_time_option: args.data.wfhInput.rais_wfh_time_option || OrganizationAttendanceWFHInstance.rais_wfh_time_option,
                    rais_wfh_time: args.data.wfhInput.rais_wfh_time || OrganizationAttendanceWFHInstance.rais_wfh_time,
                    rais_wfh_time_in: args.data.wfhInput.rais_wfh_time_in || OrganizationAttendanceWFHInstance.rais_wfh_time_in,
                    rais_wfh_past_dated_option: args.data.wfhInput.rais_wfh_past_dated_option || OrganizationAttendanceWFHInstance.rais_wfh_past_dated_option,
                    rais_wfh_past_dated_months: args.data.wfhInput.rais_wfh_past_dated_months || OrganizationAttendanceWFHInstance.rais_wfh_past_dated_months,
                    rais_wfh_past_dated_ending_on: args.data.wfhInput.rais_wfh_past_dated_ending_on || OrganizationAttendanceWFHInstance.rais_wfh_past_dated_ending_on,
                    restrict_past_date_option: args.data.wfhInput.restrict_past_date_option || OrganizationAttendanceWFHInstance.restrict_past_date_option,
                    restrict_past_date_days: args.data.wfhInput.restrict_past_date_days || OrganizationAttendanceWFHInstance.restrict_past_date_days,
                    restrict_emp_raise_wfh_request_option: args.data.wfhInput.restrict_emp_raise_wfh_request_option || OrganizationAttendanceWFHInstance.restrict_emp_raise_wfh_request_option,
                    restrict_emp_raise_wfh_request_on: args.data.wfhInput.restrict_emp_raise_wfh_request_on || OrganizationAttendanceWFHInstance.restrict_emp_raise_wfh_request_on,
                    apply_wfh_request_option: args.data.wfhInput.apply_wfh_request_option || OrganizationAttendanceWFHInstance.apply_wfh_request_option,
                    apply_wfh_request_prior_days: args.data.wfhInput.apply_wfh_request_prior_days || OrganizationAttendanceWFHInstance.apply_wfh_request_prior_days,
                    apply_wfh_request_working_days: args.data.wfhInput.apply_wfh_request_working_days || OrganizationAttendanceWFHInstance.apply_wfh_request_working_days,
                }
                await OrganizationAttendanceWFHModel.update(wfhData, { where: { attendance_capture_scheme_id: args.data.attendance_capture_scheme_id }, returning: true });
            } else {
                wfhData = {
                    attendance_capture_scheme_id: args.data.attendance_capture_scheme_id,
                    allow_for_half_day_request: args.data.wfhInput.allow_for_half_day_request || false,
                    allow_to_do_hourly_wfh: args.data.wfhInput.allow_to_do_hourly_wfh || false,
                    required_attachment_when_applied: args.data.wfhInput.required_attachment_when_applied || false,
                    allow_clock_in_out: args.data.wfhInput.allow_clock_in_out || false,
                    rais_wfh_days_option: args.data.wfhInput.rais_wfh_days_option || false,
                    rais_wfh_days: args.data.wfhInput.rais_wfh_days || 0,
                    rais_wfh_days_in: args.data.wfhInput.rais_wfh_days_in || "",
                    rais_wfh_time_option: args.data.wfhInput.rais_wfh_time_option || false,
                    rais_wfh_time: args.data.wfhInput.rais_wfh_time || 0,
                    rais_wfh_time_in: args.data.wfhInput.rais_wfh_time_in || "",
                    rais_wfh_past_dated_option: args.data.wfhInput.rais_wfh_past_dated_option || false,
                    rais_wfh_past_dated_months: args.data.wfhInput.rais_wfh_past_dated_months || null,
                    rais_wfh_past_dated_ending_on: args.data.wfhInput.rais_wfh_past_dated_ending_on || null,
                    restrict_past_date_option: args.data.wfhInput.restrict_past_date_option || false,
                    restrict_past_date_days: args.data.wfhInput.restrict_past_date_days || 0,
                    restrict_emp_raise_wfh_request_option: args.data.wfhInput.restrict_emp_raise_wfh_request_option || false,
                    restrict_emp_raise_wfh_request_on: args.data.wfhInput.restrict_emp_raise_wfh_request_on || 0,
                    apply_wfh_request_option: args.data.wfhInput.apply_wfh_request_option || false,
                    apply_wfh_request_prior_days: args.data.wfhInput.apply_wfh_request_prior_days || 0,
                    apply_wfh_request_working_days: args.data.wfhInput.apply_wfh_request_working_days || 0,
                }
                await OrganizationAttendanceWFHModel.create(wfhData);
            }
        }

        [, [updatedOrganizationAttendanceCaptureScheme]] = updatedOrganizationAttendanceCaptureScheme;

        updatedOrganizationAttendanceCaptureScheme.message = getMessage('ORGANIZATION_ATTENDANCE_SCHEME_UPDATE_SUCCESS');

        return updatedOrganizationAttendanceCaptureScheme;
    } catch (error) {
        logger.error('ERROR WHILE UPDATING ORGANIZATION_ATTENDANCE_SCHEME>>>', error);
        throw new ApolloError(error.message, "500");
        // return error;
    }
};

module.exports = updateOrganizationAttendanceWFH;
