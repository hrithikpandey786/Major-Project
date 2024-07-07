const express = require("express");
const router = express.Router();
const controllers = require("../controllers/degree.controller");
const verifyToken = require("../middleware/verifyToken");


router.get("/", controllers.getDegreeRequests);
router.get("/:id", controllers.getDegreeRequest);
router.get("/data/:enrolmentNo", controllers.getDegreeDetail);
router.get("/application/status", verifyToken, controllers.getStatus);
router.post("/add", verifyToken, controllers.addDegreeRequest);
router.put("/update", controllers.updateDegreeStatus);

module.exports = router;