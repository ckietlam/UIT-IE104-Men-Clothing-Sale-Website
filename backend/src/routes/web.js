import express from "express";

let router = express.Router();

let initWebRouters = (app) => {
  return app.use("/", router);
};

module.exports = initWebRouters;
