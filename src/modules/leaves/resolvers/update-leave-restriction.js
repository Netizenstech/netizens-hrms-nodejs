const logger = require("../../../logger");

const updateLeaveRestriction = async (_, args, ctx) => {
  try {
    const { LeaveRestriction: LeaveRestriction } = ctx.models;
    const updateObject = {
      joinee_emp_apply_leave_after_probation:
        args.data.joinee_emp_apply_leave_after_probation,
      probation_days: args.data.probation_days,
      joinee_emp_apply_leave_after_joining:
        args.data.joinee_emp_apply_leave_after_joining,
      joining_days: args.data.joining_days,
      not_allow_emp_to_apply_leave_during_probation:
        args.data.not_allow_emp_to_apply_leave_during_probation,
      allow_days: args.data.allow_days,
      is_there_limit_of_consecutive_leave_can_be_taken:
        args.data.is_there_limit_of_consecutive_leave_can_be_taken,
      max_consecutive_days: args.data.max_consecutive_days,
      is_there_limit_on_leave_balance_can_be_availed_in_month:
        args.data.is_there_limit_on_leave_balance_can_be_availed_in_month,
      avail_max_days: args.data.avail_max_days,
      does_emp_in_notice_can_apply_leave:
        args.data.does_emp_in_notice_can_apply_leave,
      apply_from_available_leaves: args.data.apply_from_available_leaves,
      can_manager_override_leave_restricton:
        args.data.can_manager_override_leave_restricton,
      min_gap_between_two_leaves: args.data.min_gap_between_two_leaves,
      min_calendar_days: args.data.min_calendar_days,
      not_allow_more_than_leave_request_in_calendar_year:
        args.data.not_allow_more_than_leave_request_in_calendar_year,
      leave_request_calendar_year: args.data.leave_request_calendar_year,
      not_allow_more_than_leave_request_in_calendar_month:
        args.data.not_allow_more_than_leave_request_in_calendar_month,
      leave_request_calendar_month: args.data.leave_request_calendar_month,
      not_allow_more_than_leave_request_in_entire_tenure:
        args.data.not_allow_more_than_leave_request_in_entire_tenure,
      leave_request_tenure: args.data.leave_request_tenure,
      restrict_emp_from_applying_leave:
        args.data.restrict_emp_from_applying_leave,
      restrict_emp_applying_leave_month:
        args.data.restrict_emp_applying_leave_month,
      leave_cannot_be_taken_along_with:
        args.data.leave_cannot_be_taken_along_with,
      leave_search_type: args.data.leave_search_type,
      leave_is_not_availabe_when_there_is_balance:
        args.data.leave_is_not_availabe_when_there_is_balance,
      leave_balance_search_type: args.data.leave_balance_search_type,
    };
    const data = await LeaveRestriction.update(updateObject, {
      returning: true,
      where: { leave_restriction_id: args.data.leave_restriction_id },
    });
    const response = {
      status: "Success",
      message: "Updated Successfully",
    };
    return response;
  } catch (err) {
    logger.error(err);
  }
};
module.exports = updateLeaveRestriction;
