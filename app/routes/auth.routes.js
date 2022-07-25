const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/user.controller");
const upload = require("../config/multer.config");

router.post("/register", registerUser).post("/login", loginUser);

module.exports = router;
