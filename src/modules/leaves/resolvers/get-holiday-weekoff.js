const logger = require("../../../logger");

const getHolidayWeekOff = async (_, args, ctx) => {
  try {
    const { HolidayWeekOff: HolidayWeekOff } = ctx.models;
    const data = await HolidayWeekOff.findAll({});
    return data;
  } catch (err) {
    logger.error(err);
  }
};
module.exports = getHolidayWeekOff;
