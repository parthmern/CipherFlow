const { loginController, signupController } = require("../controllers/userController");


const express = require("express");
const isUser = require("../middleware/auth");
const router = express.Router();


router.post("/signup", signupController);
router.post("/login", loginController);

router.post("/auth", isUser);

module.exports = router ;