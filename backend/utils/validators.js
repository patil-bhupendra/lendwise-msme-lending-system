function validateInput(data) {
  const errors = [];

  const {
    ownerName,
    businessType,
    purpose,
    monthlyRevenue,
    loanAmount,
    tenure,
    pan,
  } = data;

  if (!ownerName) errors.push("ownerName is required");

  if (!businessType) errors.push("businessType is required");

  if (!purpose) errors.push("purpose is required");
  if (!monthlyRevenue) errors.push("monthlyRevenue is required");
  if (!loanAmount) errors.push("loanAmount is required");
  if (!tenure) errors.push("tenure is required");

  if (monthlyRevenue && isNaN(monthlyRevenue)) {
    errors.push("monthlyRevenue must be a number");
  }

  if (loanAmount && isNaN(loanAmount)) {
    errors.push("loanAmount must be a number");
  }

  if (tenure && isNaN(tenure)) {
    errors.push("tenure must be a number");
  }

  if (monthlyRevenue < 0) errors.push("monthlyRevenue cannot be negative");
  if (loanAmount < 0) errors.push("loanAmount cannot be negative");
  if (tenure <= 0) errors.push("tenure must be greater than 0");

  if (pan) {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(pan)) {
      errors.push("Invalid PAN format");
    }
  }

  if (monthlyRevenue && loanAmount) {
    if (loanAmount > monthlyRevenue * 100) {
      errors.push("Loan amount too high compared to revenue");
    }
  }

  return errors;
}

module.exports = { validateInput };
