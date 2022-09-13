/* eslint-disable no-unused-vars */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrganizationLeaveType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrganizationLeaveType.init(
    {
      organization_leave_type_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      organization_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_show_list_description_applying: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      is_paid: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      is_sick: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      is_statutory: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      is_restrict_to_gender: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_restrict_to_employee: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      marital_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_list_of_reason: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      sequelize,
      modelName: "OrganizationLeaveType",
      tableName: "organization_leave_type",
    }
  );

  OrganizationLeaveType.associate = (models) => {
    // OrganizationLeaveType.hasMany(models.Post, {
    //   as: 'userPosts',
    //   foreignKey: 'createdBy',
    //   sourceKey: 'id',
    //   onDelete: 'RESTRICT',
    //   hooks: true,
    // });
    OrganizationLeaveType.hasMany(models.EmployeeLeave, {
      foreignKey: "organization_leave_type_id",
      sourceKey: "organization_leave_type_id",
    });
  };

  return OrganizationLeaveType;
};
