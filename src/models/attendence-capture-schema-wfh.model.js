module.exports = (sequelize, DataTypes) => {
  const AttendenceCaptureSchemaWFH = sequelize.define(
    "AttendenceCaptureSchemaWFH",
    {
      wfh_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      attendence_capture_schema_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      allow_half_day: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      allow_hourly_work: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      require_attachments_for_wfh_request: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      allow_clock_in_out: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      raise_days_wfh_option: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      raise_days: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      raise_days_in: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      raise_time_wfh_option: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      raise_time: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      raise_time_in: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      raise_past_wfh_request: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      not_beyond_months: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      ending_month: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      restrict_past_dated_wfh_request: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      restrict_days: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      restrict_emp_raise_wfh: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      restrict_emp_raise_wfh_on: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      wfh_requires: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      wfh_notice_days: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      wfh_working_days: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
    },
    {
      paranoid: true,
      sequelize,
      modelName: "AttendenceCaptureSchemaWFH",
      tableName: "attendence_schema_wfh",
    }
  );
  return AttendenceCaptureSchemaWFH;
};
