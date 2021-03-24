const express = require("express");
const isAuth = require("../middleware/is-auth");

const {
  getProducts,
  getProductDetails,
  getCart,
  postCart,
  postCartDelete,
  getIndex,
  getOrders,
  postOrder,
} = require("../controllers/shop");

const router = express.Router();

router.get("/", getIndex);

router.get("/products", getProducts);

router.get("/products/:productId", getProductDetails);

router.get("/cart", isAuth, getCart);

router.post("/cart", isAuth, postCart);

router.post("/cart-delete-item", isAuth, postCartDelete);

router.get("/orders", isAuth, getOrders);

router.post("/create-order", isAuth, postOrder);

module.exports = router;
