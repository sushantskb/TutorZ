const express = require("express");
const router = express.Router();
const {authenticate} = require("../auth/authenticate");
const { getUsers } = require("../controllers/userController");

router.get("/", authenticate, getUsers)

module.exports = router