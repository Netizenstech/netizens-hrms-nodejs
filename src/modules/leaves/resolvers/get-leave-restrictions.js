const logger = require("../../../logger");

const getLeaveRestriction = async (_, args, ctx) => {
  try {
    const { LeaveRestriction: LeaveRestriction } = ctx.models;
    const data = LeaveRestriction.findAll({});
    return data;
  } catch (err) {
    logger.error(err);
  }
};
module.exports = getLeaveRestriction;
