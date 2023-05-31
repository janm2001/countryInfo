const express = require('express');
const router = express.Router();
const {singup,login} = require("../controller/userController");

//routes
router.post("/singup", singup);
router.post("/login",login);

module.exports = router;
