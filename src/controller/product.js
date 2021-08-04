const Product = require("../models/product");
const Category = require("../models/category");
const slugify = require("slugify");

exports.addProduct = (req, res) => {
  const { name, price, description, quantity, category } = req.body;
  let productPictures = [];
  if (req.files) {
    productPictures = req.files.map((file) => {
      return {
        img: file.filename,
        link: `${process.env.DOMAIN}/upload/${file.filename}`,
      };
    });
  }
  const product = new Product({
    name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });

  product.save((error, product) => {
    if (error) {
      return res.status(400).json({ message: error });
    } else {
      return res.status(200).json({ product });
    }
  });
};

exports.getProductBySlug = (req, res) => {
  const { slug } = req.params;
  Category.findOne({ slug: slug })
    .select("_id")
    .exec((error, category) => {
      if (error) {
        return res.status(400).json({ error });
      } else if (category) {
        Product.find({ category: category._id }).exec((error, products) => {
          if (products) {
            return res.status(200).json({
              products,
              productsByPrice: {
                under5k: products.filter((product) => product.price <= 5000),
                under10k: products.filter(
                  (product) => product.price > 5000 && product.price <= 10000
                ),
                under15k: products.filter(
                  (product) => product.price > 10000 && product.price <= 15000
                ),

                under20k: products.filter(
                  (product) => product.price > 15000 && product.price <= 20000
                ),
                above20k: products.filter((product) => product.price > 20000),
              },
            });
          } else {
            return res.status(400).json({ error });
          }
        });
      }
    });
};

exports.getProductById = (req, res) => {
  const { productId } = req.params;
  Product.findOne({ _id: productId })
    .populate("category", "name")
    .exec((error, product) => {
      if (product) {
        return res.status(200).json({
          product,
        });
      } else {
        return res.status(400).json({ error });
      }
    });
};

exports.searchProduct = (req, res) => {
  const { searchTerm } = req.params;
  const regex2 = new RegExp(`${searchTerm}`, "i");
  Product.find({ name: regex2 })
    .select("_id name slug price productPictures")
    .exec((error, products) => {
      if (error) {
        return res.status(400).json({ message: `error searching ${error}` });
      }

      if (products.length > 0) {
        return res.status(200).json({ products });
      } else {
        return res.status(203).json({ message: "product not found" });
      }
    });
};

exports.updateProduct = (req, res) => {
  const { _id, name, price, description, quantity, category, imageId } =
    req.body;
  let productPictures = [];
  if (req.files) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  Product.findByIdAndUpdate(
    { _id },
    {
      name,
      price,
      description,
      quantity,
      category,
      $push: { productPictures: { $each: productPictures } },
    },
    { new: true, upsert: true, useFindAndModify: false }
  ).exec((error, updatedProduct) => {
    if (error) {
      return res.status(400).json({ error });
    }

    if (updatedProduct) {
      res.status(200).json({ updatedProduct });
    } else {
      return res.status(203).json({ message: "Update Failed" });
    }
  });
};

exports.deleteProductImage = (req, res) => {
  const { productId, imageId } = req.body;

  if (imageId) {
    Product.findByIdAndUpdate(
      { _id: productId },
      {
        $pull: { productPictures: { _id: imageId } },
      },
      { new: true }
    )
      .then((productPictures) => res.status(200).json("succes"))
      .catch((err) => res.status(400).json("failed"));
  }
};
