import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, CreditCard, Truck, ShieldCheck, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  React.useEffect(() => {
    if (cart.length === 0) {
      navigate('/shop');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      const newOrder = {
        id: Math.floor(Math.random() * 1000000),
        items: [...cart],
        total: totalPrice,
        date: new Date().toISOString(),
        status: 'Processing'
      };
      addOrder(newOrder);
      clearCart();
      navigate('/order-success');
    }, 1500);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/cart" className="flex items-center space-x-2 text-gray-400 hover:text-gold-500 mb-12 transition-colors inline-flex">
          <ChevronLeft className="w-5 h-5" />
          <span className="uppercase tracking-widest text-sm">Return to Bag</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              <section>
                <div className="flex items-center space-x-3 mb-6">
                  <Truck className="w-5 h-5 text-gold-500" />
                  <h2 className="text-xl font-serif font-bold text-white uppercase tracking-widest">Shipping Details</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="alex@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">First Name</label>
                    <input
                      required
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Last Name</label>
                    <input
                      required
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Street Address</label>
                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">City</label>
                    <input
                      required
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Zip Code</label>
                    <input
                      required
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center space-x-3 mb-6">
                  <CreditCard className="w-5 h-5 text-gold-500" />
                  <h2 className="text-xl font-serif font-bold text-white uppercase tracking-widest">Payment Information</h2>
                </div>
                <div className="glass p-6 rounded-xl space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Card Number</label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors pr-12"
                        placeholder="0000 0000 0000 0000"
                      />
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Expiry Date</label>
                      <input
                        required
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">CVV</label>
                      <input
                        required
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <button type="submit" className="w-full btn-gold py-5 text-lg flex items-center justify-center space-x-3">
                <ShieldCheck className="w-6 h-6" />
                <span>Complete Purchase</span>
              </button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:pl-12"
          >
            <div className="glass p-8 rounded-2xl sticky top-32">
              <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-8 border-b border-white/5 pb-4">Your Order</h2>
              
              <div className="space-y-6 max-h-[400px] overflow-y-auto mb-8 pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                    <div className="w-16 h-20 bg-navy-900 rounded overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white text-sm font-medium">{item.name}</h4>
                      <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                      <p className="text-gold-500 text-sm font-bold mt-2">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Shipping (Express)</span>
                  <span className="text-green-500 font-bold uppercase text-[10px] tracking-widest">Complimentary</span>
                </div>
                <div className="flex justify-between text-white font-bold text-xl pt-4 border-t border-white/5 mt-4">
                  <span>Total</span>
                  <span className="text-gold-500">₹{totalPrice}</span>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center space-x-4 opacity-50">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="Paypal" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
