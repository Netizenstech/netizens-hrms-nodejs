/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Country extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Country.init({
        country_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        country_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uuid:{
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        paranoid: true,
        sequelize,
        modelName: 'Country',
        tableName: 'country',
    });

    Country.associate = models => {
        // Country.hasMany(models.Post, {
        //   as: 'userPosts',
        //   foreignKey: 'createdBy',
        //   sourceKey: 'id',
        //   onDelete: 'RESTRICT',
        //   hooks: true,
        // });
    };

    return Country;
};
