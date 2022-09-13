const { nanoid } = require("nanoid");
const randomsting = require("randomstring");

const CONFIG = require("../../../../config/config");
const logger = require("../../../logger");
const { getMessage } = require("../../../utils/messages");

const createLeave = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const { Leaves: LeavesModel } = ctx.models;

    const createDataObj = {
      employee_id: args.data.employee_id,
      organization_id: args.data.organization_id,
      available_leaves: args.data.available_leaves,
      sick_leaves: args.data.sick_leaves,
      casual_leaves: args.data.casual_leaves,
      total_leaves_taken: 0,
    };

    const LeaveCount = await LeavesModel.count({
      where: {
        employee_id: args.data.employee_id,
        organization_id: args.data.organization_id,
      },
    });

    if (LeaveCount) {
      throw new Error(getMessage("LEAVE_EXISTS"));
    }

    const LeavesModelInstance = await LeavesModel.create(createDataObj, {
      returning: true,
    });

    const response = {
      status: "SUCCESS",
      message: getMessage("LEAVES_CREATE_SUCCESS"),
    };

    return response;
  } catch (error) {
    logger.error("ERROR FROM create LEAVES>>>", error);
    return error;
  }
};

module.exports = createLeave;
