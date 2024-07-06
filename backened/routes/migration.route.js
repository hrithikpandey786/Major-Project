const express = require("express");
const router = express.Router();
const controllers = require("../controllers/migration.controller");
const verifyToken = require("../middleware/verifyToken");

router.get("/", controllers.getMigrationRequests);
router.get("/:id", controllers.getMigrationRequest);
router.get("/application/status", verifyToken, controllers.getStatus);
router.post("/add", verifyToken, controllers.addMigrationRequest);

module.exports = router;