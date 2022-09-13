const logger = require("../../../logger");

const getLeaveApprovalById = async (_, args, ctx) => {
  try {
    const { EmployeeLeave: EmployeeLeave, Employee: Employee } = ctx.models;
    const data = await EmployeeLeave.findOne({
      where: {
        employee_id: args.data.employee_id,
      },

      include: [
        {
          require: false,
          model: Employee,
          attributes: ["employee_name", "department", "reporting_manager_id"],
        },
      ],
    });
    return data;
  } catch (err) {
    logger.error(err);
    return err;
  }
};
module.exports = getLeaveApprovalById;
