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

    // 1. Repository Summary (short)
    const summaryPrompt = `Summarize the GitHub repo "${owner}/${repo}" in 2–3 concise sentences.
Description: ${description || "No description"}.`;

    // 2. Language Analysis (short)
    const langPrompt = `Explain the main programming languages used in "${owner}/${repo}" in 2 sentences.
Keep it brief and clear.`;

    // 3. Contribution Patterns (short)
    const contribPrompt = `Describe the contribution style of "${owner}/${repo}" in 2–3 sentences.
Focus on collaboration health (solo vs. team).`;

    const [summaryText, langText, contribText] = await Promise.all([
      askGemini(summaryPrompt),
      askGemini(langPrompt),
      askGemini(contribPrompt),
    ]);

    setSummary(summaryText);
    setLanguages(langText);
    setContrib(contribText);
    setLoading(false);
  }

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16 }}>
      <h2>🤖 AI Insights</h2>
      <button onClick={generateInsights} disabled={loading}>
        {loading ? "Generating..." : "Generate AI Insights"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Repo Summary */}
      {summary && (
        <div style={{ marginTop: 20 }}>
          <h3>📘 Repository Summary</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{summary}</p>
        </div>
      )}

      {/* Language Analysis */}
      {languages && (
        <div style={{ marginTop: 20 }}>
          <h3>🛠 Language Analysis</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{languages}</p>
        </div>
      )}

      {/* Contribution Patterns */}
      {contrib && (
        <div style={{ marginTop: 20 }}>
          <h3>👥 Contribution Patterns</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{contrib}</p>
        </div>
      )}
    </div>
  );
}

