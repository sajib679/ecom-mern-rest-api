const express = require("express");

const { getFiles, deleteFiles } = require("../controller/upload");
const router = express.Router();

router.get("/upload/:filename", getFiles);

router.delete("/upload/:filename", deleteFiles);

module.exports = router;
