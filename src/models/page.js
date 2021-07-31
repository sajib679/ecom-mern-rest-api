const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var pageSchema = new mongoose.Schema(
  {
    pageTitle: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    bannersImage: [
      {
        img: { type: String },
        link: { type: String },
        navigateTo: { type: String },
      },
    ],

    productsImage: [
      {
        img: { type: String },
        link: { type: String },
        navigateTo: { type: String },
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Page", pageSchema);
