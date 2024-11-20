"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_detail extends Model {
    static associate(models) {
      Order_detail.belongsTo(models.Product, {
        foreignKey: "pd_id",
        as: "productOrderDetailData",
        targetKey: "pd_id"
      });

      Order_detail.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "orderDetailData",
        targetKey: "order_id"
      });
    }
  }
  Order_detail.init(
    {
      pd_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Product",
          key: "pd_id",
        },
      },
      order_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Order",
          key: "order_id",
        },
      },
      amount: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      pd_cost: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Order_detail",
    }
  );
  return Order_detail;
};
