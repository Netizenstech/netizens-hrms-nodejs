/* eslint-disable no-param-reassign */
/* eslint-disable security/detect-object-injection */
const Sequelize = require("sequelize");

const CONFIG = require("../../config/config");

const operatorsAliases = require("./sequelize-operators-aliases");
const role = require("./role.model");
const user = require("./user.model");
const project = require("./project.model");
const employee = require("./employee.model");
const organization = require("./organization.model");
const mediclaimDetail = require("./mediclaim-detail.model");
const leaves = require("./leaves.model");
const userExperience = require("./user-experience.model");
const userEducation = require("./user-education.model");
const userLoan = require("./user-loan-detail");
const userDocument = require("./user-documents.model");
const organizationLeaveType = require("./organization-leave-type.model");
const organizationShiftPolicy = require("./organization-shift-policy.model");
const organizationProbationPolicy = require("./organization-probation-policy.model");
const OrganizationBusinessUnit = require("./organization-business-unit.model");
const OrganizationDepartment = require("./organization-department.model");
const OrganizationBusinessUnitHead = require("./organization-business-unit-head.model");
const OrganizationLocation = require("./organization-location.model");
const OrganizationLocationHead = require("./organization-location-head.model");
const OrganizationDepartmentHead = require("./organization-department-head.model");
const OrganizationJobTitle = require("./organization-job-title.model");
const organizationWeeklyOff = require("./organization-weekly-off-policy.model");
const organizationHolidayList = require("./organization-holiday-list.model");
const organizationHolidays = require("./organization-holidays.model");
const country = require("./country.model");
const countryTimezone = require("./country-timezone.model");
const state = require("./state.model");
const organizationLeavePlan = require("./organization-leave-plan");
const organizationLeavePlanAssigned = require("./organization-leave-plan-assigned");
const organizationAttendanceCaptureScheme = require("./organization-attendance-capture-scheme.model");
const organizationAttendanceWFH = require("./organization-attendance-wfh.model");
const attendanceCaptureSchema = require("./attendence-capture-schema.model.");
const attendenceCaptureSchemaWFH = require("./attendence-capture-schema-wfh.model");
const EmployeeLeave = require("./leave-approval.model");
const LeaveAccrual = require("./leave-accrual.model");
const LeaveAccrualSuboption = require("./leave-accrual-suboption.model");
const LeaveApply = require("./leave-apply.model");
const LeaveNoticeDays = require("./leave-notice-days.model");
const LeaveRestriction = require("./leave-restriction.model");
const HolidayWeekOff = require("./holiday-weekoff.model");
let sequelize;
if (CONFIG.postgres) {
  sequelize = new Sequelize(CONFIG.postgres, {
    dialect: "postgres",
    operatorsAliases,
    logging: false,
    // Specify options, which are used when sequelize.define is called.
    define: {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        },
      },
      freezeTableName: true,
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  });
} else {
  sequelize = new Sequelize(
    Object.assign(CONFIG, {
      operatorsAliases,
      logging: false,
      dialect: "postgres",
      // Specify options, which are used when sequelize.define is called.
      define: {
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        paranoid: true,
      },
    })
  );
}

role(sequelize, Sequelize.DataTypes);
user(sequelize, Sequelize.DataTypes);
project(sequelize, Sequelize.DataTypes);
employee(sequelize, Sequelize.DataTypes);
organization(sequelize, Sequelize.DataTypes);
mediclaimDetail(sequelize, Sequelize.DataTypes);
leaves(sequelize, Sequelize.DataTypes);
userExperience(sequelize, Sequelize.DataTypes);
userEducation(sequelize, Sequelize.DataTypes);
userLoan(sequelize, Sequelize.DataTypes);
userDocument(sequelize, Sequelize.DataTypes);
organizationLeaveType(sequelize, Sequelize.DataTypes);
organizationShiftPolicy(sequelize, Sequelize.DataTypes);
organizationProbationPolicy(sequelize, Sequelize.DataTypes);
OrganizationBusinessUnit(sequelize, Sequelize.DataTypes);
OrganizationDepartment(sequelize, Sequelize.DataTypes);
OrganizationBusinessUnitHead(sequelize, Sequelize.DataTypes);
OrganizationLocation(sequelize, Sequelize.DataTypes);
OrganizationLocationHead(sequelize, Sequelize.DataTypes);
OrganizationDepartmentHead(sequelize, Sequelize.DataTypes);
OrganizationJobTitle(sequelize, Sequelize.DataTypes);
organizationWeeklyOff(sequelize, Sequelize.DataTypes);
organizationHolidayList(sequelize, Sequelize.DataTypes);
organizationHolidays(sequelize, Sequelize.DataTypes);
country(sequelize, Sequelize.DataTypes);
countryTimezone(sequelize, Sequelize.DataTypes);
state(sequelize, Sequelize.DataTypes);
organizationLeavePlan(sequelize, Sequelize.DataTypes);
organizationLeavePlanAssigned(sequelize, Sequelize.DataTypes);
organizationAttendanceCaptureScheme(sequelize, Sequelize.DataTypes);
organizationAttendanceWFH(sequelize, Sequelize.DataTypes);
attendanceCaptureSchema(sequelize, Sequelize.DataTypes);
attendenceCaptureSchemaWFH(sequelize, Sequelize.DataTypes);
EmployeeLeave(sequelize, Sequelize.DataTypes);
LeaveAccrual(sequelize, Sequelize.DataTypes);
LeaveAccrualSuboption(sequelize, Sequelize.DataTypes);
LeaveApply(sequelize, Sequelize.DataTypes);
LeaveNoticeDays(sequelize, Sequelize.DataTypes);
LeaveRestriction(sequelize, Sequelize.DataTypes);
HolidayWeekOff(sequelize, Sequelize.DataTypes);

const { models } = sequelize;

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

module.exports = { sequelize, models, Sequelize };
