/* eslint-disable camelcase */
const { Sequelize } = require("sequelize");
const logger = require("../../../logger");
const { sequelize } = require("../../../models");

const LeaveById = async (_, args, { models }) => {
  try {
    const {
      // eslint-disable-next-line no-unused-vars
      Leaves: Leaves,
      Employee: Employee,
    } = models;

    var data = await Leaves.findOne({
      where: Sequelize.and(
        { employee_id: args.data.employee_id },
        { organization_id: args.data.organization_id },
        { deleted_at: null }
      ),
      include: [
        {
          model: Employee,
          attributes: ["employee_name", "department"],
        },
      ],
    });
    return data;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

module.exports = LeaveById;
