/* eslint-disable no-unused-vars */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MediclaimDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MediclaimDetail.init(
    {
      mediclaim_detail_id: {
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
        allowNull: false,
      },
      policy_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mediclaim_amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      date_of_commencement: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      mobile_no: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_premium_due_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      sequelize,
      modelName: "MediclaimDetail",
      tableName: "mediclaim_detail",
    }
  );

  MediclaimDetail.associate = (models) => {
    // MediclaimDetail.hasMany(models.Post, {
    //   as: 'userPosts',
    //   foreignKey: 'createdBy',
    //   sourceKey: 'id',
    //   onDelete: 'RESTRICT',
    //   hooks: true,
    // });
    MediclaimDetail.belongsTo(models.Employee, {
      foreignKey: "employee_id",
      sourceKey: "employee_id",
    });
  };

  return MediclaimDetail;
};
