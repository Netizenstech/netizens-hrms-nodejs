const { ApolloError } = require("apollo-server-core");
const { trusted } = require("mongoose");
const { nanoid } = require("nanoid");
const randomsting = require("randomstring");

const CONFIG = require("../../../../config/config");
const logger = require("../../../logger");
const { getMessage } = require("../../../utils/messages");

const takeLeave = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const { Leaves: LeavesModel, EmployeeLeave: EmployeeLeave } = ctx.models;

    const LeavesInstance = await LeavesModel.findOne({
      where: {
        employee_id: args.data.employee_id,
        organization_id: args.data.organization_id,
      },
    });

    if (!LeavesInstance) {
      throw new ApolloError(getMessage("LEAVE_NOT_AVAILABLE"));
    }
    var data = {};
    if (args.data.leave_type == "Sick") {
      data = {
        available_leaves: LeavesInstance.available_leaves - args.data.no_of_day,
        sick_leaves: LeavesInstance.sick_leaves - args.data.no_of_day,
        total_leaves_taken:
          LeavesInstance.total_leaves_taken + args.data.no_of_day,
      };
    } else if (args.data.leave_type == "Casual") {
      data = {
        available_leaves: LeavesInstance.available_leaves - args.data.no_of_day,
        casual_leaves: LeavesInstance.casual_leaves - args.data.no_of_day,
        total_leaves_taken:
          LeavesInstance.total_leaves_taken + args.data.no_of_day,
      };
    }

    let updatedLeave = await LeavesModel.update(data, {
      where: {
        employee_id: args.data.employee_id,
        organization_id: args.data.organization_id,
      },
      returning: true,
    });
    const createObject = {
      leave_id: args.addData.leave_id,
      employee_id: args.addData.employee_id,
      organization_leave_type_id: args.addData.organization_leave_type_id,
      approved_by_reporting_manager_id:
        args.addData.is_approved_by_team_manager,
      approved_by_admin_id: args.addData.is_approved_by_hr,
      is_approved_by_reporting_manager:
        args.addData.is_approved_by_reporting_manager,
      is_approved_by_admin: args.addData.is_approved_by_admin,
      last_approved_by: args.addData.last_approved_by,
      next_approved_by: args.addData.next_approved_by,
      is_approval: args.addData.is_approval,
    };
    const showLeavesData = await EmployeeLeave.create(createObject, {
      where: {
        employee_id: args.data.employee_id,
        organization_id: args.data.organization_id,
      },
      returning: true,
    });

    const response = {
      status: "SUCCESS",
      message: getMessage("LEAVES_APPLY_SUCCESS"),
    };

    return response;
  } catch (error) {
    logger.error("ERROR FROM create LEAVES>>>", error);
    return error;
  }
};

module.exports = takeLeave;
