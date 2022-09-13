/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrganizationLocation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    OrganizationLocation.init({
        organization_location_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        organization_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        organization_location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        time_zone: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        country: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        state: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        address_line_1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address_line_2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        paranoid: true,
        sequelize,
        modelName: 'OrganizationLocation',
        tableName: 'organization_location',
    });

    OrganizationLocation.associate = models => {
        OrganizationLocation.hasMany(models.OrganizationLocationHead,{
            foreignKey: 'organization_location_id',
            sourceKey: 'organization_location_id',
        });
        OrganizationLocation.belongsTo(models.Country,{
            foreignKey: 'country',
            sourceKey: 'country_id',
        });
        OrganizationLocation.belongsTo(models.CountryTimeZone,{
            foreignKey: 'time_zone',
            sourceKey: 'country_time_zone_id',
        });
        OrganizationLocation.belongsTo(models.State,{
            foreignKey: 'state',
            sourceKey: 'state_id',
        });
    };

    return OrganizationLocation;
};
