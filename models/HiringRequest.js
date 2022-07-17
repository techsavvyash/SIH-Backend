const mongoose = require("mongoose");

const HiringRequestSchema = mongoose.Schema(
  {
    hiringRequestId: {
      type: mongoose.Schema.Types.Number,
      required: [true, "RequestID is required!"],
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "StudentId is required!"],
    },
    opening: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opening",
      required: [true, "Opening corresponding to request is required!"],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company corresponding to opening is required!"],
    },
    hiredStatus: {
      type: mongoose.Schema.Types.Boolean,
    },
  },
  {
    collection: "HiringRequest",
  }
);

HiringRequestSchema.methods.updateHiringStatus = async function (status) {
  this.hiredStatus = status;
};

const HiringRequest = mongoose.model("HiringRequest", HiringRequestSchema);
module.exports = HiringRequest;
