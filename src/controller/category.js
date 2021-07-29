const Category = require("../models/category");
var slugify = require("slugify");
const { createNestedCategory } = require("../helper");

exports.addCategory = (req, res) => {
  let categoryImage;

  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  if (req.file) {
    const name = req.file.filename;
    const link = `${process.env.DOMAIN}/upload/${req.file.filename}`;
    categoryObj.categoryImage = { name, link };
  }

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const category = new Category(categoryObj);
  category.save((error, category) => {
    if (error) {
      return res.status(400).json({ error });
    } else {
      return res.status(200).json({ category });
    }
  });
};

exports.getAllCategory = (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) {
      return res.status(400).json({ error });
    } else {
      const categoryList = createNestedCategory(categories);
      return res.status(200).json({ categoryList });
    }
  });
};

exports.updateCategory = async (req, res) => {
  const { _id, name, parentId, type } = req.body;
  console.log(req.body);
  const updatedCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
        slug: slugify(name[i]),
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }
      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      );
      updatedCategories.push(updatedCategory);
    }
    return res.status(200).json({ updatedCategories });
  } else {
    const { _id, name, parentId, type } = req.body;

    const category = {
      name,
      type,
      slug: slugify(name),
    };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    updatedCategories.push(updatedCategory);
    return res.status(200).json({ updatedCategories });
  }
};

exports.deleteCategory = async (req, res) => {
  const ids = req.body;
  for (let i = 0; i < ids.length; i++) {
    console.log(ids[i]);
    await Category.findOneAndDelete(ids[i]).exec();
  }
  return res.status(200).json({ data: ids });
};
