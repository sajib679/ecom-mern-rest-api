const Page = require("../../models/page");

exports.createPage = (req, res) => {
  const { bannersImage, productsImage } = req.files;
  if (bannersImage.length > 0) {
    req.body.bannersImage = bannersImage.map((item, index) => ({
      img: item.filename,
      link: `${process.env.DOMAIN}/upload/${item.filename}`,
      navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
    }));
  }

  if (productsImage.length > 0) {
    req.body.productsImage = productsImage.map((item, index) => ({
      img: item.filename,
      link: `${process.env.DOMAIN}/upload/${item.filename}`,
      navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
    }));
  }
  req.body.createdBy = req.user._id;

  Page.findOne({ category: req.body.category }).exec((error, page) => {
    if (error) {
      return res.status(200).json({ error });
    }
    if (page) {
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

exports.updatePage = (req, res) => {
  console.log(req.files);
  const { bannersImage, productsImage } = req.files;

  if (bannersImage?.length > 0) {
    req.body.bannersImage = bannersImage.map((item, index) => ({
      img: item.filename,
      link: `${process.env.DOMAIN}/upload/${item.filename}`,
      navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
    }));
  } else {
    req.body.bannersImage = [];
  }

  if (productsImage?.length > 0) {
    req.body.productsImage = productsImage.map((item, index) => ({
      img: item.filename,
      link: `${process.env.DOMAIN}/upload/${item.filename}`,
      navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
    }));
  } else {
    req.body.productsImage = [];
  }
  req.body.createdBy = req.user._id;

  const { pageTitle, description, category, createdBy } = req.body;

  Page.findOne({ category: category }).exec((error, page) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (page) {
      Page.findOneAndUpdate(
        { category: category },
        {
          pageTitle,
          description,
          category,
          createdBy,
          $push: {
            bannersImage: { $each: req.body.bannersImage },
            productsImage: { $each: req.body.productsImage },
          },
        },
        {
          new: true,
          upsert: true,
        }
      ).exec((error, updatedPage) => {
        if (updatedPage) {
          return res.status(200).json({ page: updatedPage });
        }

        if (error) {
          return res.status(400).json({ error });
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

exports.deletePageImage = (req, res) => {
  const { pageId, imageId } = req.body;
  console.log(pageId, imageId);

  Page.findByIdAndUpdate(
    { _id: pageId },
    {
      $pull: {
        bannersImage: { _id: imageId },
        productsImage: { _id: imageId },
      },
    },

    {
      new: true,
    }
  ).exec((error, updatedPage) => {
    if (updatedPage) {
      console.log(updatedPage);
      return res.status(200).json({ page: updatedPage });
    } else if (error) {
      return res.status(400).json({ error });
    }
  });
};

exports.deletePage = (req, res) => {};
