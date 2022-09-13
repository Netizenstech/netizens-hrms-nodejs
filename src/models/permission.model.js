/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Permission.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    projectManagement: {
      type: DataTypes.ENUM('','r', 'rw', 'rwd'),
      allowNull: false,
    },
    recruitManagement: {
      type: DataTypes.ENUM('','r', 'rw', 'rwd'),
      allowNull: false,
    },
    clientManagement: {
      type: DataTypes.ENUM('','r', 'rw', 'rwd'),
      allowNull: false,
    },
    employeeManagement: {
      type: DataTypes.ENUM('','r', 'rw', 'rwd'),
      allowNull: false,
    },
    organizationManagement: {
      type: DataTypes.ENUM('','r', 'rw', 'rwd'),
      allowNull: false,
    },
    attendanceManagement: {
      type: DataTypes.ENUM('','r', 'rw', 'rwd'),
      allowNull: false,
    },
  }, {
    paranoid: true,
    sequelize,
    modelName: 'Permission',
    tableName: 'permission'
  });

  Permission.associate = models => {
    // Permission.hasMany(models.Post, {
    //   as: 'userPosts',
    //   foreignKey: 'createdBy',
    //   sourceKey: 'id',
    //   onDelete: 'RESTRICT',
    //   hooks: true,
    // });
  };

  return Permission;
};
