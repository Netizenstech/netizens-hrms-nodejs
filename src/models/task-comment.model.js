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
    taskId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    taggedUserId: {
      type: DataTypes.STRING, 
      get: function() {
          return JSON.parse(this.getDataValue('taggedUserId'));
      }, 
      set: function(val) {
          return this.setDataValue('taggedUserId', JSON.stringify(val));
      },
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      defaultValue:"",
      allowNull: false
    },
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
