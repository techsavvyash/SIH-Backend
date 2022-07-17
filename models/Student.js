const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.String,
      required: [true, "studentID is a required field!"],
    },
    name: {
      type: mongoose.Schema.Types.String,
      required: [true, "name is a requied field!"],
    },
    institute: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Institute",
        required: [true, "Institute is required!"],
      },
    ],

    companiesApplied: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    ],
    currentlyEmployedAt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    previousInterviews: {
      type: mongoose.Schema.Types.Array,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: [true, "Password is required!"],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course is required"],
    },
    employmentStatus: {
      type: mongoose.Schema.Types.Boolean,
      required: [true, "Student's employment status is a required field!"],
    },
    hiringRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HiringRequest",
      },
    ],
  },
  {
    collection: "Student",
  }
);

StudentSchema.methods.updateCompaniesApplied = async function (company) {
  // code to update the companies applied to here
  this.companiesApplied.push(company);
};

StudentSchema.methods.updateCurrentlyEmployed = function (company) {
  this.currentlyEmployedAt = company;
};

StudentSchema.methods.updateEmploymentStatus = async function (status) {
  this.employmentStatus = status;
};

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
