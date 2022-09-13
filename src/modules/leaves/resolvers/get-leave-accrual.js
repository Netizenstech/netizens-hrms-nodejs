const logger = require("../../../logger");

const getLeaveAccrual = async (_, args, { models }) => {
  try {
    const {
      LeavAccrual: LeavAccrual,
      LeaveAccrualSuboption: LeaveAccrualSuboption,
    } = models;
    let data;
    data = await LeavAccrual.findAll({
      include: [
        {
          required: false,
          model: LeaveAccrualSuboption,
          // attributes: ["leaves_duration", "leaves_month"],
        },
      ],
    });
    return data;
  } catch (err) {
    logger.error(err);
  }
};
module.exports = getLeaveAccrual;
