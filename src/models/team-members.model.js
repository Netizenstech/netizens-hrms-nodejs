/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TeamMembers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  TeamMembers.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    teamId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    role:{
      type: DataTypes.ENUM('','r', 'rw', 'rwd'),
      allowNull: false
    }    
  }, {
    paranoid: true,
    sequelize,
    modelName: 'TeamMembers',
    tableName: 'team_members'
  });

  TeamMembers.associate = models => {
    // TeamMembers.hasMany(models.Post, {
    //   as: 'userPosts',
    //   foreignKey: 'createdBy',
    //   sourceKey: 'id',
    //   onDelete: 'RESTRICT',
    //   hooks: true,
    // });
  };

  return Employee;
};
