const Category = require("../models/category");
var slugify = require("slugify");

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

exports.addCategory = (req, res) => {
  let categoryImage;

  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  if (req.file) {
    categoryImage = "/public/" + req.file.filename;
    categoryObj.categoryImage = categoryImage;
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
      const categoryList = createCategory(categories);
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
