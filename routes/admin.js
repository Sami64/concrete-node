const express = require("express");
const router = express.Router();

const {
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
  getAdminProducts,
} = require("../controllers/admin");

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

router.get("/edit-product/:productId", getEditProduct);

router.post("/edit-product", postEditProduct);

router.post('/delete-product', postDeleteProduct);

router.get("/products", getAdminProducts);

module.exports = router;
