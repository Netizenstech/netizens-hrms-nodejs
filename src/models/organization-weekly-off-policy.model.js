/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrganizationWeeklyOff extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    OrganizationWeeklyOff.init({
        org_weekly_off_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        organization_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        weekly_off_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        select_days: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        set_as_default: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    }, {
        paranoid: true,
        sequelize,
        modelName: 'OrganizationWeeklyOff',
        tableName: 'organization_weekly_off',
    });

    OrganizationWeeklyOff.associate = models => {
        OrganizationWeeklyOff.hasMany(models.Employee, {
            foreignKey: 'org_weekly_off_id',
            sourceKey: 'org_weekly_off_id',
        });
    };

    return OrganizationWeeklyOff;
};
