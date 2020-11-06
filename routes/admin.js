const express = require("express");
const router = express.Router();

const { getAddProduct, postAddProduct } = require("../controllers/products");

const products = [];

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

module.exports = router;
