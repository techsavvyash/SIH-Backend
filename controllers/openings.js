const Openings = require("../models/Openings");

exports.getOpenings = async (req, res, next) => {
  try {
    const openings = await Openings.find({});
    res.send({ status: true, message: "Fetch successful", openings: openings });
  } catch (err) {
    console.log("err", err);
    res.send({ status: false, message: "Some error occured!" });
  }
};

exports.postOpenings = async (req, res, next) => {
  const { openingId, companyTIN, description } = req.body;
  if (!openingId || !companyTIN || !description) {
    res.send({ status: false, message: "Invalid details for an opening" });
    return;
  }

  try {
    const opening = await Openings.create({
      openingId,
      companyTIN,
      description,
    });
    res.send({
      status: true,
      message: "Opening posted successfully",
      openingId: opening.openingId,
    });
  } catch (Err) {
    console.log(Err);
    res.send({ status: false, message: "Some error occured!" });
  }
};
