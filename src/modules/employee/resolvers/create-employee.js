const { nanoid } = require("nanoid");
const randomsting = require("randomstring");

const CONFIG = require("../../../../config/config");
const logger = require("../../../logger");
const { getMessage } = require("../../../utils/messages");

const createEmployee = async (_, args, ctx) => {
  try {
    // const { user } = args;
    const { Employee: EmployeeModel } = ctx.models;
    const EmployeeCount = await EmployeeModel.findOne({
      order: [["employee_id", "DESC"]],
    });
    const createDataObj = {
      user_id: args.data.user_id,
      role_id: args.data.role_id,
      organization_id: args.data.organization_id,
      designation: args.data.designation,
      employee_name: args.data.employee_name,
      salary: args.data.salary,
      joining_date: args.data.joining_date,
      leaving_date: null,
      employee_no: 1,
      department: args.data.department,
      reporting_manager: args.data.reporting_manager,
      probation_detail: args.data.probation_detail || 0,
      notice_period: args.data.notice_period || 0,
      pay_grade: args.data.pay_grade || 0,
      shift_start_time: args.data.shift_start_time || "",
      shift_end_time: args.data.shift_end_time || "",
      organization_probation_policy_id:
        args.data.organization_probation_policy_id || null,
      probation_end_date: args.data.probation_end_date || null,
      probation_status: args.data.probation_status || 0,
      performance_feedback: "",
    };

    // const EmployeeCount = await EmployeeModel.count({ where: { name: args.data.name } });

    // if (EmployeeCount) {
    //   throw new Error(getMessage('EMPLOYEE_EXISTS'));
    // }

    const EmployeeInstance = await EmployeeModel.create(createDataObj, {
      returning: true,
    });

    const response = {
      status: "SUCCESS",
      message: getMessage("EMPLOYEE_CREATE_SUCCESS"),
    };

    return response;
  } catch (error) {
    logger.error("ERROR FROM create employee>>>", error);
    return error;
  }
};

module.exports = createEmployee;
