const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema(
  {
    companyTIN: {
      type: mongoose.Schema.Types.String,
      required: [true, "Company's TIN number is required!"],
    },
    name: {
      type: mongoose.Schema.Types.String,
      required: [true, "Name is required!"],
    },
    studentsCurrentllyEmployed: [mongoose.Schema.Types.ObjectId],
    studentsInterviewed: [mongoose.Schema.Types.ObjectId],
    instituesAssociated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Institute",
      },
    ],
    password: {
      type: mongoose.Schema.Types.String,
      required: [true, "Password is required!"],
    },
    openings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Openings" }],
  },
  {
    colletion: "Company",
  }
);

CompanySchema.methods.updateStatus = async function () {
  // code to update the institute status here
};

CompanySchema.methods.updateInstitutes = async function () {
  // code to update the associated institutes here
};

CompanySchema.methods.updateCurrentlyEmployed = async function () {
  //  code to update the currently employed students
};

CompanySchema.methods.updateStudentsInterviewed = async function () {
  // code to update the students currently interviewed
};
const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;
