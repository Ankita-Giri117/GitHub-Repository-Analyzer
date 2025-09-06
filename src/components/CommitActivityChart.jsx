import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function CommitActivityChart({ commits }) {
  if (!commits || commits.length === 0) {
    return <p>No commit activity data available.</p>;
  }

  return (
    <div style={{ width: "100%", height: 500 }}>
      <h3 style={{ textAlign: "center", marginBottom: 40 }}>Commit Activity</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={commits}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" label={{ value: "Weeks", position: "insideBottom", offset: -5 }} />
          <YAxis label={{ value: "Commits", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Bar dataKey="commits" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
