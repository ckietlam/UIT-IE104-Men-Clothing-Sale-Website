import productService from "../services/productService";
let getAdmin = async (req, res) => {
  return res.render("pages/admin", {
    message: null,
  });
};
let getProductManagement = async (req, res) => {
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

let getEditProductManagement = async (req, res) => {
  try {
    let productId = req.query.pd_id;
    console.log("Noah check id: ", productId);
    if (productId) {
      let data = await productService.getAllProducts(productId);
      return res.render("pages/edit-product", {
        productData: data,
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

let postProduct = async (req, res) => {
  try {
    let data = req.body;
    console.log(req)
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
module.exports = {
  getAdmin,
  getProductManagement,
  getEditProductManagement,
  postProduct,
};
