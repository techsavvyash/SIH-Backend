const mongoose = require("mongoose");

const InterviewSchema = mongoose.Schema(
  {
    interviewId: {
      type: mongoose.Schema.Types.Number,
      required: [true, "interview ID is required"],
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "StudentID of the interviewing student is required"],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [
        true,
        "Company ID of the company taking the interview is necessary",
      ],
    },
    opening: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Openings",
      required: [true, "Opening corresponding to the interview is necessary"],
    },
    schedule: {
      type: mongoose.Schema.Types.Date,
      required: [true, "Schedule of the interview is required"],
    },
    hiringRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HiringRequest",
      required: [true, "Hiring Request is a required field"],
    },
  },
  {
    collection: "Interview",
  }
);

const Interview = mongoose.model("Interview", InterviewSchema);
module.exports = Interview;
