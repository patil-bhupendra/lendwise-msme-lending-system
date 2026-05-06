import { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    monthlyRevenue: "",
    loanAmount: "",
    tenure: "",
    pan: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/decision",
        form
      );
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data || { error: "Something went wrong" });
    }
  };

  return (
    <div style={styles.container}>
      <h2>MSME Lending Decision System</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="monthlyRevenue"
          placeholder="Monthly Revenue"
          value={form.monthlyRevenue}
          onChange={handleChange}
        />

        <input
          name="loanAmount"
          placeholder="Loan Amount"
          value={form.loanAmount}
          onChange={handleChange}
        />

        <input
          name="tenure"
          placeholder="Tenure (months)"
          value={form.tenure}
          onChange={handleChange}
        />

        <input
          name="pan"
          placeholder="PAN"
          value={form.pan}
          onChange={handleChange}
        />

        <button type="submit">Check Decision</button>
      </form>

      {/* Result */}
      {result && (
        <div style={styles.result}>
          <h3>Decision: {result.decision}</h3>
          <p>Score: {result.score}</p>
          <p>Reasons: {result.reasons.join(", ") || "None"}</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={styles.error}>
          <h4>Error: {error.error}</h4>
          {error.messages && (
            <ul>
              {error.messages.map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  result: {
    marginTop: "20px",
    padding: "10px",
    background: "#e0ffe0",
  },
  error: {
    marginTop: "20px",
    padding: "10px",
    background: "#ffe0e0",
  },
};

export default App;