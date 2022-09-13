const createLeave = require("./create-leave");
const updateLeave = require("./update-leave");
const Leaves = require("./leaves");
const deleteLeave = require("./delete-leave");
const getLeaveById = require("./get-leave-by-id");
const takeLeave = require("./take-leave");
const cancelLeave = require("./cancel-leave");
const AcceptEmployeeLeave = require("./leave-approval");
const getAllLeaveApprovals = require("./get-leave-approval");
const getLeaveApprovalById = require("./get-leave-approval-by-id");
const createLeaveAccrual = require("./create-leave-accrual");
const getLeaveAccrual = require("./get-leave-accrual");
const createLeaveAccrualSuboption = require("./create-leave-accrual-suboption");
const createHolidayWeekOff = require("./create-holiday-week-off");
const getHolidayWeekOff = require("./get-holiday-weekoff");
const updateHolidayWeekOff = require("./update-holiday-weekoff");
const createLeaveApply = require("./create-leave-apply");
const getLeaveApplyPlan = require("./get-leave-apply-plan");
const updateLeaveApplyPlan = require("./update-leave-apply-plan");
const createLeaveRestriction = require("./create-leave-restriction");
const getLeaveRestriction = require("./get-leave-restrictions");
const updateLeaveRestriction = require("./update-leave-restriction");

const resolvers = {
  LeaveListing: {
    leave_id: {
      resolve: (EmployeeListing) => EmployeeListing.leave_id,
    },
    employee_id: {
      resolve: (EmployeeListing) => EmployeeListing.employee_id,
    },
    organization_id: {
      resolve: (EmployeeListing) => EmployeeListing.organization_id,
    },
    available_leaves: {
      resolve: (EmployeeListing) => EmployeeListing.available_leaves,
    },
    sick_leaves: {
      resolve: (EmployeeListing) => EmployeeListing.sick_leaves,
    },
    casual_leaves: {
      resolve: (EmployeeListing) => EmployeeListing.casual_leaves,
    },
    total_leaves_taken: {
      resolve: (EmployeeListing) => EmployeeListing.total_leaves_taken,
    },
  },
  Query: {
    Leaves,
  },
  Mutation: {
    createLeave,
    updateLeave,
    deleteLeave,
    getLeaveById,
    takeLeave,
    cancelLeave,
    AcceptEmployeeLeave,
    getAllLeaveApprovals,
    getLeaveApprovalById,
    createLeaveAccrual,
    getLeaveAccrual,
    createLeaveAccrualSuboption,
    createHolidayWeekOff,
    getHolidayWeekOff,
    updateHolidayWeekOff,
    createLeaveApply,
    getLeaveApplyPlan,
    updateLeaveApplyPlan,
    createLeaveRestriction,
    getLeaveRestriction,
    updateLeaveRestriction,
  },
};

module.exports = resolvers;
