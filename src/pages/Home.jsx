import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Truck } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const Home = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/hero/1920/1080"
            alt="Hero"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-gold-500 font-bold uppercase tracking-[0.3em] mb-4 block">New Collection 2026</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              Elegance <br /> <span className="text-gold-500">Redefined</span>
            </h1>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed max-w-lg">
              Discover the pinnacle of men's fashion. From bespoke tailoring to premium accessories, elevate your wardrobe with RX FASHION WORLD.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/shop" className="btn-gold flex items-center justify-center space-x-2">
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/shop" className="px-8 py-2 border border-white/30 text-white font-semibold rounded-md hover:bg-white hover:text-navy-900 transition-all duration-300 flex items-center justify-center">
                View Lookbook
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-navy-700 rounded-full text-gold-500">
              <Star className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Premium Quality</h3>
            <p className="text-gray-400 text-sm">Hand-selected fabrics and meticulous attention to detail in every stitch.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-navy-700 rounded-full text-gold-500">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Secure Shopping</h3>
            <p className="text-gray-400 text-sm">Your data and transactions are protected by industry-leading security.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-navy-700 rounded-full text-gold-500">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Global Delivery</h3>
            <p className="text-gray-400 text-sm">Express shipping to over 50 countries with real-time tracking.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-gold-500 font-bold uppercase tracking-widest mb-2">Curated Picks</h2>
              <h3 className="text-4xl font-serif font-bold text-white">Featured Arrivals</h3>
            </div>
            <Link to="/shop" className="text-gold-500 font-medium flex items-center space-x-2 hover:translate-x-2 transition-transform">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gold-500 skew-y-3 origin-right translate-y-12 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-navy-950 py-20 rounded-2xl shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Join the Inner Circle</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
            Subscribe to receive exclusive access to new collections, private sales, and sartorial advice.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-navy-800 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold-500"
            />
            <button type="button" className="btn-gold whitespace-nowrap">Sign Up</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
