import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-lg bg-navy-800 aspect-[3/4] card-hover">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-navy-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          <Link
            to={`/product/${product.id}`}
            className="p-3 bg-white text-navy-900 rounded-full hover:bg-gold-500 hover:text-white transition-colors duration-300"
          >
            <Eye className="w-5 h-5" />
          </Link>
          <button
            onClick={() => addToCart(product, product.sizes[0])}
            disabled={!product.inStock}
            className={`p-3 rounded-full transition-colors duration-300 ${
              product.inStock 
                ? 'bg-gold-500 text-white hover:bg-gold-600' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        {!product.inStock && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">
            Out of Stock
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-gray-200 font-medium group-hover:text-gold-500 transition-colors">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="text-gray-400 text-sm uppercase tracking-widest mt-1">{product.category}</p>
        </div>
        <p className="text-gold-500 font-bold">₹{product.price}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
