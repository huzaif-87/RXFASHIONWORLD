import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = adminLogin(formData.email, formData.password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid administrative credentials.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen flex items-center justify-center bg-navy-950 px-4 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[120px] -z-10"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass max-w-md w-full p-10 rounded-3xl border border-red-500/10 relative"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 border border-red-500/20">
            <ShieldAlert className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mb-2 uppercase tracking-widest">Admin Access</h1>
          <p className="text-gray-500 text-xs uppercase tracking-[0.2em]">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">Admin Email</label>
            <div className="relative">
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-navy-900 border border-white/5 rounded-xl px-4 py-4 pl-12 text-white focus:outline-none focus:border-red-500/50 transition-all font-mono text-sm"
                placeholder="admin@rxfashion.com"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">Security Code</label>
            <div className="relative">
              <input 
                required
                type="password" 
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full bg-navy-900 border border-white/5 rounded-xl px-4 py-4 pl-12 text-white focus:outline-none focus:border-red-500/50 transition-all font-mono text-sm"
                placeholder="••••••••"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center space-x-2 text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20"
              >
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-3 transition-all active:scale-[0.98] shadow-lg shadow-red-600/20">
            <LogIn className="w-5 h-5" />
            <span className="uppercase tracking-[0.2em] text-sm">Verify & Enter</span>
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest leading-relaxed">
            All access attempts are logged and monitored. <br /> Unauthorized entry is strictly prohibited.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
