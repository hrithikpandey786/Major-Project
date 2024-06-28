const express = require("express");
const route = express.Router();
const controllers = require("../controllers/auth.controller.js");


route.post("/register", controllers.register);
route.post("/login", controllers.login);
route.post("/adminLogin", controllers.adminLogin);
route.post("/logout", controllers.logout);

module.exports = route;