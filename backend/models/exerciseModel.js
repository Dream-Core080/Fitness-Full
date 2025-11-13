const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    vimeoId: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    description: {
      type: String,
    },
    popularity: {
      type: Number,
    },
    difficulty: {
      type: Number,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      }
    ],
    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
      }
    ],
    equipments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipment",
      }
    ],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

module.exports = mongoose.model("Exercise", exerciseSchema);
