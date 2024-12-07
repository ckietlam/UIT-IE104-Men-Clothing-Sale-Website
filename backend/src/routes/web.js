import express from "express";
import userController from "../controllers/userController"
import homeController from "../controllers/homeController"
let router = express.Router();

let initWebRouters = (app) => {
  router.get("/admin", userController.getAdmin);
  router.get("/product-view-all", homeController.getProductViewAll)
  router.get("/product-view-all-giaydep", homeController.getProductViewAllGiayDep)
  router.get("/product-view-all-ao", homeController.getProductViewAllAo)
  router.get("/product-view-all-quan", homeController.getProductViewAllQuan)
  router.get("/product-view-all-phukien", homeController.getProductViewAllPhuKien)
  
  return app.use("/", router);
};

module.exports = initWebRouters;
