import { useState, useEffect } from "react";
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
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  async function analyze() {
    if (!owner || !repo) return alert("Enter owner and repo name");
    if (!isOnline) return alert("You are offline");

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

        const hasCommits = formatted.some((w) => w.commits > 0);
        setCommits(hasCommits ? formatted : null);
      }
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#f9f9f9",
      }}
    >
      {/* Main content */}
      <div style={{ flex: 1 }}>
        {/* Header + Inputs */}
        <div style={{ padding: 20, maxWidth: 800, margin: "30px auto" }}>
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 24,
              backgroundColor: "#fff",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h1 style={{ marginBottom: 20 }}>GitHub Repository Analyzer</h1>
            <div style={{ marginBottom: 20 }}>
              <input
                placeholder="Owner (e.g. facebook)"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                style={{
                  marginRight: 10,
                  padding: 8,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                }}
              />
              <input
                placeholder="Repo (e.g. react)"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                style={{
                  marginRight: 10,
                  padding: 8,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                }}
              />
              <button
                onClick={analyze}
                disabled={!isOnline}
                style={{
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: 6,
                  backgroundColor: isOnline ? "#007bff" : "#aaa",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: isOnline ? "pointer" : "not-allowed",
                }}
              >
                Analyze
              </button>
            </div>
            {!isOnline && <p style={{ color: "red" }}>⚠️ You are offline.</p>}
            {data && <CoreStatsCard repo={data} />}
          </div>
        </div>

        {/* Charts */}
        {data && (
          <div
            style={{
              maxWidth: 1200,
              margin: "40px auto",
              padding: "0 20px",
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            {languages && Object.keys(languages).length > 0 && (
              <div style={{ flex: "1 1 300px", minWidth: 300 }}>
                <LanguageChart languages={languages} />
              </div>
            )}

            {commits && commits.length > 0 && (
              <div style={{ flex: "1 1 300px", minWidth: 300 }}>
                <CommitActivityChart commits={commits} />
              </div>
            )}
          </div>
        )}

        {/* AI Insights */}
        {data && (
          <div
            style={{
              maxWidth: 800,
              margin: "60px auto 40px auto",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <AIInsights owner={owner} repo={repo} description={data.description} />
          </div>
        )}
      </div>

      {/* Sticky Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: 20,
          backgroundColor: "#f0f0f0",
          color: "#666",
        }}
      >
        Made with ❤️ by Ankita Giri
      </footer>
    </div>
  );
}
