import express from "express";
import homeController from "../controllers/homeController";
import productController from "../controllers/productController"
import userController from "../controllers/userController";
let router = express.Router();

let initWebRouters = (app) => {
  router.get("/login", userController.getLogin);
  router.get("/admin", homeController.getAdmin);
  router.get("/admin-products-management", homeController.getProductManagement);
  router.get("/edit-product", homeController.getEditProductManagement);
  router.post("/post-product", homeController.postProduct)
  //Product api
  router.get("/api/get-all-products", productController.handleGetAllProducts);
  router.post(
    "/api/create-new-product",
    productController.handleCreateNewProduct
  );
  router.put("/api/edit-product", productController.handleEditProduct);
  router.delete("/api/delete-product", productController.handleDeleteProduct);
  router.get(
    "/api/get-all-categories",
    productController.handleGetAllCategories
  );
  return app.use("/", router);
};

module.exports = initWebRouters;
