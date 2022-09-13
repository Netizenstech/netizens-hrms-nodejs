/* eslint-disable no-unused-vars */
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      middle_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      display_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      marital_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: true,
      },
      work_email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      work_phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      residence_phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      current_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_of_birth: {
        type: DataTypes.DATE,
      },
      address: {
        type: DataTypes.STRING,
      },
      mobile_number: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      blood_group: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.STRING,
        required: false,
      },
      refreshToken: {
        type: DataTypes.STRING,
        required: false,
      },
      profile_url: {
        type: DataTypes.STRING,
        required: true,
        defaultValue: "",
      },
      organization_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      defaultScope: {
        // attributes: { exclude: ['password'] }
      },
      paranoid: true,
      sequelize,
      modelName: "User",
      tableName: "user",
    }
  );
  User.associate = (models) => {
    User.hasMany(models.Employee, {
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
    User.hasMany(models.UserExperience, {
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
    User.hasMany(models.UserEducation, {
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
    User.hasMany(models.UserLoanDetail, {
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
    User.hasMany(models.EmployeeLeave, {
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
    // User.hasMany(models.PostLike, {
    //   as: 'userPostLikes',
    //   foreignKey: 'likedBy',
    //   sourceKey: 'id',
    //   onDelete: 'RESTRICT',
    //   hooks: true,
    // });
    // User.hasMany(models.Comment, {
    //   as: 'userComments',
    //   foreignKey: 'createdBy',
    //   sourceKey: 'id',
    //   onDelete: 'RESTRICT',
    //   hooks: true,
    // });
    // User.hasMany(models.CommentLike, {
    //   as: 'userCommentLikes',
    //   foreignKey: 'likedBy',
    //   sourceKey: 'id',
    //   onDelete: 'RESTRICT',
    //   hooks: true,
    // });
    // User.hasMany(models.Notification, {
    //   as: 'receivers',
    //   foreignKey: 'receiverId',
    //   sourceKey: 'id',
    //   onDelete: 'RESTRICT',
    //   hooks: true,
    // });
    // User.hasMany(models.Notification, {
    //   as: 'senders',
    //   foreignKey: 'senderId',
    //   sourceKey: 'id',
    //   onDelete: 'RESTRICT',
    //   hooks: true,
    // });
    // User.hasMany(models.PinPost, {
    //   as: 'pinnedPosts',
    //   foreignKey: 'userId',
    //   sourceKey: 'id',
    //   onDelete: 'RESTRICT',
    //   hooks: true,
    // });
  };

  return User;
};
