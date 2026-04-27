import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ChevronLeft, ShoppingCart, Star, Share2, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === parseInt(id));

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [isAdded, setIsAdded] = useState(false);
  const [mainImage, setMainImage] = useState(product?.image);

  if (!product) {
    return (
      <div className="pt-32 text-center text-white">
        <h2 className="text-2xl">Product not found</h2>
        <Link to="/shop" className="text-gold-500 mt-4 block">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-400 hover:text-gold-500 mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="uppercase tracking-widest text-sm">Back</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="rounded-xl overflow-hidden bg-navy-800 aspect-[4/5] group relative cursor-crosshair">
              <motion.img
                key={mainImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
            <div className="grid grid-cols-4 gap-4">
               {[0, 1, 2, 3].map(i => {
                 const imgUrl = i === 0 ? product.image : `https://picsum.photos/seed/${product.id + i}/600/800`;
                 return (
                   <div 
                     key={i} 
                     onClick={() => setMainImage(imgUrl)}
                     className={`aspect-square rounded-md overflow-hidden bg-navy-800 transition-all cursor-pointer border-2 ${
                       mainImage === imgUrl ? 'border-gold-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                     }`}
                   >
                      <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                   </div>
                 );
               })}
            </div>
          </motion.div>

          {/* Product Info */}
          <div className="flex flex-col">
            <p className="text-gold-500 font-bold uppercase tracking-[0.3em] mb-4">{product.category}</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex text-gold-500">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-gray-400 text-sm">(24 Customer Reviews)</span>
            </div>

            <p className="text-3xl font-bold text-white mb-8">₹{product.price}</p>
            
            <p className="text-gray-300 leading-relaxed mb-10 text-lg">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-10">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center border rounded-md transition-all duration-300 font-medium ${
                      selectedSize === size
                        ? 'border-gold-500 bg-gold-500 text-navy-900'
                        : 'border-white/10 text-gray-400 hover:border-gold-500/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-4 mb-10">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center space-x-3 py-4 rounded-md font-bold uppercase tracking-widest transition-all ${
                  isAdded 
                    ? 'bg-green-600 text-white' 
                    : product.inStock 
                      ? 'btn-gold' 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isAdded ? (
                  <span>Added!</span>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>{product.inStock ? 'Add to Bag' : 'Out of Stock'}</span>
                  </>
                )}
              </button>
              <button className="p-4 border border-white/10 rounded-md text-gray-400 hover:text-red-500 hover:border-red-500 transition-all">
                <Heart className="w-6 h-6" />
              </button>
              <button className="p-4 border border-white/10 rounded-md text-gray-400 hover:text-gold-500 hover:border-gold-500 transition-all">
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            {/* Extra Info */}
            <div className="border-t border-white/5 pt-8 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2">Details</h4>
                <ul className="text-gray-400 text-xs space-y-2 list-disc list-inside">
                  <li>Premium Cotton Blend</li>
                  <li>Modern Tailored Fit</li>
                  <li>Dry Clean Only</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2">Shipping</h4>
                <p className="text-gray-400 text-xs">Free express delivery on orders over ₹2000. Returns within 30 days.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
