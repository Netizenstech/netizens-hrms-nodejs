const { ApolloError } = require("apollo-server-express");
const logger = require("../../../logger");
const { getMessage } = require("../../../utils/messages");

const createOrganizationLeaveType = async (_, args, ctx) => {
  try {
    const { OrganizationLeaveType: OrganizationLeaveTypeModel } = ctx.models;

    const createDataObj = {
      organization_id: args.data.organization_id,
      name: args.data.name,
      code: args.data.code,
      description: args.data.description || "",
      is_show_list_description_applying:
        args.data.is_show_list_description_applying || false,
      is_paid: args.data.is_paid || false,
      is_sick: args.data.is_sick || false,
      is_statutory: args.data.is_statutory || false,
      is_restrict_to_gender: args.data.is_restrict_to_gender || false,
      gender: args.data.gender || "",
      is_restrict_to_employee: args.data.is_restrict_to_employee || false,
      marital_status: args.data.marital_status || "",
      is_list_of_reason: args.data.is_list_of_reason || false,
      reason: args.data.reason || "",
    };

    const OrganizationLeaveTypeCount = await OrganizationLeaveTypeModel.count({
      where: {
        name: args.data.name,
        organization_id: args.data.organization_id,
      },
    });

    if (OrganizationLeaveTypeCount) {
      throw new Error(getMessage("ORGANIZATION_LEAVE_TYPE_EXISTS"), "409");
    }

    const OrganizationLeaveTypeInstance =
      await OrganizationLeaveTypeModel.create(createDataObj, {
        returning: true,
      });

    const response = {
      status: "SUCCESS",
      message: getMessage("ORGANIZATION_LEAVE_TYPE_CREATE_SUCCESS"),
    };

    return response;
  } catch (error) {
    logger.error("ERROR FROM create ORGANIZATION_LEAVE_TYPE>>>", error);
    // return error;
    throw new ApolloError(error.message, "500");
  }
};

module.exports = createOrganizationLeaveType;
