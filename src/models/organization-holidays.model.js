/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrganizationHolidays extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    OrganizationHolidays.init({
        org_holiday_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        organization_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        org_holiday_list_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        holiday_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        is_floater: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, {
        paranoid: true,
        sequelize,
        modelName: 'OrganizationHolidays',
        tableName: 'organization_holidays',
    });

    OrganizationHolidays.associate = models => {
        // OrganizationHolidays.hasMany(models.OrganizationHolidaysHead,{
        //     foreignKey: 'organization_business_unit_id',
        //     sourceKey: 'organization_business_unit_id',
        // })
    };

    return OrganizationHolidays;
};
