/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrganizationShiftPolicy extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    OrganizationShiftPolicy.init({
        organization_shift_policy_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        organization_id: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        shift_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        set_as_default: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        shift_code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        flexible_time: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        different_for_different_day_time: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        different_for_different_day_break: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        monday_start_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        monday_end_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tuesday_start_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tuesday_end_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        wednesday_start_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        wednesday_end_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        thursday_start_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        thursday_end_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        friday_start_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        friday_end_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        saturday_start_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        saturday_end_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sunday_start_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sunday_end_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        monday_break_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tuesday_break_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        wednesday_break_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        thursday_break_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        friday_break_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        saturday_break_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sunday_break_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        monday_total_work_hour: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tuesday_total_work_hour: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        wednesday_total_work_hour: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        thursday_total_work_hour: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        friday_total_work_hour: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        saturday_total_work_hour: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sunday_total_work_hour: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        paranoid: true,
        sequelize,
        modelName: 'OrganizationShiftPolicy',
        tableName: 'organization_shift_policy',
    });

    OrganizationShiftPolicy.associate = models => {
        OrganizationShiftPolicy.hasMany(models.Employee, {
            foreignKey: 'organization_shift_policy_id',
            sourceKey: 'organization_shift_policy_id',
        });
    };

    return OrganizationShiftPolicy;
};
