const express = require("express");

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

router.get("/cart", getCart);

router.post("/cart", postCart);

router.post("/cart-delete-item", postCartDelete);

router.get("/orders", getOrders);

router.post("/create-order", postOrder);

module.exports = router;
