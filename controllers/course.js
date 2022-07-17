const Course = require("../models/Course");

exports.postCourses = async (req, res, next) => {
  const { courseId, name, duration } = req.body;

  if (!courseId || !name || !duration) {
    res.send({ status: false, message: "Invalid details" });
    return;
  }

  await Course.create({
    courseId,
    name,
    duration,
  });

  res.send({ status: false, message: "Course Added Successfully!" });
};

exports.getCourses = async (req, res, next) => {
  const courses = await Course.find();
  res.send({ status: true, message: "fetch successful", courses: courses });
};
