const express = require("express");
const router = express.Router();
const controllers = require("../controllers/migration.controller");
const verifyToken = require("../middleware/verifyToken");

router.get("/", controllers.getMigrationRequests);
router.get("/:id", controllers.getMigrationRequest);
router.get("/data/:enrolmentNo", controllers.getMigrationDetails);
router.get("/application/status", verifyToken, controllers.getStatus);
router.post("/add", verifyToken, controllers.addMigrationRequest);
router.put("/update", controllers.updateMigrationStatus);

module.exports = router;