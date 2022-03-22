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
  },
  {
    collection: "Interview",
  }
);

const Interview = mongoose.model("Interview", InterviewSchema);
module.exports = Interview;
