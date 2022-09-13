/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrganizationBusinessUnit extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    OrganizationBusinessUnit.init({
        organization_business_unit_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        organization_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        business_unit_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        business_unit_email: {
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
        modelName: 'OrganizationBusinessUnit',
        tableName: 'organization_business_unit',
    });

    OrganizationBusinessUnit.associate = models => {
        OrganizationBusinessUnit.hasMany(models.OrganizationBusinessUnitHead,{
            foreignKey: 'organization_business_unit_id',
            sourceKey: 'organization_business_unit_id',
        })
    };

    return OrganizationBusinessUnit;
};
