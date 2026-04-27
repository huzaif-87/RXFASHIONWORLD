import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, Settings, LogOut, ChevronRight, Diamond } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-navy-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Diamond className="w-32 h-32 text-gold-500" />
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 relative z-10">
            <div className="w-24 h-24 bg-gold-500 rounded-2xl flex items-center justify-center text-navy-900 text-3xl font-bold font-serif">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-serif font-bold text-white mb-2">{user.name}</h1>
              <p className="text-gray-400 mb-6">{user.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="px-3 py-1 bg-gold-500/10 text-gold-500 rounded-full text-[10px] font-bold uppercase tracking-widest border border-gold-500/20">Platinum Member</span>
                <span className="px-3 py-1 bg-white/5 text-gray-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">Est. 2026</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/orders" className="group p-6 bg-navy-900/50 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-all flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gold-500/10 rounded-xl text-gold-500 group-hover:bg-gold-500 group-hover:text-navy-900 transition-colors">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm uppercase tracking-widest">My Orders</h3>
                  <p className="text-gray-500 text-xs mt-1">View your order history and status</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" />
            </Link>

            <button className="group p-6 bg-navy-900/50 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-all flex items-center justify-between text-left w-full">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-navy-800 rounded-xl text-gray-400 group-hover:bg-gold-500/10 group-hover:text-gold-500 transition-colors">
                  <Settings className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm uppercase tracking-widest">Settings</h3>
                  <p className="text-gray-500 text-xs mt-1">Manage your account preferences</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" />
            </button>
          </div>

          <div className="mt-12 pt-12 border-t border-white/5">
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 text-red-500 hover:text-red-400 transition-colors font-bold uppercase tracking-widest text-xs"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out from Device</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
