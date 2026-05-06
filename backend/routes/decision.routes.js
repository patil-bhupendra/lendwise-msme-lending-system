const express = require("express");
const router = express.Router();

const { getDecision } = require("../controllers/decision.controller");

// POST /api/decision
router.post("/decision", getDecision);

module.exports = router;