const mongoose = require("mongoose");

const EmployedSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "StudentId is required!"],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company is required"],
    },
    institute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: [true, "Institute is required"],
    },
  },
  {
    collection: "Employed",
  }
);

const Employed = mongoose.model("Employed", EmployedSchema);
module.exports = Employed;
