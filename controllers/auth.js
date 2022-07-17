const Company = require("../models/Company");
const Institute = require("../models/Institute");
const Student = require("../models/Student");
const generateJWT = require("../utils/utils").generateJWT;

exports.signup = async (req, res, next) => {
  let flag = false;
  const { role, name, password } = req.body;
  if (role === null) {
    res
      .status(401)
      .send({ status: false, message: "Role is a required field!" });
    return;
  }

  switch (role) {
    case "employer":
      const { companyTIN } = req.body;
      if (!name || !companyTIN || !password) {
        res.status(401).send({ status: false, message: "Invalid credentials" });
      } else {
        try {
          const checkCompany = await Company.findOne({ companyTIN });
          console.log("checkCompany: ", checkCompany);
          if (!checkCompany) {
            console.log("creating new obj");
            await Company.create({
              companyTIN,
              name: name,
              password: password,
            });
            // add logic to email the credentials to the company
            flag = true;
            res.status(201).send({
              status: true,
              message: "Registration Successful! Kindly, Login In!",
            });
          }
        } catch (err) {
          console.log("Error", err);
          res
            .status(401)
            .send({ status: false, message: "Some error occured!" });
        }
      }
      break;
    case "student":
      const { studentId, institute, course, employmentStatus } = req.body;
      try {
        const checkUser = await Student.findOne({ studentId, institute });
        if (checkUser === null) {
          await Student.create({
            studentId: studentId,
            name: name,
            password: password,
            course: course,
            employmentStatus: employmentStatus,
            institute: institute,
          });
          // logic to email the credentials
          flag = true;
          res.send({
            status: true,
            message: "Student Registered Successfully!",
          });
        } else {
          res.send({
            status: false,
            message: "Student is already registered!",
          });
        }
      } catch (err) {
        console.log("Error: ", err);
        res.send({ status: false, message: "Some Error Occured!" });
      }
      break;
    case "institution":
      const { instituteId } = req.body;
      const checkInstitution = await Institute.findOne({ instituteId });
      if (checkInstitution === null) {
        await Institute.create({
          name: name,
          instituteId: instituteId,
          password: password,
        });
        // logic to email the credentials
        flag = true;
        res.send({
          status: true,
          message:
            "Institute Registered Successfully!, Kindly Login to access the dashboard",
        });
      } else {
        res.send({
          status: false,
          message: "Institution is already registered! Kindly login!",
        });
      }
      break;
    default:
      res.status(401).send({ status: false, message: "Invalid Role!" });
      break;
  }

  if (flag) {
    // logic to email the credentials
  }
};

exports.login = async (req, res, next) => {
  const { role } = req.body;
  if (!role) {
    res.status(401).send({ status: false, message: "Role is Required!" });
    return;
  }

  const { username, password } = req.body;
  switch (role) {
    case "employer":
      console.log("initiating employer login");
      // const { companyTIN } = req.body;
      if (!username || !password) {
        res
          .status(401)
          .send({ status: false, message: "Invalid Credentials!" });
        return;
      }
      // console.log("companyTIN", companyTIN);
      const findUser = await Company.findOne({ companyTIN: username });
      console.log("findUser", findUser);
      if (findUser === null) {
        res
          .status(401)
          .send({ status: false, message: "Invalid Credentials!" });
        return;
      }

      if (password === findUser.password) {
        req.session.token = generateJWT(findUser.companyTIN);
        req.session.role = "employer";
        res.send({ status: true, message: "Log In Success!" });
      } else {
        res.send({ status: false, message: "invalid credentials!" });
      }

      break;

    case "institution":
      // const { instituteId } = req.body;
      if (!username || !password) {
        res.send({ status: false, message: "Invalid Credentials!" });
        return;
      }

      try {
        const findInstitute = await Institute.findOne({
          instituteId: username,
        });
        if (findInstitute === null) {
          res.send({ status: false, message: "Invalid credentials!" });
          return;
        }

        if (password === findInstitute.password) {
          req.session.token = generateJWT(findInstitute.instituteId);
          req.session.role = "institution";
          res.send({ status: true, message: "Login Success!" });
        } else {
          res.send({ status: false, message: "Invalid credentials" });
        }
      } catch (err) {
        console.log("Error: ", err);
        res.send({ status: false, message: "Some Error Occured" });
      }
      break;

    case "student":
      // const { studentId } = req.body;
      if (!username || !password) {
        res.send({ status: false, message: "Invalid credentials!" });
        return;
      }
      try {
        const findStudent = await Student.findOne({ studentId: username });
        if (findStudent === null) {
          res.send({ status: false, message: "Invalid credentials!" });
          return;
        }

        if (password === findStudent.password) {
          req.session.token = generateJWT(findStudent.studentId);
          req.session.role = "student";
          res.send({ status: true, message: "Login Success!" });
        } else {
          res.send({ status: false, message: "Invalid credentials" });
        }
      } catch (err) {
        console.log("Error: ", err);
        res.send({ status: false, message: "Some Error Occured" });
      }

      break;
    default:
      res.send({ status: false, message: "Invalid Role!" });
      break;
  }
};
