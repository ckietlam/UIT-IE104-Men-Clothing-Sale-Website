import express from "express";

let configViewEngine = (app) => {
    app.use(express.static("../frontend/public"));
    app.set("view engine", "ejs");
    app.set("views", "../frontend/src");
}

module.exports = configViewEngine;