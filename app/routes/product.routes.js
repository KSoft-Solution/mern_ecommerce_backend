const router = require("express").Router();
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
} = require("../controllers/product.controller");

router
  .get("/allProducts", getAllProducts)
  .post("/createProduct", createProduct)
  .put('/update/:id',updateProduct)
  .delete('/delete/:id',deleteProduct)

module.exports = router;
