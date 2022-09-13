/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserEducation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    UserEducation.init({
        user_education_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        user_id:{
            type: DataTypes.UUID,
            allowNull: true,
        },
        education_center_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        course: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        degree:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        joining_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        leaving_date: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, {
        paranoid: true,
        sequelize,
        modelName: 'UserEducation',
        tableName: 'user_education',
    });

    UserEducation.associate = models => {
        UserEducation.belongsTo(models.User, {
            foreignKey: 'user_id',
            sourceKey: 'user_id',
        });
    };

    return UserEducation;
};
