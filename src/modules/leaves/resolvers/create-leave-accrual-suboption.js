const logger = require("../../../logger");

const createLeaveAccrualSuboption = async (_, args, ctx) => {
  try {
    const { LeaveAccrualSuboption: LeaveAccrualSuboption } = ctx.models;
    const createObject = {
      leave_accrual_id: args.data.leave_accrual_id,
      leave_accrual_annual_quota_happens_on:
        args.data.leave_accrual_annual_quota_happens_on,
      leave_accrual_annual_quota_happens_month:
        args.data.leave_accrual_annual_quota_happens_month,
      joining_month_start: args.data.joining_month_start,
      joining_month_end: args.data.joining_month_end,
      allocate_leave_days: args.data.allocate_leave_days,
      exit_month_start: args.data.exit_month_start,
      exit_month_end: args.data.exit_month_end,
      allocate_leave_days_of_exit: args.data.allocate_leave_days_of_exit,
    };
    const data = await LeaveAccrualSuboption.create(createObject, {
      returning: true,
    });
    const response = {
      status: "SUCCESS",
      message: "Successfully created!",
    };
    return response;
  } catch (err) {
    logger.error(err);
  }
};
module.exports = createLeaveAccrualSuboption;
