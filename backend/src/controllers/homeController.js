import productService from "../services/productService";
import orderService from "../services/orderService";
let getAdmin = async (req, res) => {
  return res.render("pages/admin", {
    message: null,
  });
};
let getProductManagementPage = async (req, res) => {
  try {
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

let getEditProductPage = async (req, res) => {
  try {
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

let getAddProductPage = async (req, res) => {
  try {
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

let getOrderManagementPage = async (req, res) => {
  try {
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

let getUserManagementPage = async (req, res) => {
  try {
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

module.exports = {
  getAdmin,
  getProductManagementPage,
  getEditProductPage,
  getAddProductPage,
  getOrderManagementPage,
  getEditOrderPage,
  getUserManagementPage
};
