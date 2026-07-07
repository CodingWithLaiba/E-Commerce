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
exports.getAllProducts = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json({ success: true, products });
};
// get single  product details
exports.getProductDetails = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  res.status(200).json({ success: true, product });
};
//Update Product --Admin
exports.updateProduct = async (req, res, next) => {
  console.log(req.params.id);

  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });
  res.status(200).json({ success: true, product });
};
// Delete Product
exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  await Product.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "Product Delete Successfully" });
};
