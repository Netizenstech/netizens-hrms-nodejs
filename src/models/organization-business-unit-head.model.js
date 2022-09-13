/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrganizationBusinessUnitHead extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    OrganizationBusinessUnitHead.init({
        org_business_unit_head_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        employee_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        organization_business_unit_id: {
            type: DataTypes.UUID,
            allowNull: false,
        }
    }, {
        paranoid: true,
        sequelize,
        modelName: 'OrganizationBusinessUnitHead',
        tableName: 'organization_business_unit_head',
    });

    OrganizationBusinessUnitHead.associate = models => {
        OrganizationBusinessUnitHead.belongsTo(models.User,{
            foreignKey: 'user_id',
            sourceKey: 'user_id',
        });
        OrganizationBusinessUnitHead.belongsTo(models.Employee,{
            foreignKey: 'employee_id',
            sourceKey: 'employee_id',
        });
        // OrganizationBusinessUnitHead.hasMany(models.Post, {
        //   as: 'userPosts',
        //   foreignKey: 'createdBy',
        //   sourceKey: 'id',
        //   onDelete: 'RESTRICT',
        //   hooks: true,
        // });
    };

    return OrganizationBusinessUnitHead;
};
