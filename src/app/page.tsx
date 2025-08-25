// app/page.js
'use client'; // We need this for Framer Motion animations

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LandingPage() {
      return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/Flowing Water Background - kaukaa (1080p, h264).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Water-themed gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/70 via-blue-800/60 to-cyan-700/80 z-10"></div>
      
      {/* Animated water particles effect */}
      <div className="absolute inset-0 z-5 overflow-hidden">
        {[...Array(20)].map((_, i) => {
          // Use a consistent seed based on index to avoid hydration mismatch
          const seed = i * 137.5; // Golden angle approximation
          const left = ((seed * 100) % 100).toFixed(2);
          const top = (((seed * 61.8) % 100) + 50) % 100; // Fibonacci-like distribution
          const duration = 3 + (i % 3) * 0.5;
          const delay = (i % 4) * 0.5;
          
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-300/30 rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
              }}
            />
          );
        })}
      </div>

            {/* Content */}
      <div className="relative z-20 text-center text-white p-5 max-w-4xl mx-auto">
        {/* Water drop icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6"
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent"
        >
          Every Drop Counts
        </motion.h1>
                <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="text-lg md:text-2xl max-w-3xl mx-auto mb-8 text-cyan-100 leading-relaxed"
        >
          Understand your water usage. Make a difference. Start saving today with real-time analytics and powerful insights.
        </motion.p>
                <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6, type: 'spring', stiffness: 120 }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(34, 211, 238, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 shadow-2xl border border-cyan-300/30"
              >
                Login
              </motion.button>
            </Link>
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(34, 211, 238, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 shadow-2xl border border-cyan-300/30"
              >
                Sign Up
              </motion.button>
            </Link>
          </div>
          
          {/* Water conservation stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-cyan-300/20">
              <div className="text-cyan-300 text-2xl font-bold">💧 2.5%</div>
              <div className="text-cyan-100 text-sm">Fresh Water on Earth</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-cyan-300/20">
              <div className="text-cyan-300 text-2xl font-bold">🌍 1.1B</div>
              <div className="text-cyan-100 text-sm">People Lack Clean Water</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-cyan-300/20">
              <div className="text-cyan-300 text-2xl font-bold">⚡ 30%</div>
              <div className="text-cyan-100 text-sm">Can Be Saved Daily</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}