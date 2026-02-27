import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

const SeverityChart = ({ data }) => {

  const counts = [
    { name: "Normal", value: data.filter(d => d.severity==="NORMAL").length },
    { name: "Warning", value: data.filter(d => d.severity==="WARNING").length },
    { name: "Critical", value: data.filter(d => d.severity==="CRITICAL").length }
  ];

  return (
    <ResponsiveContainer height={300}>
      <PieChart>
        <Pie data={counts} dataKey="value">
          {counts.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SeverityChart;