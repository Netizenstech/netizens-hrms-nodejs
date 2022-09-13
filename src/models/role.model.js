/* eslint-disable no-unused-vars */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Role.init(
    {
      role_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      organization_id: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      paranoid: true,
      sequelize,
      modelName: "Role",
      tableName: "role",
    }
  );

  Role.associate = (models) => {
    // Role.hasMany(models.Post, {
    //   as: 'userPosts',
    //   foreignKey: 'createdBy',
    //   sourceKey: 'id',
    //   onDelete: 'RESTRICT',
    //   hooks: true,
    // });
    // Role.hasMany(models.Employee, {
    //   foreignKey: "role_id",
    //   sourceKey: "role_id",
    // });
  };

  return Role;
};
