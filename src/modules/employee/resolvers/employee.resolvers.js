const createEmployee = require('./create-employee');
const updateEmployee = require('./update-employee');
const Employees = require('./employees');
const deleteEmployee = require('./delete-employee');
const getEmployeeById = require('./get-employee-by-id');
const getEmployeeByOrganizationId = require("./get-employee-by-organization-id");
const organizationEmployeeByFilterAndCount = require('./get-organization-employee-filter-and-count-wise');
const organizationProbationEmployee = require('./get-probation-employee-detail');
const organizationShiftPolicyWiseEmployee = require('./get-shift-employee-detail');

const resolvers = {
  EmployeeListing: {
    employee_id: {
      resolve: EmployeeListing => EmployeeListing.employee_id,
    },
    user_id: {
      resolve: EmployeeListing => EmployeeListing.user_id,
    },
    role_id: {
      resolve: EmployeeListing => EmployeeListing.role_id,
    },
    organization_id: {
      resolve: EmployeeListing => EmployeeListing.organization_id,
    },
    designation: {
      resolve: EmployeeListing => EmployeeListing.designation,
    },
    salary: {
      resolve: EmployeeListing => EmployeeListing.salary,
    },
    joining_date: {
      resolve: EmployeeListing => EmployeeListing.joining_date,
    },
    leaving_date: {
      resolve: EmployeeListing => EmployeeListing.leaving_date,
    },
    employee_no: {
      resolve: EmployeeListing => EmployeeListing.employee_no,
    },
    "department": {
      resolve: EmployeeListing => EmployeeListing.department,
    },
    "reporting_manager": {
      resolve: EmployeeListing => EmployeeListing.reporting_manager,
    },
    probation_detail: {
      resolve: EmployeeListing => EmployeeListing.probation_detail,
    },
    notice_period: {
      resolve: EmployeeListing => EmployeeListing.notice_period,
    },
    pay_grade: {
      resolve: EmployeeListing => EmployeeListing.pay_grade,
    },
    shift_start_time: {
      resolve: EmployeeListing => EmployeeListing.shift_start_time,
    },
    shift_end_time: {
      resolve: EmployeeListing => EmployeeListing.shift_end_time,
    },
  },
  Query: {
    Employees,
  },
  Mutation: {
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
    getEmployeeByOrganizationId,
    organizationEmployeeByFilterAndCount,
    organizationProbationEmployee,
    organizationShiftPolicyWiseEmployee,
  },
};

module.exports = resolvers;
