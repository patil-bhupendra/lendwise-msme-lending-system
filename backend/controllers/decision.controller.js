const { calculateScore } = require("../services/scoring.service");
const { validateInput } = require("../utils/validators");

exports.getDecision = (req, res) => {
  const errors = validateInput(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      messages: errors,
    });
  }

  const data = {
    monthlyRevenue: Number(req.body.monthlyRevenue),
    loanAmount: Number(req.body.loanAmount),
    tenure: Number(req.body.tenure),
  };

  const result = calculateScore(data);

  return res.status(200).json(result);
};
