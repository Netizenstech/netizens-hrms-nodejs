/* eslint-disable no-unused-vars */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrganizationAttendanceCaptureScheme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrganizationAttendanceCaptureScheme.init(
    {
      attendance_capture_scheme_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      organization_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      attendance_capture_scheme: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      set_as_default: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
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
      allow_user_web_clock_if_forgot_id_card: {
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
      is_comment_require_for_remote_clock_in: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      is_approval_require_for_remote_clock_in: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      allow_wfh: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      allow_on_duty: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      allow_emp_to_adjust_attendance: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      allow_attendance_type: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: false,
      },
      emp_allowed_times_option: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      emp_allowed_times: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      emp_allowed_times_in: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      emp_allowed_raised_past_date_option: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      emp_allowed_raised_past_date_beyond: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      emp_allowed_raised_past_date_ending_on: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      restrict_past_date_adjust_option: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      restrict_past_date_adjust_days_back: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      allow_emp_to_regularise_attendance_log: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      emp_allow_regularise_time_option: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      emp_allow_regularise_time: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      emp_allow_regularise_time_in: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      emp_allow_regularise_past_date_option: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      emp_allow_regularise_past_date_beyond: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      emp_allow_regularise_past_date_ending: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      emp_allow_regularise_past_date_restrict_option: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      emp_allow_regularise_past_date_restrict_days: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      paranoid: true,
      sequelize,
      modelName: "OrganizationAttendanceCaptureScheme",
      tableName: "organization_attendance_capture_scheme",
    }
  );

  OrganizationAttendanceCaptureScheme.associate = (models) => {
    OrganizationAttendanceCaptureScheme.belongsTo(
      models.OrganizationAttendanceWFH,
      {
        foreignKey: "attendance_capture_scheme_id",
        sourceKey: "attendance_capture_scheme_id",
      }
    );
  };

  return OrganizationAttendanceCaptureScheme;
};
