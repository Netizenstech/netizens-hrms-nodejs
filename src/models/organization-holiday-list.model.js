/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrganizationHolidayList extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    OrganizationHolidayList.init({
        org_holiday_list_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        organization_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        holiday_list_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        paranoid: true,
        sequelize,
        modelName: 'OrganizationHolidayList',
        tableName: 'organization_holiday_list',
    });

    OrganizationHolidayList.associate = models => {
        // OrganizationHolidayList.hasMany(models.OrganizationHolidayListHead,{
        //     foreignKey: 'organization_business_unit_id',
        //     sourceKey: 'organization_business_unit_id',
        // })
    };

    return OrganizationHolidayList;
};
