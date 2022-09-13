
/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserExperience extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    UserExperience.init({
        user_experience_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        user_id:{
            type: DataTypes.UUID,
            allowNull: true,
        },
        organization_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        designation:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        location:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        joining_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        leaving_date: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, {
        paranoid: true,
        sequelize,
        modelName: 'UserExperience',
        tableName: 'user_experience',
    });

    UserExperience.associate = models => {
        UserExperience.belongsTo(models.User, {
            foreignKey: 'user_id',
            sourceKey: 'user_id',
        });
    };

    return UserExperience;
};
