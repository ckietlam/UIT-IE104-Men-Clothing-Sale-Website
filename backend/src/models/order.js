"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "User",
      });
      Order.hasMany(models.Order_detail, {
        foreignKey: "order_id",
        as: "orderDetailData",
      });
    }
  }
  Order.init(
    {
      order_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cost: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "user_id",
        },
      },
      address_shipping: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM(
          "Confirming",
          "Preparing",
          "Delivering",
          "Delivered"
        ),
      },
      payment_type: {
        allowNull: false,
        type: DataTypes.ENUM("CASH", "CARD"),
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
