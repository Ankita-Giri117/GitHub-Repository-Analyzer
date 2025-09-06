import { useState } from "react";
import { fetchRepo, fetchLanguages, fetchCommits } from "./github";
import CoreStatsCard from "./components/CoreStatsCard";
import LanguageChart from "./components/LanguageChart";
import CommitActivityChart from "./components/CommitActivityChart";
import AIInsights from "./components/AIInsights";

export default function App() {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [data, setData] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [commits, setCommits] = useState(null);
  const [theme, setTheme] = useState("light");

  async function analyze() {
    if (!owner || !repo) {
      alert("Please enter both owner and repo name");
      return;
    }

    try {
      const repoData = await fetchRepo(owner, repo);
      setData(repoData);

      const langs = await fetchLanguages(owner, repo);
      setLanguages(langs);

      const commitData = await fetchCommits(owner, repo);
      if (Array.isArray(commitData)) {
        const formatted = commitData.map((week, i) => ({
          week: `W${i + 1}`,
          commits: week.total,
        }));
        setCommits(formatted);
      }
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className={theme} style={{ width: "100vw", overflowX: "hidden" }}>
      {/* Theme Toggle */}
      <div style={{ textAlign: "right", padding: "10px 20px" }}>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Toggle {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>

      {/* Header + Inputs */}
      <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>
        <h1>GitHub Repo Analyzer</h1>

        <input
          placeholder="Enter repo owner (e.g., facebook)"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          placeholder="Enter repo name (e.g., react)"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button onClick={analyze}>Analyze</button>

        {data && <CoreStatsCard repo={data} />}
      </div>

      {data && (
        <>
          {/* Charts row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              width: "100vw",
              padding: "0 20px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ height: "500px" }}>
              <LanguageChart languages={languages} />
            </div>
            <div style={{ height: "500px" }}>
              <CommitActivityChart commits={commits} />
            </div>
          </div>

          {/* Insights below */}
          <div
            style={{
              maxWidth: "800px",
              margin: "80px auto", // pushed down
              padding: "0 20px",
            }}
          >
            <AIInsights
              owner={owner}
              repo={repo}
              description={data.description}
            />
          </div>
        </>
      )}
    </div>
  );
}
