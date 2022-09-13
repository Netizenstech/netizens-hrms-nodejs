module.exports = (sequelize, DataTypes) => {
  const LeaveApply = sequelize.define(
    "LeaveApply",
    {
      leave_apply_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      apply_for_half_day_option: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      allow_emp_to_see_and_apply_leave: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      how_early_emp_apply_leave_option: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      leave_request_days: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      check_restriction_for_past_dated_leave: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      emp_leaves_past_days: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      not_allow_emp_past_dated_leaves: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      past_leave_month: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      leave_reaquire_comment: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      leave_exceeds_days: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      paranoid: true,
      sequelize,
      modelName: "LeaveApply",
      tableName: "leave_apply",
    }
  );
  LeaveApply.associate = function (models) {
    LeaveApply.hasMany(models.LeaveNoticeDays, {
      foreignKey: "leave_apply_id",
      sourceKey: "leave_apply_id",
    });
  };
  return LeaveApply;
};
