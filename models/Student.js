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
