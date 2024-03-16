const { loginController, signupController } = require("../controllers/userController");


const express = require("express");
const { checkingToken } = require("../middleware/auth");
const router = express.Router();


router.post("/signup", signupController);
router.post("/login", loginController);

router.post("/checkingToken", checkingToken);

module.exports = router ;