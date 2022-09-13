/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrganizationDepartment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    OrganizationDepartment.init({
        organization_department_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        organization_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        department_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        department_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        allow_employee_post: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        allow_employee_post_announcement: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        allow_employee_post_polls: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        paranoid: true,
        sequelize,
        modelName: 'OrganizationDepartment',
        tableName: 'organization_department',
    });

    OrganizationDepartment.associate = models => {
        OrganizationDepartment.hasMany(models.OrganizationDepartmentHead, {
            foreignKey: 'organization_department_id',
            sourceKey: 'organization_department_id',
        })
        // OrganizationDepartment.hasMany(models.Post, {
        //   as: 'userPosts',
        //   foreignKey: 'createdBy',
        //   sourceKey: 'id',
        //   onDelete: 'RESTRICT',
        //   hooks: true,
        // });
    };

    return OrganizationDepartment;
};
