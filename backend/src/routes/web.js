import express from "express";
import userController from "../controllers/userController"
import homeController from "../controllers/homeController"
let router = express.Router();

let initWebRouters = (app) => {
  router.get("/admin", userController.getAdmin);
  router.get("/product-view-all", homeController.getProductViewAll)
  
  return app.use("/", router);
};

module.exports = initWebRouters;
