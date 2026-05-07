const { calculateScore } = require("../services/scoring.service");
const { validateInput } = require("../utils/validators");
const Application = require("../models/Application");

exports.getDecision = async (req, res) => {
  try {
    const errors = validateInput(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        error: "VALIDATION_ERROR",
        messages: errors,
      });
    }

    const data = {
      ownerName: req.body.ownerName,
      businessType: req.body.businessType,
      purpose: req.body.purpose,
      monthlyRevenue: Number(req.body.monthlyRevenue),
      loanAmount: Number(req.body.loanAmount),
      tenure: Number(req.body.tenure),
      pan: req.body.pan,
    };

    const result = calculateScore(data);

    const savedApplication = await Application.create({
      ...data,
      decision: result.decision,
      score: result.score,
      reasons: result.reasons,
    });

    return res.status(200).json({
      success: true,
      applicationId: savedApplication._id,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      error: "SERVER_ERROR",
      message: error.message,
    });
  }
};
