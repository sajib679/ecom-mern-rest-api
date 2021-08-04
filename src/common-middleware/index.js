const jwt = require("jsonwebtoken");
const multer = require("multer");

const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: process.env.DATABASE_CREDENTIAL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    // const match = ["image/png", "image/jpeg"];
    // if (match.indexOf(file.mimetype) === -1) {
    //   const filename = `${Date.now()}-${file.originalname}`;
    //   return filename;
    // }
    return {
      bucketName: "upload",
      filename: `${Date.now()}-${file.originalname}`,
    };
  },
});

exports.upload = multer({ storage: storage });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(path.dirname(__dirname), "uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, shortid.generate() + "-" + file.originalname);
//   },
// });

// exports.upload = multer({ storage });

exports.requireSignIn = (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
    } catch (error) {
      return res.status(599).json({
        message: `Jwt Error: ${error}`,
      });
    }
  } else {
    return res.status(500).json({
      message: "Authorization Required",
    });
  }

  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(500).json({ message: "Acces Denied" });
  }
  next();
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(500).json({ message: "Login to continue Shopping" });
  }
  next();
};
