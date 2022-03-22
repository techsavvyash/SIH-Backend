const Company = require("../models/Company");
const Institute = require("../models/Institute");
const Student = require("../models/Student");

exports.getDashboard = async (req, res, next) => {
  if (req.session === null) {
    res.send({
      status: false,
      message: "You need to login to access this page!",
    });
    return;
  }
  const role = req.session.role;
  if (!role || !req.user) {
    res.send({
      status: false,
      message: "You need to login to access this page!",
    });
    return;
  }

  switch (role) {
    case "employer":
      const company = Company.find({ companyTIN: req.user });
      if (company === null) {
        req.session = null;
        res.send({
          status: false,
          message: "You need to login to access this page!",
        });
        return;
      }

      res.send({
        status: true,
        message: "fetch success",
        role: "employer",
        data: company,
      });

      break;
    case "student":
      const student = Student.find({ studentId: req.user });
      if (student === null) {
        req.session = null;
        res.send({
          status: false,
          message: "You need to login to access this page!",
        });
        return;
      }

      res.send({
        status: false,
        message: "fetch success",
        role: "student",
        data: student,
      });
      break;
    case "institution":
      const institute = Institute.find({ instituteId: req.user });
      if (company === null) {
        req.session = null;
        res.send({
          status: false,
          message: "You need to login to access this page!",
        });

        return;
      }

      res.send({
        status: false,
        message: "fetch success!",
        role: "institute",
        data: institute,
      });
      break;

    default:
      req.session = null;
      res.send({
        status: false,
        message: "You need to login to access this route!",
      });
      break;
  }
};
