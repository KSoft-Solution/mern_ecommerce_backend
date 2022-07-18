const router = require("express").Router();
const {
  createProduct,
  getAllProducts,
  getProductDetail,
  updateProduct,
  deleteProduct
} = require("../controllers/product.controller");

router
  .get("/allProducts", getAllProducts)
  .get('/product/:id',getProductDetail)
  .post("/createProduct", createProduct)
  .put('/update/:id',updateProduct)
  .delete('/delete/:id',deleteProduct)

module.exports = router;
