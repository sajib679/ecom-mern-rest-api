const Page = require("../../models/page");
exports.createPage = (req, res) => {
  const { bannersImage, productsImage } = req.files;
  if (bannersImage.length > 0) {
    req.body.bannersImage = bannersImage.map((item, index) => ({
      img: `/public/${item.filename}`,
      navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
    }));
  }

  if (productsImage.length > 0) {
    req.body.productsImage = productsImage.map((item, index) => ({
      img: `/public/${item.filename}`,
      navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
    }));
  }
  req.body.createdBy = req.user._id;

  Page.findOne({ category: req.body.category }).exec((error, page) => {
    if (error) {
      return res.status(200).json({ error });
    }
    if (page) {
      console.log(req.body.category);

      Page.findOneAndUpdate({ category: req.body.category }, req.body, {
        new: true,
      }).exec((error, updatedPage) => {
        if (updatedPage) {
          return res.status(200).json({ page: updatedPage });
        }
      });
    } else {
      const page = new Page(req.body);
      page.save((error, page) => {
        if (error) {
          return res.status(400).json({ error });
        } else if (page) {
          return res.status(200).json({ page: page });
        }
      });
    }
  });
};

exports.getPages = (req, res) => {
  Page.find({})
    .populate("category", "name")

    .exec((error, page) => {
      if (page) {
        res.status(200).json({
          page,
        });
      } else {
        return res.status(400).json({ error });
      }
    });
};

exports.getPage = (req, res) => {
  const { category, type } = req.params;
  if (type == "page") {
    Page.findOne({ category: category }).exec((error, page) => {
      if (page) {
        res.status(200).json({ page });
      } else {
        return res.status(400).json({ error });
      }
    });
  }
};
