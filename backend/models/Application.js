const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    ownerName: {
      type: String,
      required: true,
    },

    businessType: {
      type: String,
      required: true,
    },

    purpose: {
      type: String,
      required: true,
    },

    monthlyRevenue: {
      type: Number,
      required: true,
    },

    loanAmount: {
      type: Number,
      required: true,
    },

    tenure: {
      type: Number,
      required: true,
    },

    pan: {
      type: String,
      required: true,
    },

    decision: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    reasons: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Application", applicationSchema);
