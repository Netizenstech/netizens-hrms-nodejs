const logger = require("../../../logger");

const updateLeaveApplyPlan = async (_, args, ctx) => {
  const { LeaveApply: LeaveApply, LeaveNoticeDays: LeaveNoticeDays } =
    ctx.models;
  const leaveObject = {
    apply_for_half_day_option: args.data.apply_for_half_day_option,
    allow_emp_to_see_and_apply_leave:
      args.data.allow_emp_to_see_and_apply_leave,
    how_early_emp_apply_leave_option:
      args.data.how_early_emp_apply_leave_option,
    leave_request_days: args.data.leave_request_days,
    check_restriction_for_past_dated_leave:
      args.data.check_restriction_for_past_dated_leave,
    emp_leaves_past_days: args.data.emp_leaves_past_days,
    not_allow_emp_past_dated_leaves: args.data.not_allow_emp_past_dated_leaves,
    past_leave_month: args.data.past_leave_month,
    leave_reaquire_comment: args.data.leave_reaquire_comment,
    leave_exceeds_days: args.data.leave_exceeds_days,
  };
  const data = await LeaveApply.update(leaveObject, {
    where: { leave_apply_id: args.data.leave_apply_id },
    returning: true,
  });
  const leaveNoticeDaysObject = {
    days_for_more_duration: args.addData.days_for_more_duration,
    leave_notice_days: args.addData.leave_notice_days,
    working_days: args.addData.working_days,
  };
  const addData = await LeaveNoticeDays.update(leaveNoticeDaysObject, {
    where: { leave_notice_days_id: args.addData.leave_notice_days_id },
    returning: true,
  });
  const response = {
    status: "Success",
    message: "Updated Successfully!",
  };
  return response;
};
module.exports = updateLeaveApplyPlan;
