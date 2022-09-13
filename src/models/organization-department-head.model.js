/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrganizationDepartmentHead extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    OrganizationDepartmentHead.init({
        org_department_head_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        employee_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        organization_department_id: {
            type: DataTypes.UUID,
            allowNull: false,
        }
    }, {
        paranoid: true,
        sequelize,
        modelName: 'OrganizationDepartmentHead',
        tableName: 'organization_department_head',
    });

    OrganizationDepartmentHead.associate = models => {
        OrganizationDepartmentHead.belongsTo(models.User,{
            foreignKey: 'user_id',
            sourceKey: 'user_id',
        });
        OrganizationDepartmentHead.belongsTo(models.Employee,{
            foreignKey: 'employee_id',
            sourceKey: 'employee_id',
        });
        // OrganizationDepartmentHead.hasMany(models.Post, {
        //   as: 'userPosts',
        //   foreignKey: 'createdBy',
        //   sourceKey: 'id',
        //   onDelete: 'RESTRICT',
        //   hooks: true,
        // });
    };

    return OrganizationDepartmentHead;
};
