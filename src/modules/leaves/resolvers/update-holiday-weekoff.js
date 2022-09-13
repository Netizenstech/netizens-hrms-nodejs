const logger = require("../../../logger");

const updateHolidayWeekOff = async (_, args, ctx) => {
  try {
    const { HolidayWeekOff: HolidayWeekOff } = ctx.models;
    const updateObject = {
      holiday_weekoff_id: args.data.holiday_weekoff_id,
      holiday_adjoining_leave_option: args.data.holiday_adjoining_leave_option,
      total_num_of_leaves: args.data.total_num_of_leaves,
      adjoining_leave_days: args.data.adjoining_leave_days,
      is_selected_holidays: args.data.is_selected_holidays,
      not_consider_holiday_is_leave: args.data.not_consider_holiday_is_leave,
      week_off_adjoining_leave_option:
        args.data.week_off_adjoining_leave_option,
      total_num_of_leaves_for_week_off:
        args.data.total_num_of_leaves_for_week_off,
      adjoining_leave_days_for_week_off:
        args.data.adjoining_leave_days_for_week_off,
      is_selected_holidays: args.data.is_selected_holidays,
      not_consider_week_off_is_leave: args.data.not_consider_week_off_is_leave,
      sandwich_policy_across_leave_types:
        args.data.sandwich_policy_across_leave_types,
    };
    const data = await HolidayWeekOff.update(updateObject, {
      where: { holiday_weekoff_id: args.data.holiday_weekoff_id },
      returning: true,
    });
    const response = {
      status: "SUCCESS",
      message: "Updated Successfully",
    };
    return response;
  } catch (err) {
    logger.error(err);
  }
};
module.exports = updateHolidayWeekOff;
