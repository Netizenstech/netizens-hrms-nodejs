const logger = require("../../../logger");

const getLeaveApplyPlan = async (_, args, ctx) => {
  try {
    const { LeaveApply: LeaveApply, LeaveNoticeDays: LeaveNoticeDays } =
      ctx.models;
    const data = await LeaveApply.findAll({
      include: [
        {
          model: LeaveNoticeDays,
        },
      ],
    });
    return data;
  } catch (err) {
    logger.error(err);
  }
};
module.exports = getLeaveApplyPlan;
