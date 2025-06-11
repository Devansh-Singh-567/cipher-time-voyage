
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity } from 'lucide-react';

interface SimulationResult {
  algorithm: string;
  time: number;
  keySize: number;
  attempts: string;
  status: 'completed' | 'running' | 'pending';
}

interface ComparisonChartProps {
  results: SimulationResult[];
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ results }) => {
  const chartData = results.map(result => ({
    name: result.algorithm,
    time: result.time,
    keySize: result.keySize,
    'Brute Force Time (s)': result.time
  }));

  const pieData = results.map((result, index) => ({
    name: result.algorithm,
    value: result.time,
    color: index === 0 ? '#60A5FA' : '#34D399'
  }));

  const COLORS = ['#60A5FA', '#34D399'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 p-3 rounded-lg border border-slate-600 shadow-lg">
          <p className="text-white font-semibold">{label}</p>
          <p className="text-purple-300">
            Time: {payload[0].value.toFixed(3)}s
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Activity className="h-5 w-5" />
          Performance Comparison Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Brute Force Time Comparison</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="Brute Force Time (s)" 
                    fill="url(#colorGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Resistance Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => [`${value.toFixed(3)}s`, 'Time']}
                    contentStyle={{
                      backgroundColor: '#1E293B',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.map((result, index) => {
            const efficiency = index === 0 ? 100 : ((results[0].time / result.time) * 100);
            return (
              <div key={index} className="bg-slate-700/50 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">{result.algorithm}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Efficiency:</span>
                    <span className="text-white">{efficiency.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Key Strength:</span>
                    <span className="text-white">{result.keySize} bits</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Attack Time:</span>
                    <span className="text-white">{result.time.toFixed(3)}s</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComparisonChart;
