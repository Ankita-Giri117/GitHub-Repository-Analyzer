import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFF", "#FF6699"];

export default function LanguageChart({ languages }) {
  if (!languages || Object.keys(languages).length === 0) {
    return <p style={{ textAlign: "center", marginTop: 20 }}>No language data available.</p>;
  }

  const total = Object.values(languages).reduce((a, b) => a + b, 0);

  const data = Object.entries(languages).map(([name, value], index) => ({
    name,
    value,
    percent: ((value / total) * 100).toFixed(1),
    color: COLORS[index % COLORS.length], // ✅ tie color to data
  }));

  const renderLegend = () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "8px 20px",
        marginTop: 16,
        textAlign: "left",
        maxWidth: 500,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {data.map((entry, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 14,
              height: 14,
              backgroundColor: entry.color, // ✅ correct color
              marginRight: 8,
              borderRadius: 3,
              flexShrink: 0,
            }}
          />
          <span style={{ flexGrow: 1 }}>{entry.name}</span>
          <span style={{ marginLeft: "auto" }}>{entry.percent}%</span>
        </div>
      ))}
    </div>
  );

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 24,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        marginBottom: 40,
        height: 500,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: 16 }}>Language Distribution</h3>
      <div style={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius="70%" // ✅ responsive size inside container
              dataKey="value"
              label={false}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} /> // ✅ use data color
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {renderLegend()}
    </div>
  );
}
