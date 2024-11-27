import express from "express";
import homeController from "../controllers/homeController";
import productController from "../controllers/productController"
import userController from "../controllers/userController";
let router = express.Router();

let initWebRouters = (app) => {

  router.get("/login", userController.getLogin);
  router.post("/login", userController.handleLogin);
  router.get("/register", userController.getRegister);
  router.post("/register", userController.handleRegister);
  router.get("/admin", homeController.getAdmin);
  router.get("/admin-products-management", homeController.getProductManagementPage);
  router.get("/edit-product", homeController.getEditProductPage);
  router.get("/admin-add-product", homeController.getAddProductPage)
  //Product api
  router.get("/api/get-all-products", productController.handleGetAllProducts);
  router.post(
    "/create-new-product",
    productController.handleCreateNewProduct
  );
  router.post("/post-product", productController.handleEditProduct);
  router.get("/delete-product", productController.handleDeleteProduct);
  router.get(
    "/api/get-all-categories",
    productController.handleGetAllCategories
  );
  router.get("/delete-image-by-id", productController.handleDeleteImageById);
  return app.use("/", router);
};

module.exports = initWebRouters;
