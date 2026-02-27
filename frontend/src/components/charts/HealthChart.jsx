import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const dummyData = [
  { cycle: 1, health: 0.9 },
  { cycle: 2, health: 0.85 },
  { cycle: 3, health: 0.8 },
];

export default function HealthChart() {
  return (
    <div className="chart">
      <h3>Health Overview</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dummyData}>
          <XAxis dataKey="cycle"/>
          <YAxis/>
          <Tooltip/>
          <Line type="monotone" dataKey="health"/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}