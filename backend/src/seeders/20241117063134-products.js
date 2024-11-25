"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Products", [
      {
        pd_id: 1,
        name: "Áo thun nam cổ tròn - Màu trắng",
        price: "200000",
        type_of_clothes: "Tees",
        description: "Áo dành cho người hay thức khuya",
        cat_id: 2,
        size: "M",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 2,
        name: "Áo thun nam cổ tròn - Màu đen",
        price: 220000,
        type_of_clothes: "Tees",
        description:
          "Áo thun nam đơn giản và thời trang, phù hợp mọi hoàn cảnh",
        cat_id: 1,
        size: "M",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 3,
        name: "Quần jeans nam - Classic Fit",
        price: 450000,
        type_of_clothes: "Jeans",
        description: "Quần jeans với kiểu dáng cổ điển, chất liệu bền đẹp",
        cat_id: 2,
        size: "L",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 4,
        name: "Áo khoác gió nam - Màu xanh navy",
        price: 550000,
        type_of_clothes: "Jackets",
        description: "Áo khoác nhẹ chống gió, lý tưởng cho mùa thu đông",
        cat_id: 3,
        size: "M",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 5,
        name: "Giày sneakers - Phong cách thể thao",
        price: 850000,
        type_of_clothes: "Sneakers",
        description:
          "Giày thể thao với thiết kế hiện đại, đế êm ái phù hợp mọi hoạt động",
        cat_id: 4,
        size: "42",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 6,
        name: "Mũ lưỡi trai - Màu xám",
        price: 120000,
        type_of_clothes: "Hats",
        description:
          "Mũ lưỡi trai trẻ trung, thích hợp cho hoạt động ngoài trời",
        cat_id: 5,
        size: "S",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 7,
        name: "Áo sơ mi trắng - Basic",
        price: 350000,
        type_of_clothes: "Shirts",
        description:
          "Áo sơ mi trắng với kiểu dáng cơ bản, phù hợp công sở và sự kiện",
        cat_id: 6,
        size: "M",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 8,
        name: "Quần shorts nam - Chất liệu cotton",
        price: 270000,
        type_of_clothes: "Shorts",
        description: "Quần shorts thoải mái, thích hợp mặc mùa thi cử",
        cat_id: 7,
        size: "L",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 9,
        name: "Áo nỉ hoodie - Màu xám",
        price: 500000,
        type_of_clothes: "Sweats",
        description: "Áo nỉ hoodie giữ ấm, phù hợp mặc khi qua môn",
        cat_id: 8,
        size: "M",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 10,
        name: "Tất cotton cao cấp",
        price: 60000,
        type_of_clothes: "Socks",
        description: "Tất cotton mềm mại, thoáng khí, chống rớt môn",
        cat_id: 9,
        size: "L",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 11,
        name: "Dép sandal nam - Kiểu dáng hiện đại",
        price: 250000,
        type_of_clothes: "Sandals",
        description: "Dép sandal tiện lợi và thời trang, thích hợp mùa hè",
        cat_id: 2,
        size: "41",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 12,
        name: "Áo thun nam cổ tròn - Màu đỏ",
        price: 210000,
        type_of_clothes: "Tees",
        description:
          "Áo thun nam cổ tròn màu đỏ, dễ phối đồ và tạo phong cách trẻ trung",
        cat_id: 1,
        size: "M",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 13,
        name: "Quần jeans nam - Slim Fit",
        price: 470000,
        type_of_clothes: "Jeans",
        description:
          "Quần jeans dáng slim, phù hợp cho người yêu thích phong cách hiện đại",
        cat_id: 2,
        size: "L",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 14,
        name: "Áo khoác bomber nam - Màu đen",
        price: 600000,
        type_of_clothes: "Jackets",
        description:
          "Áo khoác bomber nam, thiết kế thời trang và ấm áp cho mùa đông",
        cat_id: 3,
        size: "M",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 15,
        name: "Giày sneakers - Màu trắng",
        price: 900000,
        type_of_clothes: "Sneakers",
        description:
          "Giày sneakers trắng cổ thấp, phù hợp với nhiều phong cách",
        cat_id: 4,
        size: "42",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 16,
        name: "Mũ lưỡi trai - Màu đen",
        price: 130000,
        type_of_clothes: "Hats",
        description:
          "Mũ lưỡi trai màu đen, thiết kế đơn giản và phù hợp với nhiều phong cách",
        cat_id: 5,
        size: "None",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 17,
        name: "Áo sơ mi caro nam",
        price: 380000,
        type_of_clothes: "Shirts",
        description:
          "Áo sơ mi caro với họa tiết trẻ trung, dễ phối đồ cho nhiều dịp",
        cat_id: 6,
        size: "M",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 18,
        name: "Quần shorts nam - Kaki",
        price: 290000,
        type_of_clothes: "Shorts",
        description:
          "Quần shorts kaki, thoải mái và dễ dàng kết hợp với các loại áo",
        cat_id: 7,
        size: "L",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 19,
        name: "Áo hoodie nam - Màu xanh dương",
        price: 550000,
        type_of_clothes: "Sweats",
        description:
          "Áo hoodie màu xanh dương với chất liệu nỉ mềm mại, giữ ấm tốt",
        cat_id: 8,
        size: "M",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 20,
        name: "Tất thể thao nam - Chất liệu cotton",
        price: 70000,
        type_of_clothes: "Socks",
        description:
          "Tất thể thao cotton, thấm hút mồ hôi, giúp bạn thoải mái trong vận động",
        cat_id: 9,
        size: "None",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 21,
        name: "Dép sandal nam - Kiểu dáng đơn giản",
        price: 260000,
        type_of_clothes: "Sandals",
        description:
          "Dép sandal đơn giản, thích hợp cho các hoạt động ngoài trời mùa hè",
        cat_id: 9,
        size: "41",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 22,
        name: "Áo thun nam cổ tròn - Màu xanh lá",
        price: 230000,
        type_of_clothes: "Tees",
        description:
          "Áo thun màu xanh lá tươi mát, tạo cảm giác thoải mái và dễ chịu",
        cat_id: 1,
        size: "M",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 23,
        name: "Quần jeans nam - Regular Fit",
        price: 490000,
        type_of_clothes: "Jeans",
        description:
          "Quần jeans với dáng regular fit, phù hợp cho mọi lứa tuổi",
        cat_id: 2,
        size: "L",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 24,
        name: "Áo khoác gió nam - Màu cam",
        price: 650000,
        type_of_clothes: "Jackets",
        description:
          "Áo khoác gió nhẹ nhàng, thích hợp cho các hoạt động thể thao ngoài trời",
        cat_id: 3,
        size: "M",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 25,
        name: "Giày thể thao nam - Màu xám",
        price: 800000,
        type_of_clothes: "Sneakers",
        description:
          "Giày thể thao màu xám, thiết kế thể thao mạnh mẽ và đế cao su bền bỉ",
        cat_id: 4,
        size: "42",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 26,
        name: "Mũ lưỡi trai - Màu trắng",
        price: 140000,
        type_of_clothes: "Hats",
        description:
          "Mũ lưỡi trai màu trắng, đơn giản và dễ kết hợp với trang phục hàng ngày",
        cat_id: 5,
        size: "None",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 27,
        name: "Áo sơ mi nam - Màu xanh dương nhạt",
        price: 390000,
        type_of_clothes: "Shirts",
        description:
          "Áo sơ mi với chất liệu mềm mại, màu xanh dương thanh lịch, dễ phối đồ",
        cat_id: 6,
        size: "M",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 28,
        name: "Quần shorts nam - Chất liệu jeans",
        price: 310000,
        type_of_clothes: "Shorts",
        description:
          "Quần shorts chất liệu jeans, trẻ trung và năng động cho mùa hè",
        cat_id: 7,
        size: "L",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 29,
        name: "Áo hoodie nam - Màu đen",
        price: 580000,
        type_of_clothes: "Sweats",
        description:
          "Áo hoodie màu đen với chất liệu nỉ ấm áp, phù hợp cho mùa lạnh",
        cat_id: 8,
        size: "M",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 30,
        name: "Tất thể thao nam - Chống hôi chân",
        price: 80000,
        type_of_clothes: "Socks",
        description:
          "Tất thể thao với khả năng thấm hút mồ hôi, giúp chân khô ráo suốt ngày",
        cat_id: 9,
        size: "None",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pd_id: 31,
        name: "Dép sandal nam - Màu nâu",
        price: 270000,
        type_of_clothes: "Sandals",
        description:
          "Dép sandal màu nâu, thiết kế đơn giản nhưng tinh tế, phù hợp mọi dịp",
        cat_id: 9,
        size: "41",
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