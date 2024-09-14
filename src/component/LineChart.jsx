
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const lineData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 200 },
    { name: 'Apr', value: 278 },
    { name: 'May', value: 189 },
];

const LineCharts = () => (
    <ResponsiveContainer width="100%" height={100}>
    <BarChart data={lineData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
      <XAxis dataKey="name" tick={false} />
      <YAxis tick={false} />
      <Tooltip />
      <Bar dataKey="value" fill="#6200EE" />
    </BarChart>
  </ResponsiveContainer>
);

export default LineCharts;
