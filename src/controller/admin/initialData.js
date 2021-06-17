const Category = require("../../models/category");
const Product = require("../../models/product");
const Order = require("../../models/order");

const createCategory = (categories, parentId = null) => {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (const cat of category) {
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      parentId: cat.parentId,
      type: cat.type,
      children: createCategory(categories, cat._id),
    });
  }
  return categoryList;
};

exports.initialData = async (req, res) => {
  const categoryList = await Category.find({}).exec();
  const products = await Product.find({})
    .select("_id name price quantity productPictures description category")
    .populate("category", "name")
    .exec();
  const orders = await Order.find({})
    .populate("items.productId", "name")
    .exec();

  res.status(200).json({
    categories: createCategory(categoryList),
    categoryList,
    products,
    orders,
  });
};
