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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/decision",
        form
      );
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data || { error: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          MSME Lending System
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="monthlyRevenue"
            placeholder="Monthly Revenue"
            value={form.monthlyRevenue}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <input
            name="loanAmount"
            placeholder="Loan Amount"
            value={form.loanAmount}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <input
            name="tenure"
            placeholder="Tenure (months)"
            value={form.tenure}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <input
            name="pan"
            placeholder="PAN"
            value={form.pan}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Processing..." : "Check Decision"}
          </button>
        </form>

        {/* Result */}
        {result && (
          <div className="mt-6 p-4 rounded-lg bg-gray-50 border">
            <h3
              className={`text-lg font-bold ${
                result.decision === "APPROVED"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {result.decision}
            </h3>
            <p className="mt-2">Score: {result.score}</p>
            <p>Reasons: {result.reasons.join(", ") || "None"}</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
            <p className="font-semibold">{error.error}</p>
            {error.messages && (
              <ul className="list-disc ml-5 mt-2">
                {error.messages.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;