/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrganizationLocationHead extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    OrganizationLocationHead.init({
        organization_location_head_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        employee_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        organization_location_id: {
            type: DataTypes.UUID,
            allowNull: false,
        }
    }, {
        paranoid: true,
        sequelize,
        modelName: 'OrganizationLocationHead',
        tableName: 'organization_location_head',
    });

    OrganizationLocationHead.associate = models => {
        OrganizationLocationHead.belongsTo(models.User,{
            foreignKey: 'user_id',
            sourceKey: 'user_id',
        });
        OrganizationLocationHead.belongsTo(models.Employee,{
            foreignKey: 'employee_id',
            sourceKey: 'employee_id',
        });
        // OrganizationLocationHead.hasMany(models.Post, {
        //   as: 'userPosts',
        //   foreignKey: 'createdBy',
        //   sourceKey: 'id',
        //   onDelete: 'RESTRICT',
        //   hooks: true,
        // });
    };

    return OrganizationLocationHead;
};
