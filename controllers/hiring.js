const Company = require("../models/Company");
const Employed = require("../models/Employed");
const HiringRequest = require("../models/HiringRequest");
const Institute = require("../models/Institute");
const Student = require("../models/Student");
const mongoose = require("mongoose");

exports.updateHiringRequest = async (req, res, next) => {
  const { requestId, status } = req.body;
  if (!requestId || !status) {
    res.send({ status: false, message: "Invalid Query!" });
    return;
  }

  const hiringRequest = await HiringRequest.findOne({
    _id: requestId,
  });
  if (hiringRequest === null) {
    res.send({ status: false, message: "Invalid Query" });
    return;
  }
  try {
    console.log("Hiring Request: ", hiringRequest);
    const company = await Company.findOne({
      _id: hiringRequest.company.toString(),
    });
    const student = await Student.findOne({
      _id: hiringRequest.student.toString(),
    });
    console.log("student: ", student);
    const institute = await Institute.findOne({
      _id: student.institute[0].toString(),
    });
    console.log("Company: ", company);
    console.log("Student: ", student._id);
    console.log("Institute: ", institute._id);
    if (!company || !student || !institute) {
      res.send({ status: false, message: "Invalid request ID" });
      return;
    }
    // hiringRequest.updateHiringStatus(status);
    HiringRequest.updateOne({ _id: hiringRequest._id, status: status });
    if (status === true) {
      await Employed.create({
        studentId: student._id,
        company: company._id,
        institute: institute._id,
      });
      res.send({ status: true, message: "Update Success" });
      return;
    }
    res.send({ status: true, message: "Update Success" });
  } catch (err) {
    console.log("Error: ", err);
    res.send({ status: false, message: "Some Error Occured" });
  }
};

exports.postHiringRequest = async (req, res, next) => {
  const { company, student, opening } = req.body;

  if (!company || !student || !opening) {
    res.send({ status: false, message: "Invalid Request!" });
    return;
  }

  const hiringRequestId = parseInt(Math.random(15844)) % 7485;
  await HiringRequest.create({
    hiringRequestId,
    company,
    student,
    opening,
  });

  res.send({ status: true, message: "Hiring Request Posted Successfully!" });
};
