const Interview = require("../models/Interviews");
const Openings = require("../models/Openings");

exports.getStudentInterviews = async (req, res, next) => {
  const { studentId } = req.body; // change this to req.session
  if (!studentId) {
    res.send({ status: false, message: "LOgin to access this page!" });
    return;
  }

  try {
    const interviews = await Interview.find({ student: studentId });
    res.send({
      status: true,
      message: "fetch success",
      interviews: interviews,
    });
  } catch (err) {
    console.log("Error: ", err);
    res.send({ status: false, message: "some error occured!" });
  }
};

exports.getCompanyInterviews = async (req, res, next) => {
  const { companyTIN } = req.body; // update this to req.session ;
  if (!companyTIN) {
    res.send({ status: false, message: "YOu need to login to access this!" });
    return;
  }

  try {
    const interviews = Interview.find({ company: companyTIN });
    res.send({
      status: true,
      message: "fetch success",
      interviews: interviews,
    });
  } catch (err) {
    console.log("Error: ", err);
    res.send({ status: false, message: "some error occured" });
  }
};

exports.postStudentInterviews = async (req, res, next) => {
  const { openingId, studentId } = req.body;
  if ((!openingId, !studentId)) {
    res.send({ status: false, message: "invalid credentials!" });
    return;
  }

  try {
    const interviewId = parseInt(Math.random(754855) % 74142);
    const opening = Openings.find({ openingId });
    const newInterview = Interview.create({
      interviewId,
      student: studentId,
      opening: openingId,
      company: opening.company,
    });

    res.send({
      status: true,
      message: "interview request submitted successfully!",
      interviewId: newInterview.interviewId,
    });
  } catch (err) {
    console.log("Error: ", err);
    res.send({ status: false, message: "Some error occured!" });
  }
};
