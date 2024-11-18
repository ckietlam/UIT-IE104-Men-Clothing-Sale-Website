import db from "../models/index";

let createOrder = (userId, paymentType, addressShipping) => {
  return new Promise(async (resolve, reject) => {
    const t = await sequelize.transaction();
    try {
      if (!userId) {
        return resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      }
      let cartItems = await db.Cart_item.findAll({
        //carts
        where: { user_id: userId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: db.Product,
            as: "productCartData",
            attributes: ["price"],
          },
        ],
        next: true,
        raw: false,
        transaction: t,
      });
      if (cartItems.length === 0) {
        return resolve({
          errCode: 2,
          errMessage: "Cart is empty. Cannot place order.",
        });
      }
      let totalPrice = cartItems.reduce((total, item) => {
        return total + item.productCartData.price * item.quantity;
      }, 0);

      let order = await db.Order.create(
        {
          cost: totalPrice,
          user_id: userId,
          status: "Confirming",
          payment_type: paymentType,
          addressShipping: addressShipping, //thêm address shipping vào bảng order
        },
        { transaction: t }
      );
      let orderDetails = cartItems.map((item) => ({
        pd_id: item.pd_id,
        order_id: order.id,
        amount: item.quantity,
        pd_cost: item.productCartData.price,
      }));

      await db.Order_detail.bulkCreate(orderDetails, { transaction: t });

      // Xóa các sản phẩm trong giỏ hàng sau khi tạo đơn hàng
      await db.Cart_item.destroy({
        where: { user_id: userId },
        transaction: t,
      });

      // Xác nhận (commit) transaction khi tất cả các bước đều thành công
      await t.commit();
    } catch (e) {
      await t.rollback();
      reject(e);
    }
  });
};
//Trước khi gọi service createOrder trên thì sẽ check phương thức thanh toán ngay sau khi người dùng nhấn vào button thanh toán
//Thanh toán bằng Momo... => Trang thanh toán (QR code) => Có kết quả từ API momo = 0 => tạo bảng order
//Không thanh toán bằng momo (thanh toán khi nhận hàng) => Tạo order

module.exports = {
  createOrder,
};
