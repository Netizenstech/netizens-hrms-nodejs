/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrganizationAttendanceWFH extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    OrganizationAttendanceWFH.init({
        attendance_wfh_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        attendance_capture_scheme_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        allow_for_half_day_request: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        allow_to_do_hourly_wfh: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        required_attachment_when_applied: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        allow_clock_in_out: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        rais_wfh_days_option: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        rais_wfh_days: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        },
        rais_wfh_days_in: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ""
        },
        rais_wfh_time_option: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        rais_wfh_time: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        },
        rais_wfh_time_in: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: false
        },
        rais_wfh_past_dated_option: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        rais_wfh_past_dated_months: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        rais_wfh_past_dated_ending_on: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        restrict_past_date_option: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        restrict_past_date_days: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        },
        restrict_emp_raise_wfh_request_option: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        restrict_emp_raise_wfh_request_on: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ""
        },
        apply_wfh_request_option: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        apply_wfh_request_prior_days: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        },
        apply_wfh_request_working_days: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        paranoid: true,
        sequelize,
        modelName: 'OrganizationAttendanceWFH',
        tableName: 'organization_attendance_wfh',
    });

    OrganizationAttendanceWFH.associate = models => {

    };

    return OrganizationAttendanceWFH;
};
