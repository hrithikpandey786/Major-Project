const express = require("express");
const router = express.Router();
const controllers = require("../controllers/payment.controller");

router.post("/orders", controllers.order);
router.post("/verify", controllers.verifyPayment);

module.exports = router;
