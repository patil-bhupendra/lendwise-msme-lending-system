# MSME Lending Decision System

A full-stack lending decision system that evaluates MSME (Micro, Small & Medium Enterprises) loan applications and generates a structured credit decision with explainable reasoning.

The system simulates a simplified digital credit underwriting pipeline used in fintech platforms, where business financial data is converted into a risk score and decision outcome using a rule-based scoring engine.

---

### Live Demo
- **Frontend**: https://lendwise-msme-lending-system.vercel.app/
- **Backend**: https://lendwise-msme-lending-system.onrender.com/

## Objective
To design and implement an end-to-end lending decision system that:
- Accepts MSME business and loan application data
- Processes inputs through a credit scoring engine
- Generates a binary decision (Approved / Rejected)
- Provides explainable reason codes for transparency
- Ensures proper validation and error handling

The focus is on:
- Clean backend architecture
- Real-world financial decision modeling
- System design clarity
- Production-like code structure

## System Architecture

The backend follows a modular layered architecture:
```
Client (React Frontend)
        ↓
API Layer (Express Routes)
        ↓
Controller Layer
        ↓
Validation Layer
        ↓
Scoring / Decision Engine (Business Logic)
        ↓
Database Layer (MongoDB)
        ↓
Response Formatter
```

This separation ensures:
- Clear separation of concerns
- Scalable business logic design
- Maintainable and testable structure

### Tech Stack
**Frontend:**  
- React (Vite)
- Tailwind CSS
- Axios 

**Backend:**  
- Node.js
- Express.js

**Database:**  
- MongoDB
- Mongoose (ODM)

**Validation & Utilities:**  
- Custom validation middleware
- Regex-based PAN validation

**API Architecture:**  
- RESTful API design
- JSON request/response format

**Deployment:**  
- Frontend: Vercel
- Backend: Render
---
## Core Features
### Backend Features
- REST API for loan decision processing
- Rule-based credit scoring engine
- Structured reason codes for explainability
- Input validation for all request parameters
- MongoDB-based persistence for application records
- Standardized error handling

### Frontend Features
- Single-page loan application form
- Real-time decision output
- Credit score visualization
- Reason codes display for transparency
- Clean responsive UI (React + Tailwind)

## API Endpoint

**POST** ```/api/decision```
Processes MSME loan application and returns credit decision.

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

## Decision Logic (Credit Scoring Engine)
The system uses a rule-based scoring model with a base score of 50, adjusted using financial risk signals.

### 1. Loan-to-Revenue Ratio

- < 1 → +30 (low risk)
- 1–3 → +15 (moderate risk)
-
    3 → -25 (high risk)

### 2. EMI Burden
(EMI is approximated as loanAmount / tenure)
- < 30% of revenue → +25
- 30% – 60% → +10
- 60% → -25

### 3. Tenure Risk
- 6 – 24 months → +15 (optimal range)
- < 6 months → -10 (high repayment pressure)
- 36 months → -5 (long-term risk)

### 4. Revenue Strength
- < ₹50,000 → -20 (low stability)
-
  ≥ ₹5,00,000 → +10 (strong business profile)

### 5. Data Consistency Checks
- Loan amount disproportionately higher than revenue
- Invalid or missing fields
- Negative or unrealistic values

## Final Decision
- Score ≥ 60 → **APPROVED**
- Score < 60 → **REJECTED**

## Validation & Edge Case Handling

The system handles real-world input issues:

- Missing or incomplete fields
- Invalid data types (non-numeric input)
- Negative revenue or loan amounts
- Invalid PAN format
- Conflicting financial data

## Error Response Format
```
{
  "error": "VALIDATION_ERROR",
  "messages": [
    "monthlyRevenue is required",
    "loanAmount must be a valid number"
  ]
}
```
## Data Persistence (MongoDB)
The system uses MongoDB to store:
- Loan applications
- Scoring results
- Decision outcomes

This enables:
- Data traceability
- Audit-friendly structure
- Future analytics expansion

## Project Structure
```
.
├── backend
│   ├── app.js
│   ├── config
│   │   └── db.js
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
├── frontend
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── public
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── README.md
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── assets
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   ├── index.css
│   │   └── main.jsx
│   └── vite.config.js
└── README.md
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
- EMI is approximated as:
  ```loanAmount / tenure```
- PAN validation uses regex-based format check
- Monthly revenue is assumed stable
- No external credit bureau APIs are integrated
- Decision engine is rule-based (not ML-based)

## Design Decisions & Tradeoffs

### Why rule-based scoring?
- Ensures transparency in credit decisions
- Easy to debug and explain
- Suitable for prototype underwriting systems

### Why MongoDB?
- Flexible schema for application data
- Easy scalability for storing loan records
- Suitable for audit-style tracking

### Architectural tradeoff

- Simplified monolithic backend for sprint speed
  vs
- Full microservice-based lending system


## Future Improvements

- Async decision processing (queue-based system)
- Audit trail dashboard for loan history
- Rate limiting and authentication layer
- Docker-based deployment setup
- Integration with real credit bureau APIs
- Admin dashboard for analytics
  
## Author
- GitHub: https://github.com/patil-bhupendra

## License

This project is developed for a technical assessment and demonstrates full-stack engineering, system design thinking, and backend architecture skills.
