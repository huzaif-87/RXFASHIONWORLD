import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="bg-navy-800 p-8 rounded-full inline-block mb-8">
            <ShoppingBag className="w-16 h-16 text-gold-500 opacity-20" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Your bag is empty</h2>
          <p className="text-gray-400 mb-10 max-w-sm mx-auto">Looks like you haven't added anything to your collection yet.</p>
          <Link to="/shop" className="btn-gold px-12 py-4 inline-block">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-white mb-12">Shopping Bag</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={`${item.id}-${item.selectedSize}`}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass p-6 rounded-xl flex items-center gap-6"
                >
                  <div className="w-24 h-32 rounded-lg overflow-hidden bg-navy-800 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-bold">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">
                      Size: <span className="text-gold-500">{item.selectedSize}</span> | {item.category}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4 bg-navy-900 rounded-lg p-1 border border-white/5">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                          className="p-1 text-gray-400 hover:text-white"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-white font-mono w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                          className="p-1 text-gray-400 hover:text-white"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-gold-500 font-bold">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/shop" className="inline-flex items-center space-x-2 text-gray-400 hover:text-gold-500 transition-colors mt-4">
              <ArrowLeft className="w-4 h-4" />
              <span className="uppercase tracking-widest text-xs font-bold">Continue Shopping</span>
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="glass p-8 rounded-xl sticky top-32">
              <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-8 border-b border-white/5 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Shipping</span>
                  <span className="text-green-500">FREE</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Tax</span>
                  <span>₹0</span>
                </div>
                <div className="border-t border-white/5 pt-4 flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span className="text-gold-500">₹{totalPrice}</span>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="w-full btn-gold py-4 uppercase tracking-[0.2em] font-bold text-sm inline-block text-center"
              >
                Proceed to Checkout
              </Link>
              
              <p className="text-center text-gray-500 text-[10px] uppercase mt-6 tracking-widest">
                Secure SSL Encrypted Payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
