import productService from "../services/productService";
import cartService from "../services/cartService";
import orderService from "../services/orderService";
import zaloPay from "../controllers/zaloPay";
import userService from "../services/userService";
import nodemailer from "nodemailer";
import express from "express";
const numberFormatter = new Intl.NumberFormat("de-DE");
const app = express();

let getAdmin = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/404");
  }

  if (req.session.user.role === "Admin") {
    return res.render("pages/admin", {
      user: req.session.user,
    });
  } else {
    return res.redirect("/404");
  }
};

let getProductManagementPage = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/404");
    }
    if (req.session.user.role !== "Admin") return res.redirect("/404");

    let data = await productService.getAllProducts("ALL");
    return res.render("pages/product-management", {
      dataTable: data,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getOrderManagementPage = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/404");
    }
    if (req.session.user.role !== "Admin") return res.redirect("/404");

    let data = await orderService.getAllOrder();
    return res.render("pages/order-management", {
      dataTable: data.data,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getEditProductPage = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/404");
    }
    if (req.session.user.role !== "Admin") return res.redirect("/404");

    let productId = req.query.pd_id;
    if (productId) {
      let data = await productService.getAllProducts(productId);
      let categoriesData = await productService.getAllCategories();
      let imagesData = await productService.getAllImagesById(productId);
      let images = "";
      if (imagesData.data) {
        images = imagesData.data.map((item, index) => ({
          image_id: item.image_id,
          image: Buffer.from(item.image, "base64").toString("binary"),
        }));
      }
      return res.render("pages/edit-product", {
        productData: data,
        categoriesData: categoriesData.data,
        imagesData: images,
      });
    } else {
      return res.send("Product not found!");
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getUserManagementPage = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/404");
    }
    if (req.session.user.role !== "Admin") return res.redirect("/404");

    let data = await productService.getAllUsers("ALL");
    return res.render("pages/user-management", {
      dataTable: data,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let updateUserRole = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/404");
    }
    if (req.session.user.role !== "Admin") return res.redirect("/404");
    let userId = req.query.user_id;
    let newRole = req.query.role;
    await userService.updateUserRole(userId, newRole);
    let data = await productService.getAllUsers("ALL");
    return res.render("pages/user-management", {
      dataTable: data,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getEditOrderPage = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/404");
    }
    if (req.session.user.role !== "Admin") return res.redirect("/404");

    let orderId = req.query.order_id;
    if (orderId) {
      let data = await orderService.getOderByOrderId(orderId);
      return res.render("pages/edit-order-status", {
        orderData: data.data,
      });
    } else {
      return res.send("Order not found!");
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAddProductPage = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/404");
    }
    if (req.session.user.role !== "Admin") return res.redirect("/404");

    let categoriesData = await productService.getAllCategories();
    return res.render("pages/add-product", {
      categoriesData: categoriesData.data,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

const getHomePage = async (req, res) => {
  try {
    const isAuthenticated = req.session.authenticated || false;
    const user = req.session.user || null;
    const user_id = req.session.user_id || null;
    return res.render("pages/homepage", {
      user: user,
      message: null,
      isAuthenticated: isAuthenticated,
      // Can be used for conditional rendering
    });
  } catch (error) {
    console.error("Error rendering homepage:", error);
    return res.status(500).json({
      message: "Error from server",
      error: error.message,
    });
  }
};

const get404Page = async (req, res) => {
  try {
    return res.redirect("/404");
  } catch (error) {
    console.error("Error rendering 404 page:", error);
    return res.status(500).json({
      message: "Error from server",
      error: error.message,
    });
  }
};

let getProductViewAll = async (req, res) => {
  try {
    let shirtsData = await productService.getAllShirts(5);
    let pantsData = await productService.getAllPants();
    let shoesData = await productService.getAllShoes();
    let accessoriesData = await productService.getAllAccessories();
    return res.render("pages/product-view-all", {
      shirtsData: shirtsData,
      pantsData: pantsData,
      shoesData: shoesData,
      accessoriesData: accessoriesData,
      numberFormatter: numberFormatter,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getProductViewAllAo = async (req, res) => {
  try {
    let aoThunData = await productService.getAllProductsByType("Tees");
    let aoNiData = await productService.getAllProductsByType("Sweats");
    let aoSoMiData = await productService.getAllProductsByType("Shirts");
    return res.render("pages/product-view-all-ao", {
      aoThunData: aoThunData,
      aoNiData: aoNiData,
      aoSoMiData: aoSoMiData,
      numberFormatter: numberFormatter,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getProductViewAllGiayDep = async (req, res) => {
  try {
    let giayData = await productService.getAllProductsByType("Sneakers");
    let depData = await productService.getAllProductsByType("Sandals");
    return res.render("pages/product-view-all-giaydep", {
      giayData: giayData,
      depData: depData,
      numberFormatter: numberFormatter,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getProductViewAllQuan = async (req, res) => {
  try {
    let jeansData = await productService.getAllProductsByType("Jeans");
    let shortsData = await productService.getAllProductsByType("Shorts");
    return res.render("pages/product-view-all-quan", {
      jeansData: jeansData,
      shortsData: shortsData,
      numberFormatter: numberFormatter,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getProductViewAllPhuKien = async (req, res) => {
  try {
    let beltsData = await productService.getAllProductsByType("Belts");
    let socksData = await productService.getAllProductsByType("Socks");
    let walletsData = await productService.getAllProductsByType("Wallets");
    return res.render("pages/product-view-all-phukien", {
      beltsData: beltsData,
      socksData: socksData,
      walletsData: walletsData,
      numberFormatter: numberFormatter,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getProductViewAProduct = async (req, res) => {
  try {
    let id = req.query.pd_id;
    let productData = await productService.getAllProducts(id);
    return res.render("pages/product-view", {
      productData: productData,
      session: req.session,
      numberFormatter: numberFormatter,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getCheckOutPage = async (req, res) => {
  try {
    let user_id = req.session.user.user_id || NULL;
    let cartData = await cartService.getCartByUserId(user_id);
    console.log("Noah check session: ", req.session);

    return res.render("pages/payment-cart", {
      cartData: cartData,
      user_id: user_id,
      numberFormatter: numberFormatter,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let deleteCartItem = async (req, res) => {
  try {
    await cartService.deleteCartItemById(req.query.cart_item_id);
    let user_id = req.session.user.user_id || NULL;
    let cartData = await cartService.getCartByUserId(user_id);
    return res.render("pages/payment-cart", {
      cartData: cartData,
      user_id: user_id,
      numberFormatter: numberFormatter,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getPaymentInfoPage = async (req, res) => {
  try {
    let user_id = req.session.user.user_id || NULL;
    let cartData = await cartService.getCartByUserId(user_id);
    let total = req.body.total;
    console.log("\n\n Noah check sum: ", total);
    return res.render("pages/payment-info", {
      cartData: cartData,
      user_id: user_id,
      email: req.session.user.email,
      phone: req.session.user.phone,
      total: total,
      numberFormatter: numberFormatter,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getPaymentDeliveryPage = async (req, res) => {
  try {
    let user_id = req.session.user.user_id || NULL;
    const {
      email,
      lastName,
      firstName,
      address,
      city,
      phone,
      district,
      total,
      selectedPaymentType,
    } = req.query;

    let deliveryAddress = address + ", " + district + ", " + city;
    let addressShipping =
      deliveryAddress +
      ". " +
      "Họ tên của bạn là: " +
      lastName +
      firstName +
      ". Số điện thoại là: " +
      phone;
    //tạo order rồi order detail ở đây: ---
    console.log(
      "Noah check input order create: ",
      addressShipping,
      " ",
      selectedPaymentType
    );
    console.log("req query ", req.query);
    let cartData = await cartService.getCartByUserId(user_id);
    let order = await orderService.createOrder(
      user_id,
      selectedPaymentType,
      addressShipping
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      logger: true,
      debug: true,
      secureConnection: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    if (selectedPaymentType === "CASH") {
      const mailOptions = {
        from: "process.env.EMAIL_USER",
        to: email,
        subject: "Xác nhận đơn hàng",
        text: `Cảm ơn bạn đã đặt hàng! Đơn hàng của bạn đang được xử lý. \nĐịa chỉ giao hàng: ${addressShipping}. \nTổng số tiền: ${total}. \nPhương thức thanh toán: ${selectedPaymentType}.`,
      };
      console.log("Noah check selectedPaymentType: ", selectedPaymentType);
      await transporter.sendMail(mailOptions);
      await cartService.clearCart(user_id);
      return res.render("partials/success", {
        email: email,
        message: `Your order has been placed successfully, check at this email address: ${email}`,
      });
    } else if (selectedPaymentType === "CARD") {
      let amount = parseInt(req.query.total.replace(/[.,]/g, ""));
      let data = await zaloPay.createrZalopay(req, res, amount);
      let url = data.order_url;
      if (url) {
        console.log("Redirecting to ZaloPay order URL:", url);
        return res.redirect(url);
      } else {
        console.error("ZaloPay order_url is undefined");
        return res.status(500).send("Failed to process payment with ZaloPay");
      }
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getSuccessPage = async (req, res) => {
  try {
    return res.render("partials/success");
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let updateOrderStatus = async (req, res) => {
  try {
    await orderService.updateOrderStatus(req.body);
    if (!req.session.user) {
      return res.redirect("/404");
    }
    if (req.session.user.role !== "Admin") return res.redirect("/404");

    let orderId = req.body.order_id;
    if (orderId) {
      let data = await orderService.getOderByOrderId(orderId);
      return res.render("pages/edit-order-status", {
        orderData: data.data,
      });
    } else {
      return res.send("Order not found!");
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  getAdmin,
  getProductManagementPage,
  getEditProductPage,
  getAddProductPage,
  getEditOrderPage,
  getUserManagementPage,
  getOrderManagementPage,
  getHomePage,
  get404Page,
  getProductViewAllPhuKien,
  getProductViewAll,
  getProductViewAllGiayDep,
  getProductViewAllAo,
  getProductViewAllQuan,
  getProductViewAllPhuKien,
  getProductViewAProduct,
  getCheckOutPage,
  deleteCartItem,
  getPaymentInfoPage,
  getPaymentDeliveryPage,
  getSuccessPage,
  updateUserRole,
  updateOrderStatus,
};
