import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Diamond, Search, LogIn, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Diamond className="w-8 h-8 text-gold-500 group-hover:rotate-45 transition-transform duration-500" />
            <span className="text-2xl font-serif font-bold tracking-widest text-white uppercase">RX FASHION WORLD</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium tracking-widest uppercase transition-colors hover:text-gold-500 ${
                  location.pathname === link.path ? 'text-gold-500' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-300 hover:text-gold-500 transition-colors"
            >
              <Search className="w-6 h-6" />
            </button>
            
            <Link 
              to={user ? "/profile" : "/login"} 
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                user ? 'bg-gold-500/10 text-gold-500 border border-gold-500/20' : 'text-gray-300 hover:text-white'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {user ? user.name : 'Sign In'}
              </span>
            </Link>

            <Link to="/cart" className="relative text-gray-300 hover:text-gold-500 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-navy-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
             <Link to="/cart" className="relative text-gray-300">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-navy-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-gold-500"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-medium tracking-widest uppercase text-gray-300 hover:text-gold-500"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to={user ? "/profile" : "/login"}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 text-lg font-medium tracking-widest uppercase text-gray-300 hover:text-gold-500"
              >
                <User className="w-5 h-5" />
                <span>{user ? user.name : 'Sign In'}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy-950/95 backdrop-blur-xl flex flex-col"
          >
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center space-x-2">
                  <Diamond className="w-8 h-8 text-gold-500" />
                  <span className="text-2xl font-serif font-bold tracking-widest text-white uppercase">RX FASHION WORLD</span>
                </div>
                <button 
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }} 
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-10 h-10" />
                </button>
              </div>

              <div className="relative">
                <input
                  autoFocus
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-white/10 py-6 text-4xl md:text-6xl text-white font-serif focus:outline-none focus:border-gold-500 transition-colors placeholder:text-white/10"
                />
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 text-white/10" />
              </div>

              <div className="mt-12">
                <p className="text-gray-500 text-sm uppercase tracking-[0.2em] mb-6">Popular Suggestions</p>
                <div className="flex flex-wrap gap-4">
                  {['Oxford Shirts', 'Linen', 'Chronograph', 'Luxury Wallets'].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-6 py-2 border border-white/10 rounded-full text-white hover:border-gold-500 hover:text-gold-500 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
