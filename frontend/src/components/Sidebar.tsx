// components/Sidebar.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaTachometerAlt, FaChartLine, FaTrophy, FaTasks, FaCog, FaWater } from 'react-icons/fa';

// Let's define our navigation items in an array for cleaner code
const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: FaTachometerAlt },
  { name: 'Insights', href: '/dashboard/insights', icon: FaChartLine },
  { name: 'Leaderboard', href: '/dashboard/leaderboard', icon: FaTrophy },
  { name: 'Goals', href: '/dashboard/goals', icon: FaTasks },
  { name: 'Settings', href: '/dashboard/settings', icon: FaCog },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gradient-to-b from-cyan-900/90 to-blue-900/90 backdrop-blur-md text-white p-4 flex flex-col shadow-2xl border-r border-cyan-300/20">
      <div className="flex items-center mb-10 p-2">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaWater className="text-4xl text-cyan-300" />
        </motion.div>
        <h1 className="text-2xl font-bold ml-3 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
          AquaTrack
        </h1>
      </div>
      <nav className="flex-1">
        <ul>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name} className="mb-3">
                <Link href={item.href}>
                  <motion.div
                    className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                        : 'hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-300/20 text-cyan-100'
                    }`}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className={`mr-4 text-xl ${isActive ? 'text-white' : 'text-cyan-300'}`} />
                    <span className="font-medium">{item.name}</span>
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-auto text-center text-sm text-cyan-200/70 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
        <p>&copy; 2025 AquaTrack</p>
        <p className="text-xs mt-1">💧 Every Drop Counts</p>
      </div>
    </aside>
  );
};

export default Sidebar;