const logger = require("../../../logger");

const createLeaveAccrual = async (_, args, ctx) => {
  try {
    const {
      LeavAccrual: LeavAccrual,
      LeaveAccrualSuboption: LeaveAccrualSuboption,
    } = ctx.models;
    const createObject = {
      how_emp_leave_calculated: args.data.how_emp_leave_calculated,
      all_leaves_credited_as_joins: args.data.all_leaves_credited_as_joins,
      is_earned_on_regular_intervals: args.data.is_earned_on_regular_intervals,
      what_if_emp_joins_mid_of_year: args.data.what_if_emp_joins_mid_of_year,
      leave_accrual_prorate_based_on_joining:
        args.data.leave_accrual_prorate_based_on_joining,
      leave_is_credited_based_on_month:
        args.data.leave_is_credited_based_on_month,
      no_change_in_annual_quota: args.data.no_change_in_annual_quota,
      what_if_emp_exits_mid_year: args.data.what_if_emp_exits_mid_year,
      leave_prorate_based_on_emp_exit_date:
        args.data.leave_prorate_based_on_emp_exit_date,
      leave_updated_when_emp_exit: args.data.leave_updated_when_emp_exit,
      no_change_in_annual_quota_exit: args.data.no_change_in_annual_quota_exit,
    };

    const data = await LeavAccrual.create(createObject, { returning: true });

    const response = {
      status: "SUCCESS",
      message: "Leave accrual created successfully",
    };
    return response;
  } catch (err) {
    logger.error(err);
  }
};
module.exports = createLeaveAccrual;
