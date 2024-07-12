const express = require("express");
const { handelStripeWebhook } = require("../controllers/wehook.controller");
const router = express.Router();

router.post("/", express.raw({type: "application/json"}), handelStripeWebhook)

module.exports = router;