import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ArrowLeft, ChevronRight, Clock, MapPin } from 'lucide-react';

const Orders = () => {
  const { orders, user } = useAuth();

  if (!user) return null;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-navy-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <Link to="/profile" className="flex items-center space-x-2 text-gray-500 hover:text-gold-500 mb-4 transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="uppercase tracking-widest text-[10px] font-bold">Back to Profile</span>
            </Link>
            <h1 className="text-4xl font-serif font-bold text-white">My Orders</h1>
          </div>
          <div className="bg-navy-900 p-4 rounded-2xl border border-white/5">
             <Package className="w-8 h-8 text-gold-500 opacity-20" />
          </div>
        </div>

        {orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass p-20 rounded-3xl text-center border border-dashed border-white/10"
          >
            <div className="w-20 h-20 bg-navy-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-xl font-serif text-white mb-2">No orders found</h3>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto text-sm">You haven't made any purchases yet. Your future orders will appear here.</p>
            <Link to="/shop" className="btn-gold inline-block px-10">Explore Collection</Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 md:p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-all group"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
                  <div className="flex gap-6">
                    <div className="w-20 h-24 bg-navy-900 rounded-lg overflow-hidden shrink-0">
                      <img src={order.items[0].image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <span className="text-xs font-bold text-gold-500 uppercase tracking-widest">#{order.id}</span>
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Processing</span>
                      </div>
                      <h3 className="text-white font-bold text-lg mb-2">
                        {order.items.length === 1 ? order.items[0].name : `${order.items[0].name} + ${order.items.length - 1} more`}
                      </h3>
                      <div className="flex items-center text-gray-500 text-xs space-x-4">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date().toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><Package className="w-3 h-3" /> {order.items.length} Items</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end justify-between">
                    <p className="text-2xl font-bold text-white">₹{order.total}</p>
                    <button className="text-[10px] text-gold-500 font-bold uppercase tracking-widest border border-gold-500/20 px-4 py-2 rounded-lg hover:bg-gold-500 hover:text-navy-900 transition-all">
                      View Details
                    </button>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/5 flex flex-wrap gap-6 items-center justify-between">
                   <div className="flex items-center space-x-2 text-[10px] text-gray-500 uppercase tracking-widest">
                      <MapPin className="w-3 h-3 text-gold-500" />
                      <span>Mumbai, India</span>
                   </div>
                   <div className="flex -space-x-2">
                      {order.items.slice(0, 3).map((item, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-navy-950 overflow-hidden bg-navy-800">
                          <img src={item.image} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-8 h-8 rounded-full border-2 border-navy-950 bg-navy-800 flex items-center justify-center text-[10px] text-white font-bold">
                          +{order.items.length - 3}
                        </div>
                      )}
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
