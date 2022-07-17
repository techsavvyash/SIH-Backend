const Company = require("../models/Company");
const Institute = require("../models/Institute");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
exports.getDashboard = async (req, res, next) => {
  req.user = null;
  const token = req.session.token;
  if (token == null) {
    res.user = null;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err || user == null) {
      req.user = null;
    } else {
      req.user = user.username;
    }
  });
  if (req.session === null) {
    console.log("here");
    res.send({
      status: false,
      message: "You need to login to access this page!",
    });

    return;
  }
  const role = req.session.role;
  console.log(role);
  console.log(req.user);
  if (!role || !req.user) {
    res.send({
      status: false,
      message: "You need to login to access this page!",
    });

    return;
  }

  switch (role) {
    case "employer":
      const company = await Company.findOne({ companyTIN: req.user });
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
        obj: company,
      });

      break;
    case "student":
      const student = await Student.findOne({ studentId: req.user });
      if (student === null) {
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
        role: "student",
        obj: student,
      });
      break;
    case "institution":
      const institute = await Institute.findOne({ instituteId: req.user });
      if (institute === null) {
        req.session = null;
        res.send({
          status: false,
          message: "You need to login to access this page!",
        });

        return;
      }

      res.send({
        status: true,
        message: "fetch success!",
        role: "institute",
        obj: institute,
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
