module.exports = (sequelize, DataTypes) => {
  const EmployeeLeave = sequelize.define(
    "EmployeeLeave",
    {
      emp_leave_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      leave_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      employee_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      organization_leave_type_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      approved_by_reporting_manager_id: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null,
      },
      approved_by_admin_id: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null,
      },
      is_approved_by_reporting_manager: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      is_approved_by_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      last_approved_by: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null,
      },
      next_approved_by: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null,
      },
      is_approval: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0, // 0 = Both pending, 1 = Fully Approved, 2 = Partially Approved
      },
      leave_note: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
    },
    {
      paranoid: true,
      sequelize,
      modelName: "EmployeeLeave",
      tableName: "employee_leave",
    }
  );
  EmployeeLeave.associate = function (models) {
    // associations can be defined here
    EmployeeLeave.belongsTo(models.Leaves, {
      foreignKey: "leave_id",
      sourceKey: "leave_id",
    });
    EmployeeLeave.belongsTo(models.Employee, {
      foreignKey: "employee_id",
      sourceKey: "employee_id",
    });
    EmployeeLeave.belongsTo(models.OrganizationLeaveType, {
      foreignKey: "organization_leave_type_id",
      sourceKey: "organization_leave_type_id",
    });
  };
  return EmployeeLeave;
};
