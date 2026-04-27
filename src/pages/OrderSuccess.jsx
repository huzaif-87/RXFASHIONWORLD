import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Package, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
  const orderNumber = Math.floor(Math.random() * 1000000);

  return (
    <div className="pt-32 pb-24 min-h-screen flex items-center justify-center bg-navy-950">
      <div className="max-w-2xl w-full px-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-gold-500/20"
        >
          <CheckCircle className="w-12 h-12 text-navy-900" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Payment Confirmed</h1>
          <p className="text-gray-400 text-lg mb-12 max-w-md mx-auto">
            Your order <span className="text-gold-500 font-mono font-bold">#AUR-{orderNumber}</span> has been placed successfully and is being prepared for express delivery.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
             <div className="glass p-6 rounded-xl text-left border-l-4 border-gold-500">
                <Package className="w-6 h-6 text-gold-500 mb-4" />
                <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-2">Tracking Status</h3>
                <p className="text-gray-400 text-xs">A confirmation email with your tracking number will be sent within 2 hours.</p>
             </div>
             <div className="glass p-6 rounded-xl text-left">
                <Download className="w-6 h-6 text-gray-400 mb-4" />
                <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-2">Invoice</h3>
                <p className="text-gray-400 text-xs">You can download your digital receipt once the order is dispatched.</p>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/shop" className="btn-gold flex items-center space-x-2 px-10 py-4">
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/" className="text-gray-400 hover:text-white uppercase tracking-widest text-sm font-bold transition-colors">
              Return Home
            </Link>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-3xl -z-10"
        />
      </div>
    </div>
  );
};

export default OrderSuccess;
