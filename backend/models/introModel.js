const mongoose = require("mongoose");

const introSchema = mongoose.Schema(
  {
    vimeoId: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

module.exports = mongoose.model("Intro", introSchema);
