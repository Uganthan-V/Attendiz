
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', Present: 28, Absent: 2 },
  { name: 'Tue', Present: 29, Absent: 1 },
  { name: 'Wed', Present: 25, Absent: 5 },
  { name: 'Thu', Present: 30, Absent: 0 },
  { name: 'Fri', Present: 27, Absent: 3 },
  { name: 'Sat', Present: 29, Absent: 1 },
  { name: 'Sun', Present: 30, Absent: 0 },
];

const AttendanceChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
        <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} />
        <YAxis tick={{ fill: '#94a3b8' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            borderColor: '#334155',
            color: '#e2e8f0',
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="Present" stroke="#22c55e" strokeWidth={2} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Absent" stroke="#ef4444" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AttendanceChart;
