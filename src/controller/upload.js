const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

let gfs;

const conn = mongoose.connection;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("upload");
});

exports.getFiles = async (req, res) => {
  console.log(req.params);
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    console.log(file);
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.send("not found");
  }
};

exports.deleteFiles = async (req, res) => {
  try {
    await gfs.files.deleteOne({ filename: req.params.filename });
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("An error occured.");
  }
};
