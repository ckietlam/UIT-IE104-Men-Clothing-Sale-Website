"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Orders", [
      {
        order_id: 1,
        cost: 200000,
        user_id: 1,
        address_shipping: "Hà Nội",
        status: "Confirming",
      },
      {
        order_id: 1,
        cost: 200000,
        user_id: 2,
        address_shipping: "Hà Tĩnh",
        status: "Preparing",
      },
      {
        order_id: 1,
        cost: 200000,
        user_id: 3,
        address_shipping: "Hà Nam",
        status: "Confirming",
      },
      {
        order_id: 1,
        cost: 200000,
        user_id: 4,
        address_shipping: "Hà Đông",
        status: "Delivering",
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
