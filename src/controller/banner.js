const Banner = require("../models/banner");
exports.addBanner = (req, res) => {
  const { name } = req.body;
  let bannerImages = [];
  if (req.files.length > 0) {
    bannerImages = req.files.map((file) => {
      return {
        img: file.filename,
        link: `${process.env.DOMAIN}/upload/${file.filename}`,
      };
    });
  }

  const banner = new Banner({
    name,
    bannerImages,
    createdBy: req.user._id,
  });

  banner.save((error, banner) => {
    if (error) {
      return res.status(400).json({ error });
    } else if (banner) {
      return res.status(200).json({ banner });
    }
  });
};

exports.getBanner = (req, res) => {
  Banner.find({}).exec((error, banner) => {
    if (error) {
      return res.status(400).json({ error });
    } else if (banner) {
      return res.status(200).json({ banner });
    }
  });
};
