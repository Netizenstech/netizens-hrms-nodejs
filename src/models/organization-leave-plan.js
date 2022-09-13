/* eslint-disable no-unused-vars */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrganizationLeavePlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrganizationLeavePlan.init(
    {
      organization_leave_plan_id: {
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
      leave_calendar_year_start: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      leave_calendar_year_end: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      sequelize,
      modelName: "OrganizationLeavePlan",
      tableName: "organization_leave_plan",
    }
  );

  OrganizationLeavePlan.associate = (models) => {};

  return OrganizationLeavePlan;
};
