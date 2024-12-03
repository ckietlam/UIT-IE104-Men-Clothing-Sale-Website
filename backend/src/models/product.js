"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: "cat_id",
        targetKey: "cat_id",
        as: "categoryData",
      });
      Product.hasMany(models.Image, {
        foreignKey: "pd_id",
        as: "productImageData",
      });
      Product.hasMany(models.Order_detail, {
        foreignKey: "pd_id",
        as: "productOrderDetailData",
      });
      Product.hasMany(models.Cart_item, {
        foreignKey: "pd_id",
        as: "productCartData",
      });
    }
  }
  Product.init(
    {
      pd_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING(50),
      price: DataTypes.INTEGER,
      type_of_clothes: DataTypes.ENUM(
        "Tees",
        "Sweats",
        "Shirts",
        "Jeans",
        "Shorts",
        "Jackets",
        "Sneakers",
        "Sandals",
        "Boxers",
        "Socks",
        "Hats"
      ),
      description: DataTypes.TEXT,
      cat_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: "Category",
          key: "cat_id",
        },
      },
      size: {
        allowNull: false,
        type: DataTypes.ENUM("S", "M", "L", "39", "40", "41", "42", "None"),
      }
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
