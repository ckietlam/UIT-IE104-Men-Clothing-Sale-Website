import { where } from "sequelize";
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

let getOrder = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        return resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      }
      let data = await db.Order.findAll({
        where: { user_id: userId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: db.Order_detail, //Lấy danh sách order detail
            include: [
              {
                model: db.Product, //Dựa vào product Id để tìm ra tên sản phẩm giá...
                as: "productOrderDetailData",
                include: [
                  {
                    model: db.Image, //Dựa vào product_id để lấy ra ảnh cho sản phẩm
                    attributes: ["image_id", "image"], //lấy ra một mảng nhưng khi hiển thị ở giỏ hàng thì chỉ hiện một hình thôi
                    as: "productImageData",
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                  },
                ],
                attributes: { exclude: ["createdAt", "updatedAt"] },
              },
            ],
            as: "orderDetailData",
            attributes: { exclude: ["createdAt", "updatedAt"] }, //Khi lấy bỏ trường createdAt và updatedAt
            nest: true,
            raw: false,
          },
        ],
      });
      resolve({
        errCode: 0,
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
//Hiển thị chi tiết tất cả các Order của người dùng theo user_id của họ, kèm theo danh sách các order_detail cho order đó

let getOrderByOrderStatus = (userId, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId || !status) {
        //không truyền vào userId hoặc status thì return
        return resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      }
      let data;
      if (status === "ALL") {
        //nếu truyền vào là ALL thì trả về danh sách đặt hàng
        data = await db.Order.findAll({
          where: { user_id: userId },
          attributes: { exclude: ["createdAt", "updatedAt"] },
        });
      } else {
        data = await db.Order.findAll({
          //Nếu truyền vào trạng thái thì trả về theo trạng thái
          where: { user_id: userId, status: status },
          attributes: { exclude: ["createdAt", "updatedAt"] },
        });
      }
      resolve({
        errCode: 0,
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateOrderStatus = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.user_id || !data.order_id) {
        return resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let order = await db.Order.findOne({
          where: { order_id: data.order_id, user_id: data.user_id },
          raw: false,
        });
        order.status = data.status;
        await order.save();
        resolve({
          errCode: 0,
          errMessage: "Update order status succeed!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllOrder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Order.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        raw: false,
      });
      resolve({
        errCode: 0,
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getOderByOrderId = (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Order.findOne({
        where: { order_id: orderId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: db.User,
            as: "userData",
            attributes: ["name", "phone", "email", "user_id"],
            nest: true,
            raw: false,
          },
        ],
        nest: true,
        raw: true,
      });
      resolve({
        errCode: 0,
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrder,
  getAllOrder,
  getOrder,
  getOrderByOrderStatus,
  updateOrderStatus,
  getOderByOrderId,
};
