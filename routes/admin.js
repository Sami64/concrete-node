const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/is-auth");

const {
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
  getAdminProducts,
} = require("../controllers/admin");

router.get("/add-product", isAuth, getAddProduct);

router.post("/add-product", isAuth, postAddProduct);

router.get("/edit-product/:productId", isAuth, getEditProduct);

router.post("/edit-product", isAuth, postEditProduct);

router.post("/delete-product", isAuth, postDeleteProduct);

router.get("/products", isAuth, getAdminProducts);

module.exports = router;
