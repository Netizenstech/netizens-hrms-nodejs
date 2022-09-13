const logger = require("../../../logger");

const getAllLeaveApprovals = async (_, args, { models }) => {
  try {
    const { EmployeeLeave: EmployeeLeave, Employee: Employee } = models;

    const data = await EmployeeLeave.findAll({
      include: [
        {
          require: false,
          model: Employee,
          attributes: ["employee_name", "department", "reporting_manager_id"],
        },
      ],
      // include: [
      //   {
      //     model: OrganizationLeaveType,
      //     attributes: ["is_paid", "is_sick"],
      //   },
      // ],
    });

    return data;
  } catch (err) {
    logger.error(err);
    return err;
  }
};
module.exports = getAllLeaveApprovals;
