// app/dashboard/leaderboard/page.js
'use client';

import { motion } from 'framer-motion';

// Mock Leaderboard Data
const leaderboardData = [
    { rank: 1, name: 'EcoWarrior', saved: 500 },
    { rank: 2, name: 'Jane D.', saved: 450 },
    { rank: 3, name: 'You', saved: 410 }, // Highlight the user
    { rank: 4, name: 'HydroHero', saved: 380 },
];

export default function LeaderboardPage() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">🏆</span>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    Community Leaderboard
                </h1>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-cyan-200/50">
                {leaderboardData.map((user, index) => (
                    <motion.div 
                        key={user.rank} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex justify-between items-center p-4 rounded-xl mb-3 transition-all duration-300 ${
                            user.name === 'You' 
                                ? 'bg-gradient-to-r from-cyan-100 to-blue-100 border-2 border-cyan-300 shadow-lg' 
                                : 'hover:bg-cyan-50/50'
                        }`}
                    >
                        <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                                user.rank === 1 ? 'bg-yellow-400' : 
                                user.rank === 2 ? 'bg-gray-300' : 
                                user.rank === 3 ? 'bg-orange-400' : 'bg-cyan-200'
                            }`}>
                                <span className="text-sm font-bold text-white">#{user.rank}</span>
                            </div>
                            <p className="text-lg font-semibold text-cyan-700">{user.name}</p>
                        </div>
                        <div className="flex items-center">
                            <span className="text-2xl mr-2">💧</span>
                            <p className="text-lg font-semibold text-cyan-600">{user.saved} Liters Saved</p>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-xl border border-cyan-200"
            >
                <p className="text-center text-cyan-700">
                    🌊 Keep up the great work! Every drop saved makes a difference for our planet.
                </p>
            </motion.div>
        </motion.div>
    );
}