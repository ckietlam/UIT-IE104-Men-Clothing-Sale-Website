import db from "../models/index";
let getCartByUserId = (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = "";
      if (user_id) {
        cart = await db.Cart_item.findAll({
          where: { user_id: user_id },
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              model: db.Product,
              include: [
                {
                  model: db.Image,
                  attributes: ["image_id", "image"], //lấy ra một mảng nhưng khi hiển thị ở giỏ hàng thì chỉ hiện một hình thôi
                  as: "productImageData",
                },
              ],
              as: "productCartData",
              attributes: ["price", "name"],
            },
          ],
          next: true,
          raw: false,
        });
      }
      resolve(cart);
    } catch (e) {
      reject(e);
    }
  });
};
let addCart = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Cart_item.create({
        user_id: data.user_id,
        pd_id: data.pd_id,
        quantity: data.quantity,
      });
      resolve({
        errCode: 0,
        message: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let updateCart = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.cart_item_id ||
        !data.user_id ||
        !data.pd_id ||
        !data.quantity
      ) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let cart = await db.Cart_item.findOne({
        where: { pd_id: data.pd_id },
        raw: false,
      });
      if (cart) {
        cart.quantity = data.quantity;
        await cart.save();
        resolve({
          errCode: 0,
          message: `Update the cart succeeds!`,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `Cart's not found!`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteCart = (productId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await db.Cart_item.findOne({
        where: { pd_id: productId, user_id: userId },
        raw: false,
      });
      if (!cart) {
        resolve({
          errCode: 2,
          errMessage: `The cart isn't exist`,
        });
      }
      await db.Cart_item.destroy({
        where: { pd_id: productId, user_id: userId },
      });
      resolve({
        errCode: 0,
        message: `The cart is deleted`,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let clearCart = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await db.Cart_item.findOne({
        where: { user_id: userId },
        raw: false,
      });
      if (!cart) {
        resolve({
          errCode: 2,
          errMessage: `The cart isn't exist`,
        });
      }
      await db.Cart_item.destroy({
        where: { user_id: userId },
      });
      resolve({
        errCode: 0,
        message: `The cart is deleted`,
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  addCart,
  getCartByUserId,
  updateCart,
  deleteCart,
  clearCart,
};
