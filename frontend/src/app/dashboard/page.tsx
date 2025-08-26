// app/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { waterAPI } from '../../services/api';

// Mock data generator for the live chart (keeping this for real-time simulation)
const generateMockData = () => {
  const data = [];
  const now = new Date();
  for (let i = 10; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 5000); // data points every 5 seconds
    data.push({
      time: time.toLocaleTimeString(),
      flow: Math.max(0, parseFloat((Math.random() * 5 + Math.sin(now.getTime() / 50000) * 2).toFixed(2))), // Simulates usage spikes
    });
  }
  return data;
};

// A reusable card component for stats
interface StatCardProps {
  title: string;
  value: string | number; // value can be a string OR a number
  unit: string;
  icon?: string;
}

const StatCard = ({ title, value, unit, icon }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-cyan-200/50 hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-cyan-700 text-md font-medium mb-2">{title}</h3>
        <p className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          {value} <span className="text-lg font-normal text-cyan-600">{unit}</span>
        </p>
      </div>
      {icon && (
        <div className="text-4xl text-cyan-400">
          {icon}
        </div>
      )}
    </div>
  </motion.div>
);

export default function DashboardHome() {
  const [data, setData] = useState(generateMockData());
  const [stats, setStats] = useState({
    totalLiters: 0,
    entries: 0,
    todayUsage: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch real data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get today's stats
        const today = new Date().toISOString().split('T')[0];
        const statsResponse = await waterAPI.getStats({ from: today });
        
        // Get all usages for additional calculations
        const usagesResponse = await waterAPI.getUsages();
        
        const todayUsages = usagesResponse.data.usages.filter((usage: any) => {
          const usageDate = new Date(usage.date).toISOString().split('T')[0];
          return usageDate === today;
        });
        
        const todayTotal = todayUsages.reduce((sum: number, usage: any) => sum + usage.amountLiters, 0);
        
        setStats({
          totalLiters: statsResponse.data.totalLiters || 0,
          entries: statsResponse.data.entries || 0,
          todayUsage: todayTotal
        });
        
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.msg || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Live chart updates (keeping mock data for real-time simulation)
  useEffect(() => {
    const interval = setInterval(() => {
      setData(currentData => {
        const newDataPoint = {
          time: new Date().toLocaleTimeString(),
          flow: Math.max(0, parseFloat((Math.random() * 5 + Math.sin(new Date().getTime() / 50000) * 2).toFixed(2))),
        };
        return [...currentData.slice(1), newDataPoint]; // Keep the array size constant
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-cyan-600 text-xl">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
          <span className="text-2xl">🌊</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Real-time Dashboard
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Current Flow Rate" value={data[data.length - 1].flow} unit="L/min" icon="💧" />
        <StatCard title="Usage Today" value={stats.todayUsage} unit="Liters" icon="📊" />
        <StatCard title="Total Entries" value={stats.entries} unit="Records" icon="📈" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-cyan-200/50 h-96"
      >
        <div className="flex items-center mb-6">
          <span className="text-2xl mr-3">📈</span>
          <h2 className="text-xl font-semibold text-cyan-700">Live Water Usage</h2>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#0891b2" strokeOpacity={0.3} />
            <XAxis dataKey="time" stroke="#0891b2" />
            <YAxis stroke="#0891b2" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                border: '1px solid #0891b2',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="flow" 
              stroke="#0891b2" 
              strokeWidth={3} 
              dot={{ fill: '#0891b2', strokeWidth: 2, r: 4 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}