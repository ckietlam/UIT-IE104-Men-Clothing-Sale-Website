import productService from "../services/productService";
import express from "express";
const app = express();

let getAdmin = async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/404');
  }

  if (req.session.user.role === "Admin") {
      return res.render("pages/admin", {
          user: req.session.user
      });
  } else {
      return res.redirect('/404');
}
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

const getHomePage = async (req, res) => {
  try {
    
    const isAuthenticated = req.session.authenticated || false;
    const user = req.session.user || null;

    
    return res.render('pages/homepage', {
      user: user,
      message: null,
      isAuthenticated: isAuthenticated, // Can be used for conditional rendering
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
      return res.redirect('/404');
    } catch (error) {
      console.error("Error rendering 404 page:", error);
      return res.status(500).json({
        message: "Error from server",
        error: error.message,
      });
    }
}
const getProductViewAllAo = async (req,res) => {
  return res.render('pages/product-view-all-ao', { 
    message: null
})
};

const getProductViewAllGiayDep = async (req,res) => {
  return res.render('pages/product-view-all-giaydep', { 
    message: null
})
};

const getProductViewAllPhuKien = async  (req,res) => {
  return res.render('pages/product-view-all-phukien', { 
    message: null
})
};

const getProductViewAllQuan = async (req,res) => {
  return res.render('pages/product-view-all-quan', { 
    message: null
})
};
const getProductViewAll = async (req,res) => {
  return res.render('pages/product-view-all', { 
    message: null
})
};

module.exports = {
  getAdmin,
  getProductManagementPage,
  getEditProductPage,
  getUserManagementPage,
  getAddProductPage,
  getOrderManagementPage,
  getEditOrderPage,
  getHomePage,
  get404Page,
  getProductViewAllAo,
  getProductViewAllGiayDep,
  getProductViewAllPhuKien,
  getProductViewAllQuan,
  getProductViewAll
};