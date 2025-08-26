// app/dashboard/insights/page.js
'use client';

import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

// Mock data for historical usage
const weeklyData = [
  { name: 'Last Wk', usage: 1120 },
  { name: 'This Wk', usage: 980 },
];

const breakdownData = [
  { name: 'Bathroom', value: 400 },
  { name: 'Kitchen', value: 300 },
  { name: 'Laundry', value: 200 },
  { name: 'Outdoor', value: 100 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function InsightsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
          <span className="text-2xl">📊</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Usage Insights
        </h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-cyan-200/50 h-96">
          <div className="flex items-center mb-6">
            <span className="text-2xl mr-3">📈</span>
            <h2 className="text-xl font-semibold text-cyan-700">Weekly Comparison</h2>
          </div>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl">📊</span>
              </div>
              <p className="text-cyan-600">This chart will compare your water usage week over week.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-cyan-200/50 h-96">
          <div className="flex items-center mb-6">
            <span className="text-2xl mr-3">🥧</span>
            <h2 className="text-xl font-semibold text-cyan-700">Usage Breakdown</h2>
          </div>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl">🥧</span>
              </div>
              <p className="text-cyan-600">This chart will show where your water is being used the most.</p>
            </div>
          </div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 bg-gradient-to-r from-cyan-50 to-blue-50 border-l-4 border-cyan-500 text-cyan-800 p-6 rounded-xl shadow-lg"
      >
        <div className="flex items-start">
          <span className="text-3xl mr-4">💡</span>
          <div>
            <h3 className="font-bold text-lg mb-2">Smart Tip</h3>
            <p>Your usage this week is 12% lower than last week! Keep up the great work. Try shortening your shower by 2 minutes to save even more.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}