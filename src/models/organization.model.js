/* eslint-disable no-unused-vars */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Organization.init(
    {
      organization_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organization_logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organization_background: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      sequelize,
      modelName: "Organization",
      tableName: "organization",
    }
  );

  Organization.associate = (models) => {
    // Organization.hasMany(models.Post, {
    //   as: 'userPosts',
    //   foreignKey: 'createdBy',
    //   sourceKey: 'id',
    //   onDelete: 'RESTRICT',
    //   hooks: true,
    // });
    Organization.hasMany(models.Employee, {
      foreignKey: "organization_id",
      sourceKey: "organization_id",
    });
  };

  return Organization;
};
