export default function CoreStatsCard({ repo }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 24,
        marginTop: 30,
        marginBottom: 20,
        maxWidth: 500,
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "left",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: 12 }}>{repo.full_name}</h2>
      <p>⭐ Stars: {repo.stargazers_count}</p>
      <p>🍴 Forks: {repo.forks_count}</p>
      <p>❗ Open Issues: {repo.open_issues_count}</p>
      <p>📜 License: {repo.license?.name || "None"}</p>
      <p>
        🔗 Repo Link:{" "}
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          {repo.html_url}
        </a>
      </p>
      <p>
        👤 Owner:{" "}
        <a href={repo.owner?.html_url} target="_blank" rel="noopener noreferrer">
          {repo.owner?.login}
        </a>
      </p>
    </div>
  );
}
