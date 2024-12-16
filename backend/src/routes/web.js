import express from "express";
import homeController from "../controllers/homeController";
import productController from "../controllers/productController"
import userController from "../controllers/userController";
import addSessionData from "../middlewares/addSessionData";
import orderController from "../controllers/orderController"
import cartController from "../controllers/cartController";
import placeHolderController from "../controllers/placeHolderController";
import zalopay from "../controllers/zaloPay";
let router = express.Router();

let initWebRouters = (app) => {
  app.use(addSessionData);

  router.get("/", homeController.getHomePage);
  router.get("/profile", userController.getProfilePage);
  router.get("/login", userController.getLogin);
  router.post("/login", userController.handleLogin);
  router.get("/register", userController.getRegister);
  router.post("/register", userController.handleRegister);
  router.get("/logout", userController.getLogout);
  router.get("/forgot-password", userController.getForgotPassword);
  router.post("/forgot-password", userController.handleForgotPassword);
  router.get("/change-password", userController.getChangePassword);
  router.post("/change-password", userController.handleChangePassword);

  router.get("/404", homeController.get404Page);
  router.post("/update-profile", userController.handleUpdateProfile);
  router.get("/product-view-all-ao", homeController.getProductViewAllAo);
  router.get("/product-view-all-giaydep", homeController.getProductViewAllGiayDep);
  router.get('/product-view-all-phukien',homeController.getProductViewAllPhuKien);
  router.get('/product-view-all-quan',homeController.getProductViewAllQuan);
  router.get('/product-view-all',homeController.getProductViewAll);

  router.get("/checkout", homeController.getCheckOutPage)
  router.get("/remove-cart-item", homeController.deleteCartItem)
  router.post("/payment-info", homeController.getPaymentInfoPage);
  router.get("/payment-delivery", homeController.getPaymentDeliveryPage);
  
  router.post("/api/add-cart", cartController.handleAddCart);
  router.get("/api/get-cart-by-user-id", cartController.handleGetCartByUserId);
  router.put("/api/update-cart", cartController.handleUpdateCart);
  router.delete("/api/delete-cart", cartController.handleDeleteCart);
  router.delete("/api/clear-cart", cartController.handleClearCart);
  router.get("/api/check-empty-cart", cartController.handleCheckEmptyCart);

  router.get('/product-view',homeController.getProductViewAProduct);
  router.get('/api/get-user-id',userController.fetchUserId);

  router.get("/admin", homeController.getAdmin);
  router.get("/admin-products-management", homeController.getProductManagementPage);
  router.get("/edit-product", homeController.getEditProductPage);
  router.get("/admin-add-product", homeController.getAddProductPage);
  router.get("/admin-orders-management", homeController.getOrderManagementPage);
  router.get("/admin-users-management", homeController.getUserManagementPage);
  router.get("/edit-order-status", homeController.getEditOrderPage);
  router.get("/update-user-role", homeController.updateUserRole)
  router.post("/post-order-status", homeController.updateOrderStatus)
  //Product api
  router.get("/api/get-all-products", productController.handleGetAllProducts);
  router.post(
    "/create-new-product",
    productController.handleCreateNewProduct
  );
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
  router.get("/product-view-all", homeController.getProductViewAll)
  router.get("/product-view-all-giaydep", homeController.getProductViewAllGiayDep)
  router.get("/product-view-all-ao", homeController.getProductViewAllAo)
  router.get("/product-view-all-quan", homeController.getProductViewAllQuan)
  router.get("/product-view-all-phukien", homeController.getProductViewAllPhuKien)

  router.get("/terms-and-conditions", placeHolderController.getTermsAndConditions);
  router.get("/customer-supports", placeHolderController.getCustomerSupport);
  router.get("/terms", placeHolderController.getTerms);
  router.get("/copyright", placeHolderController.getCopyRight);
  router.get("/ordering-rules", placeHolderController.getOrderingRules);
  router.get("/delivering-rules", placeHolderController.getDeliveringRules);
  router.get("/frequent-questions", placeHolderController.getFrequentQuestions);


  router.post("/payment", zalopay.createrZalopay);
  router.get("/search-products", productController.handleSearchProducts);

  router.get("/success", homeController.getSuccessPage);
  return app.use("/", router);
};

module.exports = initWebRouters;