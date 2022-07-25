const router = require("express").Router();
const upload = require('../config/multer.config')

//product routes
const productRoute = require("./product.routes");
const userRoute = require('./auth.routes')

router.use("/product", productRoute);
router.use('/user',userRoute)

module.exports = router;
