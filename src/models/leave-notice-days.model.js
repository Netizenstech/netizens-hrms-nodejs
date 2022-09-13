module.exports = (sequelize, DataTypes) => {
  const LeaveNoticeDays = sequelize.define(
    "LeaveNoticeDays",
    {
      leave_notice_days_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      leave_apply_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      days_for_more_duration: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      leave_notice_days: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      working_days: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      paranoid: true,
      sequelize,
      modelName: "LeaveNoticeDays",
      tableName: "leave_notice_days",
    }
  );
  LeaveNoticeDays.associate = function (models) {
    LeaveNoticeDays.belongsTo(models.LeaveApply, {
      foreignKey: "leave_apply_id",
      sourceKey: "leave_apply_id",
    });
  };
  return LeaveNoticeDays;
};
