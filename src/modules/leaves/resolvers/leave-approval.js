const logger = require("../../../logger");
const { getMessage } = require("../../../utils/messages");

const AcceptEmployeeLeave = async (_, args, ctx) => {
  let message;
  try {
    const { EmployeeLeave: EmployeeLeave } = ctx.models;
    const createObject = {
      emp_leave_id: args.data.emp_leave_id,
      // leave_id: args.data.leave_id,
      // employee_id: args.data.employee_id,
      // organization_leave_type_id: args.data.organization_leave_type_id,
      // approved_by_reporting_manager_id: args.data.is_approved_by_team_manager,
      // approved_by_admin_id: args.data.is_approved_by_hr,
      // is_approved_by_reporting_manager:
      //   args.data.is_approved_by_reporting_manager,
      // is_approved_by_admin: args.data.is_approved_by_admin,
      // last_approved_by: args.data.last_approved_by,
      // next_approved_by: args.data.next_approved_by,
      is_approval: args.data.is_approval,
    };
    if (args.data.is_approval === 0) {
      const leaveApproved = await EmployeeLeave.update(createObject, {
        where: {
          emp_leave_id: args.data.emp_leave_id,
        },
        returning: true,
      });
      message = getMessage("LEAVE_PENDING");
    } else if (args.data.is_approval === 1) {
      const leaveApproved = await EmployeeLeave.update(createObject, {
        where: {
          emp_leave_id: args.data.emp_leave_id,
        },
        returning: true,
      });
      message = getMessage("LEAVE_SUCCESS");
    } else {
      const leaveApproved = await EmployeeLeave.update(createObject, {
        where: {
          emp_leave_id: args.data.emp_leave_id,
        },
        returning: true,
      });
      message = getMessage("LEAVE_PARTIALLY_APPROVED");
    }
    const response = {
      status: "SUCCESS",
      message: message,
    };
    return response;
  } catch (err) {
    logger.error(err);
  }
};
module.exports = AcceptEmployeeLeave;
