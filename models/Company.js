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
    studentsCurrentllyEmployed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: [true, "List of currently employed students is required!"],
      },
    ],
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
    hiringRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HiringStatus",
      },
    ],
  },
  {
    collection: "Company",
  }
);

CompanySchema.methods.updateInstitutes = function (institute) {
  // code to update the associated institutes here
  this.instituesAssociated.push(institute);
};

CompanySchema.methods.updateCurrentlyEmployed = function (student) {
  //  code to update the currently employed students
  this.studentsCurrentllyEmployed.push(student);
};

CompanySchema.methods.updateStudentsInterviewed = function (student) {
  // code to update the students currently interviewed
  this.studentsInterviewed.push(student);
};

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;
