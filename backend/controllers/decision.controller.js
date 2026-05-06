exports.getDecision = (req, res) => {
  const { monthlyRevenue, loanAmount, tenure, businessType } = req.body;

  // Basic validation
  if (!monthlyRevenue || !loanAmount || !tenure) {
    return res.status(400).json({
      error: "MISSING_FIELDS",
      message: "monthlyRevenue, loanAmount, and tenure are required",
    });
  }

  // Dummy response (for now)
  return res.status(200).json({
    decision: "APPROVED",
    score: 75,
    reasons: [],
  });
};