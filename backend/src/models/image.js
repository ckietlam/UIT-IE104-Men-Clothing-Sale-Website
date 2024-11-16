"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Product, {
        foreignKey: "pd_id",
        targetKey: "pd_id",
        as: "productImageData",
      });
    }
  }
  Image.init(
    {
      image_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      image: {
        allowNull: false,
        type: DataTypes.BLOB("long"),
      },
      pd_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Product",
          key: "pd_id",
        },
      },
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
