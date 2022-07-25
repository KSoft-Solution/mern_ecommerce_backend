const router = require("express").Router();
const { registerUser } = require("../controllers/user.controller");
const upload = require('../config/multer.config')

router.post("/register",registerUser);

module.exports = router;
