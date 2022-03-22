const mongoose = require("mongoose");

const OpeningSchema = mongoose.Schema(
  {
    openingId: {
      type: mongoose.Schema.Types.Number,
      required: [true, "Opening is required!"],
    },
    companyTIN: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company is required"],
    },
    description: {
      type: mongoose.Schema.Types.String,
      required: [true, "Description is required!"],
    },
  },
  {
    collection: "Openings",
  }
);

const Openings = mongoose.model("Openings", OpeningSchema);
module.exports = Openings;
