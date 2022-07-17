const router = require("express").Router();

//product routes
const productRoute = require("./product.routes");

router.use("/product", productRoute);

module.exports = router;
