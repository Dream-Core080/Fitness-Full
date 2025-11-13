const mongoose = require("mongoose");

const quizSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    level: {
      type: Number
    }
  }
);

module.exports = mongoose.model("Quiz", quizSchema);
