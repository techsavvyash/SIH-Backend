const mongoose = require("mongoose");

const InstituteSchema = mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.Number,
      required: [true, "InstitueID is required"],
    },
    name: {
      type: mongoose.Schema.Types.String,
      required: [true, "Institute Name is required"],
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    companiesAssociated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
    ],
    accountStatus: {
      type: mongoose.Schema.Types.Boolean,
      required: [true, "Institute Account Status is a Required Field"],
    },
  },
  {
    collection: "Institute",
  }
);

InstituteSchema.methods.updateStatus = async function () {
  // update status of the institute code here
};

InstituteSchema.methods.updateStudents = async function () {
  // code to update students here
};

InstituteSchema.methods.updateCompanies = async function () {
  // code to update associated institutions here
};

const Institute = mongoose.model("Institute", InstituteSchema);
module.exports = Institute;
