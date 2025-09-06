import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFF", "#FF6699"];

export default function LanguageChart({ languages }) {
  if (!languages || Object.keys(languages).length === 0) {
    return <p>No language data available.</p>;
  }

  const total = Object.values(languages).reduce((a, b) => a + b, 0);

  const data = Object.entries(languages).map(([name, value]) => ({
    name,
    value,
    percent: ((value / total) * 100).toFixed(1),
  }));

  // ✅ Custom Legend with two aligned columns
  const renderLegend = () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "8px 20px",
        marginTop: "20px",
        textAlign: "left",
        maxWidth: "600px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {data.map((entry, index) => (
        <div
          key={`legend-${index}`}
          style={{ display: "flex", alignItems: "center" }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              backgroundColor: COLORS[index % COLORS.length],
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
    <div style={{ width: "100%", height: 500 }}>
      <h3 style={{ textAlign: "center", marginBottom: 20 }}>
        Language Distribution
      </h3>
      <ResponsiveContainer width="100%" height="70%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={150}
            dataKey="value"
            label={false}   // ✅ removed labels
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* ✅ Custom aligned legend below */}
      {renderLegend()}
    </div>
  );
}


