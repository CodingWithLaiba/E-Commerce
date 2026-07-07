const Product = require("../models/productModels.js");

// Create Product --Admin route
exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};
// get All products
exports.getAllProducts = (req, res) => {
  res.status(200).json({ message: "Route is working fine" });
};
