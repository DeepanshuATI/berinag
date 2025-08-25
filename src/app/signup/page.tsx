'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SignupPage() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-800/60 to-cyan-700/80" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-cyan-200/40 p-6"
      >
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-xl mb-3">
            <span className="text-white text-2xl">🌊</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Create your account</h1>
          <p className="text-sm text-gray-600">Join the water savers community</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" name="name" required className="w-full px-3 py-2 rounded-lg border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white/80 text-gray-800 placeholder-gray-500" placeholder="Enter your full name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" name="email" autoComplete="email" required className="w-full px-3 py-2 rounded-lg border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white/80 text-gray-800 placeholder-gray-500" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              placeholder="e.g. +1 555 123 4567"
              className="w-full px-3 py-2 rounded-lg border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white/80 text-gray-800 placeholder-gray-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" name="password" autoComplete="new-password" required className="w-full px-3 py-2 rounded-lg border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white/80 text-gray-800 placeholder-gray-500" placeholder="Create a password" />
          </div>
          <button type="submit" className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-md hover:from-blue-700 hover:to-cyan-600 transition-colors">Sign Up</button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link className="text-cyan-600 hover:text-cyan-700 underline" href="/login">Log in</Link>
        </p>
        <div className="mt-6 pt-4 border-t border-cyan-200/50">
          <Link href="/dashboard">
            <button className="w-full py-2.5 rounded-lg bg-transparent border border-cyan-300 text-gray-700 font-semibold shadow-sm hover:bg-cyan-50 hover:border-cyan-400 transition-colors">
              Continue without logging in
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
