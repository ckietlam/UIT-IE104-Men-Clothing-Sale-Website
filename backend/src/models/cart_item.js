"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart_item extends Model {
    static associate(models) {
      Cart_item.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "user_id",
        as: "userCartData",
      });
      Cart_item.belongsTo(models.Product, {
        foreignKey: "pd_id",
        targetKey: "pd_id",
        as: "productCartData",
      });
    }
  }
  Cart_item.init(
    {
      cart_item_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "user_id",
        },
      },
      pd_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Product",
          key: "pd_id",
        },
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Cart_item",
    }
  );
  return Cart_item;
};
