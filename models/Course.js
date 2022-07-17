const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.String,
      required: [true, "Course Id is a required field!"],
    },
    name: {
      type: mongoose.Schema.Types.String,
      required: [true, "Course Name is a required field!"],
    },
    duration: {
      type: mongoose.Schema.Types.String,
      required: [true, "Duration is required!"],
    },
    numStudentsEnrolled: mongoose.Schema.Types.Number,
    numStudentsEmployed: mongoose.Schema.Types.Number,
  },
  {
    collection: "Course",
  }
);

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
