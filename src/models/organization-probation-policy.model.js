/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrganizationProbationPolicy extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    OrganizationProbationPolicy.init({
        organization_probation_policy_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        organization_id: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        probation_policy_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        probation_period_duration: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        probation_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },
        max_time_probation_extended: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        allow_to_change_emp_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        end_emp_probation_automatic: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        complete_feedback_before_day: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        end_probation_days_before: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        who_give_feedback: {
            type: DataTypes.UUID,
            allowNull: true,
        }
    }, {
        paranoid: true,
        sequelize,
        modelName: 'OrganizationProbationPolicy',
        tableName: 'organization_probation_policy',
    });

    OrganizationProbationPolicy.associate = models => {
        OrganizationProbationPolicy.hasMany(models.Employee, {
            foreignKey: 'organization_probation_policy_id',
            sourceKey: 'organization_probation_policy_id',
        });
        // OrganizationProbationPolicy.hasMany(models.Post, {
        //   as: 'userPosts',
        //   foreignKey: 'createdBy',
        //   sourceKey: 'id',
        //   onDelete: 'RESTRICT',
        //   hooks: true,
        // });
    };

    return OrganizationProbationPolicy;
};
