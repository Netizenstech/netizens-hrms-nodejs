module.exports = (sequelize, DataTypes) => {
  const LeaveRestriction = sequelize.define(
    "LeaveRestriction",
    {
      leave_restriction_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      joinee_emp_apply_leave_after_probation: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      probation_days: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      joinee_emp_apply_leave_after_joining: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      joining_days: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      not_allow_emp_to_apply_leave_during_probation: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      allow_days: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      is_there_limit_of_consecutive_leave_can_be_taken: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      max_consecutive_days: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      is_there_limit_on_leave_balance_can_be_availed_in_month: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      avail_max_days: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      does_emp_in_notice_can_apply_leave: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      apply_from_available_leaves: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      can_manager_override_leave_restricton: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      min_gap_between_two_leaves: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      min_calendar_days: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      not_allow_more_than_leave_request_in_calendar_year: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      leave_request_calendar_year: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      not_allow_more_than_leave_request_in_calendar_month: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      leave_request_calendar_month: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      not_allow_more_than_leave_request_in_entire_tenure: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      leave_request_tenure: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      restrict_emp_from_applying_leave: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      restrict_emp_applying_leave_month: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      leave_cannot_be_taken_along_with: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      leave_search_type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      leave_is_not_availabe_when_there_is_balance: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      leave_balance_search_type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
    },
    {
      paranoid: true,
      sequelize,
      modelName: "LeaveRestriction",
      tableName: "leave_restriction",
    }
  );
  return LeaveRestriction;
};
