const Category = require("../../models/category");
const Product = require("../../models/product");
const Order = require("../../models/order");
const { createNestedCategory } = require("../../helper");

exports.initialData = async (req, res) => {
  const categoryList = await Category.find({}).exec();
  const products = await Product.find({})
    .select("_id name price quantity productPictures description category")
    .populate("category", "name")
    .exec();
  const orders = await Order.find({})
    .populate("items.productId", "name")
    .exec();

  if (categoryList && products) {
    res.status(200).json({
      categories: createNestedCategory(categoryList),
      categoryList,
      products,
      orders,
    });
  } else {
    res.status(400).json("No Data found;Something Error happened");
  }
};
