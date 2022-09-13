/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Task.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    projectTaskId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('OPEN','WIP', 'BUG','DONE'),
      allowNull: false
    },
    priority: {
      type: DataTypes.ENUM('LOW','MEDIUM', 'HIGH','URGENT'),
      allowNull: false
    },
    timeTracked: {
      type: DataTypes.STRING,
      defaultValue: "0",
      allowNull: false
    },
    estimatedTime:{
      type: DataTypes.STRING,
      defaultValue: "0",
      allowNull: false
    }
  }, {
    paranoid: true,
    sequelize,
    modelName: 'Task',
    tableName: 'task'
  });

  Task.associate = models => {
    // Task.hasMany(models.Post, {
    //   as: 'userPosts',
    //   foreignKey: 'createdBy',
    //   sourceKey: 'id',
    //   onDelete: 'RESTRICT',
    //   hooks: true,
    // });
  };

  return Task;
};
