import express from "express";
import userController from "../controllers/userController"

let router = express.Router();

let initWebRouters = (app) => {
  router.get("/admin", userController.getAdmin);

  return app.use("/", router);
};

module.exports = initWebRouters;
