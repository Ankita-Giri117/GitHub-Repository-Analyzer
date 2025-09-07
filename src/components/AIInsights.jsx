import { useState } from "react";
import { askGemini } from "../ai";

export default function AIInsights({ owner, repo, description }) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [languages, setLanguages] = useState("");
  const [contrib, setContrib] = useState("");
  const [error, setError] = useState("");

  async function generateInsights() {
    if (!owner || !repo) {
      setError("⚠️ Please enter a repo first.");
      return;
    }
    setError("");
    setSummary("");
    setLanguages("");
    setContrib("");
    setLoading(true);

    try {
      const summaryPrompt = `Summarize the GitHub repo "${owner}/${repo}" in 2–3 concise sentences.
Description: ${description || "No description"}.`;

      const langPrompt = `Explain the main programming languages used in "${owner}/${repo}" in 2 sentences. Keep it brief and clear.`;

      const contribPrompt = `Describe the contribution style of "${owner}/${repo}" in 2–3 sentences. Focus on collaboration health (solo vs. team).`;

      const [summaryText, langText, contribText] = await Promise.all([
        askGemini(summaryPrompt),
        askGemini(langPrompt),
        askGemini(contribPrompt),
      ]);

      setSummary(summaryText);
      setLanguages(langText);
      setContrib(contribText);
    } catch (err) {
      setError("❌ Failed to fetch AI insights. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 24,
        margin: "30px auto",
        maxWidth: 700,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <h4 style={{ textAlign: "center", marginBottom: 16 }}>🤖 AI Insights</h4>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <button
          onClick={generateInsights}
          disabled={loading}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: 8,
            backgroundColor: loading ? "#aaa" : "#007bff",
            color: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {loading ? "Generating..." : "Generate AI Insights"}
        </button>
      </div>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {summary && (
        <div style={{ marginTop: 20 }}>
          <h3>📘 Repository Summary</h3>
          <p>{summary}</p>
        </div>
      )}

      {languages && (
        <div style={{ marginTop: 20 }}>
          <h3>🛠 Language Analysis</h3>
          <p>{languages}</p>
        </div>
      )}

      {contrib && (
        <div style={{ marginTop: 20 }}>
          <h3>👥 Contribution Patterns</h3>
          <p>{contrib}</p>
        </div>
      )}
    </div>
  );
}
