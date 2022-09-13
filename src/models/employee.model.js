/* eslint-disable no-unused-vars */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee.init(
    {
      employee_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      organization_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      employee_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reporting_manager: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      salary: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      joining_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      leaving_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      employee_no: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      probation_detail: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      notice_period: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      pay_grade: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      shift_start_time: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      shift_end_time: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organization_business_unit_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      organization_department_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      organization_location_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      organization_probation_policy_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      probation_end_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      probation_status: {
        type: DataTypes.INTEGER, // 0 = probation, 1 = over probation, 2 = terminate
        allowNull: true,
        defaultValue: 0,
      },
      performance_feedback: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      organization_shift_policy_id: {
        type: DataTypes.UUID,
        allowNull: true,
        // defaultValue: null
      },
      org_holiday_list_id: {
        type: DataTypes.UUID,
        allowNull: true,
        // defaultValue: null,
      },
      org_weekly_off_id: {
        type: DataTypes.UUID,
        allowNull: true,
        // defaultValue: null,
      },
      reporting_manager_id: {
        type: DataTypes.UUID,
        // defaultValue: DataTypes.UUIDV4,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      sequelize,
      modelName: "Employee",
      tableName: "employee",
    }
  );

  Employee.associate = (models) => {
    Employee.hasMany(models.MediclaimDetail, {
      foreignKey: "employee_id",
      sourceKey: "employee_id",
    });
    Employee.hasMany(models.Leaves, {
      foreignKey: "employee_id",
      sourceKey: "employee_id",
    });
    Employee.belongsTo(models.Organization, {
      foreignKey: "organization_id",
      sourceKey: "organization_id",
    });
    Employee.belongsTo(models.Role, {
      foreignKey: "role_id",
      sourceKey: "role_id",
    });
    Employee.belongsTo(models.User, {
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
    Employee.belongsTo(models.OrganizationProbationPolicy, {
      foreignKey: "organization_probation_policy_id",
      sourceKey: "organization_probation_policy_id",
    });
    Employee.hasMany(models.EmployeeLeave, {
      foreignKey: "employee_id",
      sourceKey: "employee_id",
    });
  };

  return Employee;
};
