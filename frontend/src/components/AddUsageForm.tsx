'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { waterAPI } from '../services/api';

interface AddUsageFormProps {
  onUsageAdded: () => void;
}

export default function AddUsageForm({ onUsageAdded }: AddUsageFormProps) {
  const [formData, setFormData] = useState({
    amountLiters: '',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amountLiters || parseFloat(formData.amountLiters) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      await waterAPI.addUsage({
        amountLiters: parseFloat(formData.amountLiters),
        notes: formData.notes || undefined,
        date: formData.date
      });

      setSuccess('Water usage added successfully!');
      setFormData({
        amountLiters: '',
        notes: '',
        date: new Date().toISOString().split('T')[0]
      });
      
      onUsageAdded(); // Refresh parent component data
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
      
    } catch (err: any) {
      console.error('Error adding usage:', err);
      setError(err.response?.data?.msg || 'Failed to add usage');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-cyan-200/50"
    >
      <h2 className="text-2xl font-bold text-cyan-700 mb-6 flex items-center">
        <span className="text-3xl mr-3">💧</span>
        Add Water Usage
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amountLiters" className="block text-sm font-medium text-cyan-700 mb-2">
            Amount (Liters)
          </label>
          <input
            type="number"
            id="amountLiters"
            step="0.1"
            min="0"
            value={formData.amountLiters}
            onChange={(e) => setFormData({ ...formData, amountLiters: e.target.value })}
            className="w-full px-4 py-2 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Enter amount in liters"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-cyan-700 mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-cyan-700 mb-2">
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-2 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Add any notes about this usage..."
            rows={3}
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-600 text-sm bg-green-50 p-3 rounded-lg">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add Usage'}
        </button>
      </form>
    </motion.div>
  );
}
