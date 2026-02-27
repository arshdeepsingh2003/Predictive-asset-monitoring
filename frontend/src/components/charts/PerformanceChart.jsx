import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const PerformanceChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="cycle" />
        <YAxis />
        <Tooltip />
        <Line dataKey="predicted_rul" stroke="#3b82f6" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;