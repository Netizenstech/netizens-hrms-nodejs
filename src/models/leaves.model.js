/* eslint-disable no-unused-vars */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Leaves extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Leaves.init(
    {
      leave_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      employee_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      organization_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      available_leaves: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      sick_leaves: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      casual_leaves: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      total_leaves_taken: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      sequelize,
      modelName: "Leaves",
      tableName: "leaves",
    }
  );

  Leaves.associate = (models) => {
    Leaves.hasMany(models.EmployeeLeave, {
      foreignKey: "leave_id",
      sourceKey: "leave_id",
    });
    Leaves.belongsTo(models.Employee, {
      foreignKey: "employee_id",
      sourceKey: "employee_id",
    });
  };

  return Leaves;
};
