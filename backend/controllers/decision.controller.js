const { calculateScore } = require("../services/scoring.service");

exports.getDecision = (req, res) => {
  const { monthlyRevenue, loanAmount, tenure } = req.body;

  if (!monthlyRevenue || !loanAmount || !tenure) {
    return res.status(400).json({
      error: "MISSING_FIELDS",
      message: "monthlyRevenue, loanAmount, and tenure are required",
    });
  }

  const data = {
    monthlyRevenue: Number(monthlyRevenue),
    loanAmount: Number(loanAmount),
    tenure: Number(tenure),
  };

  const result = calculateScore(data);

  return res.status(200).json(result);
};
