import productService from "../services/productService";

let handleGetAllProducts = async (req, res) => {
  try {
    let pd_id = req.query.pd_id;
    if (!pd_id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required parameter",
        products: [],
      });
    }
    let products = await productService.getAllProducts(pd_id);
    return res.status(200).json(products);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!",
    });
  }
};
let handleCreateNewProduct = async (req, res) => {
  try {
    let response = await productService.createNewProduct(req.body);
    if (response.errCode === 0) {
      let data = await productService.getAllProducts("ALL");
      return res.render("pages/product-management", {
        dataTable: data,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!",
    });
  }
};
let handleEditProduct = async (req, res) => {
  try {
    let data = req.body;
    let response = await productService.updateProductData(data);
    if (response.errCode === 0) {
      let data = await productService.getAllProducts("ALL");
      return res.render("pages/product-management", {
        dataTable: data,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleDeleteProduct = async (req, res) => {
  try {
    console.log("Noah check: ");
    if (!req.query.pd_id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required parameters!",
      });
    }
    let response = await productService.deleteProduct(req.query.pd_id);
    let data = await productService.getAllProducts("ALL");
    return res.render("pages/product-management", {
      dataTable: data,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!",
    });
  }
};
let handleGetAllCategories = async (req, res) => {
  try {
    let categories = await productService.getAllCategories();
    return res.status(200).json(categories);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!",
    });
  }
};
let handleGetAllImagesById = async (req, res) => {
  try {
    let images = await productService.getAllImagesById(req.query.pd_id);
    return res.status(200).json(images);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!",
    });
  }
};

module.exports = {
  handleGetAllProducts,
  handleCreateNewProduct,
  handleEditProduct,
  handleDeleteProduct,
  handleGetAllCategories,
  handleGetAllImagesById,
};
