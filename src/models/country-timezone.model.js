/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CountryTimeZone extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    CountryTimeZone.init({
        country_time_zone_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        time_zone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country_id:{
            type: DataTypes.UUID,
            allowNull: true,
        },
        uuid: {
            type: DataTypes.STRING,
            allowNull: true,
        }
        
    }, {
        paranoid: true,
        sequelize,
        modelName: 'CountryTimeZone',
        tableName: 'country_time_zone',
    });

    CountryTimeZone.associate = models => {
        // CountryTimeZone.hasMany(models.Post, {
        //   as: 'userPosts',
        //   foreignKey: 'createdBy',
        //   sourceKey: 'id',
        //   onDelete: 'RESTRICT',
        //   hooks: true,
        // });
    };

    return CountryTimeZone;
};
