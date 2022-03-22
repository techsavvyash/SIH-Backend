const Company = require("../models/Company");

exports.getCompanyDashBoard = async (req, res, next) => {
  const { companyTIN } = req.session;

  if (!companyTIN) {
    res.send({ status: false, message: "Login In Again!" });
    return;
  }
  const findCompany = await Company.findUser({ companyTIN });
  if (findCompany === null) {
    res.send({ status: false, message: "invalid credentials!" });
    return;
  }
};
