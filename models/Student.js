const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.Number,
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
    currentlyEmployed: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    previousInterviews: {},
    password: {
      type: mongoose.Schema.Types.String,
      required: [true, "Password is required!"],
    },
  },
  {
    collection: "Student",
  }
);

StudentSchema.methods.updateCompaniesApplied = async function () {
  // code to update the companies applied to here
};

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
