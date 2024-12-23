import productService from "../services/productService";
const numberFormatter = new Intl.NumberFormat("de-DE");
import db from "../models";

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

let handleDeleteImageById = async (req, res) => {
  try {
    if (!req.query.image_id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required parameters!",
      });
    } else {
      let image = await db.Image.findOne({
        where: { image_id: req.query.image_id },
      });
      await productService.deleteImage(req.query.image_id);
      let productId = image.pd_id;
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
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!",
    });
  }
};

let handleUpdateRole = async (req, res) => {
  try {
    let data = req.query;
    console.log("Noah check query update role: ", data);
    console.log("Noah check body update role: ", req.body);
    let response = await productService.updateUserData(data);
    if (response.errCode === 0) {
      let data = await productService.getAllUsers("ALL");
      return res.render("pages/user-management", {
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

let handleSearchProducts = async (req, res) => {
  try {
    let keyword = req.query.keyword || ''; // Lấy từ khóa từ query parameter
    let products = await productService.searchProductsByName(keyword); // Gọi hàm trong service để tìm kiếm
    return res.render("pages/search-products", {
      productsData: products,
      numberFormatter: numberFormatter,
    });
    
    /*
    return res.status(200).json({
      errCode: 0,
     errMessage: "OK",
     data: products,
    });
    */
  } catch (e) {
    console.log(e);
    return res.status(500).json({
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
  handleDeleteImageById,
  handleUpdateRole,
  handleSearchProducts,
};
