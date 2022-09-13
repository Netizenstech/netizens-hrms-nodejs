/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserDocument extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    UserDocument.init({
        user_document_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        user_id:{
            type: DataTypes.UUID,
            allowNull: true,
        },
        document_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        document_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        paranoid: true,
        sequelize,
        modelName: 'UserDocument',
        tableName: 'user_document',
    });

    UserDocument.associate = models => {
        UserDocument.belongsTo(models.User, {
            foreignKey: 'user_id',
            sourceKey: 'user_id',
        });
    };

    return UserDocument;
};
