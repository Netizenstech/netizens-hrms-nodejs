module.exports = (sequelize, DataTypes) => {
  const AttendenceCaptureSchema = sequelize.define(
    "AttendenceCaptureSchema",
    {
      attendence_capture_schema_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      organization_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      attendence_capture_schema: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_used_bio_metric: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      is_used_web_clock: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      is_used_remote_clock: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      allow_user_web_clock_if_forget_id_card: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      allow_remote_clock_in_mobile: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      allow_remote_clock_in_web: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      is_comment_required_for_remote_clock_in: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      is_approval_required_for_remote_clock_in: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      is_allow_wfh: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      is_allow_on_duty: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      allow_emp_to_adjust_attendence_logs: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      edit_attendence_type_in: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      emp_allowed_time_option: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      emp_time: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      emp_time_in: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      emp_raise_past_date_adjustment_request: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      emp_raise_past_date_beyond: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      emp_raise_past_date_ending_on: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      restrict_past_dated_adjustment: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      restricts_past_dated_days: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      allow_emp_to_regularise_attendence_logs: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      allow_emp_regularise_by_time: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      allow_emp_regularise_time: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      allow_emp_regularise_time_in: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      emp_raise_past_dated_regularisation_request: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      emp_raise_regularisation_beyond: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      emp_raise_regularisation_endind: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      restrict_past_dated_regularisation: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defa: false,
      },
      restrict_past_dated_regularisation_days: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      allow_emp_to_raise_partial_work_day_request: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      emp_partial_days: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      emp_partial_days_in: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      late_arrival_request: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      late_arrival_request_min: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      early_leaving_request: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      early_leaving_request_min: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      partial_day_leave_request: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      comment_require_for_partial_work_day_request: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      paranoid: true,
      sequelize,
      modelName: "AttendenceCaptureSchema",
      tableName: "attendence_schema",
    }
  );
  AttendenceCaptureSchema.associate = function (models) {
    // associations can be defined here
    AttendenceCaptureSchema.belongsTo(models.AttendenceCaptureSchemaWFH, {
      foreignKey: "attendence_capture_schema_id",
    });
  };
  return AttendenceCaptureSchema;
};
