import express from "express";
import homeController from "../controllers/homeController";
import productController from "../controllers/productController";
import orderController from "../controllers/orderController"
let router = express.Router();

let initWebRouters = (app) => {
  router.get("/admin", homeController.getAdmin);
  router.get(
    "/admin-products-management",
    homeController.getProductManagementPage
  );
  router.get("/edit-product", homeController.getEditProductPage);
  router.get("/admin-add-product", homeController.getAddProductPage);
  router.get("/admin-orders-management", homeController.getOrderManagementPage);
  router.get("/admin-users-management", homeController.getUserManagementPage);
  router.get("/edit-order-status", homeController.getEditOrderPage);
  //Product api
  router.get("/api/get-all-products", productController.handleGetAllProducts);
  router.post("/create-new-product", productController.handleCreateNewProduct);
  router.post("/post-product", productController.handleEditProduct);
  router.get("/delete-product", productController.handleDeleteProduct);
  router.get(
    "/api/get-all-categories",
    productController.handleGetAllCategories
  );
  router.get("/delete-image-by-id", productController.handleDeleteImageById);
  router.post("/post-order-status", orderController.handleEditOrder);
  //User api
  router.get("/update-user-role", productController.handleUpdateRole);
  return app.use("/", router);
};

module.exports = initWebRouters;
