import React from 'react';
import { Diamond, Mail, Phone, MapPin, Camera } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Diamond className="w-6 h-6 text-gold-500" />
            <span className="text-xl font-serif font-bold tracking-widest text-white uppercase">RX FASHION WORLD</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Defining modern masculine elegance through curated craftsmanship and timeless design.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-gold-500"><Camera className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-gold-500"><Camera className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-gold-500"><Camera className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6">Explore</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="#" className="hover:text-gold-500 transition-colors">Collections</a></li>
            <li><a href="#" className="hover:text-gold-500 transition-colors">New Arrivals</a></li>
            <li><a href="#" className="hover:text-gold-500 transition-colors">Best Sellers</a></li>
            <li><a href="#" className="hover:text-gold-500 transition-colors">Accessories</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6">Support</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="#" className="hover:text-gold-500 transition-colors">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-gold-500 transition-colors">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:text-gold-500 transition-colors">Size Guide</a></li>
            <li><a href="#" className="hover:text-gold-500 transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6">Get in Touch</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-gold-500" />
              <span>concierge@rxfashion.com</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-gold-500" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center space-x-3 text-sm">
              <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
              <span>123 Luxury Lane, Fashion District, Mumbai</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/5 text-center text-gray-500 text-xs tracking-widest uppercase">
        © 2026 RX FASHION WORLD. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
