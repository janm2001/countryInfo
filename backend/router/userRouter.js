const express = require("express");
const router = express.Router();
const { signupUser, loginUser } = require("../controller/userController");

//routes
router.post("/singup", signupUser);
router.post("/login", loginUser);

module.exports = router;
