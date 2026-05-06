function calculateScore(data) {
  const { monthlyRevenue, loanAmount, tenure } = data;

  let score = 50;
  let reasons = [];

  const loanRatio = loanAmount / monthlyRevenue;

  if (loanRatio < 1) {
    score += 30;
  } else if (loanRatio <= 3) {
    score += 15;
  } else {
    score -= 25;
    reasons.push("HIGH_LOAN_RATIO");
  }

  const emi = loanAmount / tenure;
  const burden = emi / monthlyRevenue;

  if (burden < 0.3) {
    score += 25;
  } else if (burden <= 0.6) {
    score += 10;
  } else {
    score -= 25;
    reasons.push("HIGH_EMI_BURDEN");
  }

  if (tenure >= 6 && tenure <= 24) {
    score += 15;
  } else if (tenure < 6) {
    score -= 10;
    reasons.push("SHORT_TENURE_RISK");
  } else if (tenure > 36) {
    score -= 5;
    reasons.push("LONG_TENURE_RISK");
  }

  if (monthlyRevenue < 50000) {
    score -= 20;
    reasons.push("LOW_REVENUE");
  } else if (monthlyRevenue > 500000) {
    score += 10;
  }

  if (monthlyRevenue > 1000000 && loanAmount > 50000000) {
    score -= 30;
    reasons.push("DATA_INCONSISTENCY");
  }

  const decision = score >= 60 ? "APPROVED" : "REJECTED";

  return {
    decision,
    score,
    reasons,
  };
}

module.exports = { calculateScore };
