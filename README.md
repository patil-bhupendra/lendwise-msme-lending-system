# MSME Lending Decision System

A lightweight, end-to-end lending decision system that evaluates MSME (Micro, Small & Medium Enterprises) loan applications and generates credit decisions based on custom scoring logic.

This project simulates how digital lenders assess risk and approve/reject loan applications using business data and financial indicators.

---

## Live Demo
https://lendwise-msme-lending-system.vercel.app/

### Features
- Single-page loan application form
- Real-time credit decision (Approved / Rejected)
- Custom credit scoring engine
- Reason codes for transparency
- Input validation & error handling
- Clean UI built with React + Tailwind CSS


### Tech Stack
**Frontend:**  
- React (Vite)
- Tailwind CSS
- Axios 

**Backend:**  
- Node.js
- Express.js

**Other:**  
- REST APIs
- Modular architecture

---

## API Endpoint

**POST** ```/api/decision```
Evaluates loan application and returns decision.
### Request Body
```
{
  "monthlyRevenue": 100000,
  "loanAmount": 200000,
  "tenure": 12,
  "pan": "ABCDE1234F"
}
```
### Response
```
{
  "decision": "APPROVED",
  "score": 105,
  "reasons": []
}
```
---

## Decision Logic (Scoring Model)
The system uses a rule-based scoring engine (base score = 50):
### 1. Loan-to-Revenue Ratio

- < 1 → +30 (low risk)
- 1–3 → +15 (moderate risk)
-
    3 → -25 (high risk)

### 2. EMI Burden
- EMI/Revenue < 30% → +25
- 30–60% → +10
-
  60% → -25

### 3. Tenure Risk
- 6–24 months → +15 (optimal)
- < 6 months → -10
-
  36 months → -5

### 4. Revenue Strength
- < ₹50,000 → -20 (low stability)
-
  ₹5,00,000 → +10 (strong business)

### 5. Data Consistency Check
- Unrealistic combinations (e.g. very high loan vs revenue) → penalty

## Final Decision
- Score ≥ 60 → **APPROVED**
- Score < 60 → **REJECTED**
## Validation & Edge Case Handling

The system handles real-world input issues:

- Missing fields
- Invalid data types (non-numeric input)
- Negative values
- Invalid PAN format
- Unrealistic loan requests

## Example Error Response
```
{
  "error": "VALIDATION_ERROR",
 "messages": [
 "monthlyRevenue is Required",
 "loanAmount must be a number"
 ]
}
```
## Project Structure
```
.
├── backend
│   ├── app.js
│   ├── controllers
│   │   └── decision.controller.js
│   ├── models
│   │   └── Application.js
│   ├── package.json
│   ├── routes
│   │   └── decision.routes.js
│   ├── server.js
│   ├── services
│   │   └── scoring.service.js
│   └── utils
│       └── validators.js
└── frontend
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── public
    │   ├── favicon.svg
    │   └── icons.svg
    ├── README.md
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── assets
    │   │   ├── hero.png
    │   │   ├── react.svg
    │   │   └── vite.svg
    │   ├── index.css
    │   └── main.jsx
    └── vite.config.js
```

## Setup Instructions
### Backend
```
cd backend
npm install
npm run dev
```
### Frontend
```
cd frontend
npm install
npm run dev
```
## Assumptions
- EMI is simplified as loanAmount / tenure
- PAN validation uses regex (mock format)
- Revenue is assumed to be stable monthly income
- No external credit bureau data is used
  
## Author
- GitHub: https://github.com/patil-bhupendra
## License

This project is created for technical assessment purposes.
