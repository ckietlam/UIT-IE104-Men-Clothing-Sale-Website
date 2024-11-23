"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("products", {
      pd_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      type_of_clothes: {
        allowNull: false,
        type: Sequelize.ENUM(
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
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      cat_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "categories",
          key: "cat_id",
        },
      },
      size: {
        allowNull: false,
        type: Sequelize.ENUM("S", "M", "L", "39", "40", "41", "42", "None"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("products");
  },
};
