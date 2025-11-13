const mongoose = require("mongoose");

const tagSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    featuredCollections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
      }
    ]
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

module.exports = mongoose.model("Tag", tagSchema);
