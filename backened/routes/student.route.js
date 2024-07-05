const express = require("express");
const route = express.Router();
const controllers = require("../controllers/student.controller.js");


route.get("/:id", controllers.getStudent);
// route.get("/", controllers.getStudent);
route.post("/add", controllers.addStudent);
route.post("/addFaculty", controllers.addFaculty);

module.exports = route;