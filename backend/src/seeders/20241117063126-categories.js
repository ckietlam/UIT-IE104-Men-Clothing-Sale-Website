"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Categories", [
      {
        cat_id: 1,
        name: "Office Wear",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cat_id: 2,
        name: "Casual Wear",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cat_id: 3,
        name: "Sportswear",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cat_id: 4,
        name: "Party Wear",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cat_id: 5,
        name: "Traditional Wear",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cat_id: 6,
        name: "Summer Wear",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cat_id: 7,
        name: "Winter Wear",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cat_id: 8,
        name: "Spring Wear",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cat_id: 9,
        name: "Autumn Wear",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
