import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const HealthChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="engine_id" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="health_index" stroke="#22c55e" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HealthChart;