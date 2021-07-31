const mongoose = require("mongoose");

var bannerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    bannerImages: [
      {
        img: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },

  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Banner", bannerSchema);
