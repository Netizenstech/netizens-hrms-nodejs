/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrganizationLeavePlanAssigned extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    OrganizationLeavePlanAssigned.init({
        organization_leave_plan_assigned_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        organization_leave_plan_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        organization_leave_type_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        leave_limit: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        },
        unlimited: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        apply_being_accrued: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        beyond_annual_quota: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        not_excluding_day: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        },
        is_leave_quota_allocated_to_join_month: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        month: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0
        },
        credit_to_his_reports: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
    }, {
        paranoid: true,
        sequelize,
        modelName: 'OrganizationLeavePlanAssigned',
        tableName: 'organization_leave_plan_assigned',
    });

    OrganizationLeavePlanAssigned.associate = models => {
        OrganizationLeavePlanAssigned.belongsTo(models.OrganizationLeaveType,{
            foreignKey: 'organization_leave_type_id',
            sourceKey: 'organization_leave_type_id',
        })
    };

    return OrganizationLeavePlanAssigned;
};
