/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrganizationJobTitle extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    OrganizationJobTitle.init({
        org_job_title_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        organization_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        job_title: {
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
        modelName: 'OrganizationJobTitle',
        tableName: 'organization_job_title',
    });

    OrganizationJobTitle.associate = models => {
        // OrganizationJobTitle.hasMany(models.OrganizationBusinessUnitHead,{
        //     foreignKey: 'organization_business_unit_id',
        //     sourceKey: 'organization_business_unit_id',
        // })
    };

    return OrganizationJobTitle;
};
