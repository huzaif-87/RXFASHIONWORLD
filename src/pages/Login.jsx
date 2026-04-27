import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Camera } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login({ email: formData.email, name: formData.email.split('@')[0] });
    } else {
      signup({ name: formData.name, email: formData.email });
    }
    navigate('/profile');
  };

  return (
    <div className="pt-32 pb-24 min-h-screen flex items-center justify-center bg-navy-950 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass max-w-md w-full p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50"></div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-400 text-sm">
            {isLogin ? 'Access your personal collection and orders.' : 'Join the RX FASHION WORLD inner circle today.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">Full Name</label>
              <div className="relative">
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-white focus:outline-none focus:border-gold-500 transition-all"
                  placeholder="James Bond"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">Email Address</label>
            <div className="relative">
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-white focus:outline-none focus:border-gold-500 transition-all"
                placeholder="james@rxfashion.com"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">Password</label>
            <div className="relative">
              <input 
                required
                type="password" 
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-white focus:outline-none focus:border-gold-500 transition-all"
                placeholder="••••••••"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            </div>
            {isLogin && (
              <button type="button" className="text-[10px] text-gold-500 uppercase font-bold tracking-widest mt-2 px-1 hover:text-white transition-colors">
                Forgot Password?
              </button>
            )}
          </div>

          <button type="submit" className="w-full btn-gold py-4 flex items-center justify-center space-x-2 group">
            <span>{isLogin ? 'Sign In' : 'Join Now'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-10">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest"><span className="bg-navy-950 px-4 text-gray-500">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
              <Camera className="w-4 h-4 text-white" />
              <span className="text-xs text-white font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center space-x-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
              <Camera className="w-4 h-4 text-white" />
              <span className="text-xs text-white font-medium">Github</span>
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-400">
          {isLogin ? "Don't have an account?" : "Already a member?"}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-gold-500 font-bold hover:underline"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
