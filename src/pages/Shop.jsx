import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['all', 'shirts', 'pants', 'watches', 'rings', 'wallets'];
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return 0; // newest/default
      });
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-white mb-4">The Collection</h1>
          <p className="text-gray-400">Discover our full range of premium menswear and accessories.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-10">
            <div>
              <div className="flex items-center space-x-2 text-gold-500 mb-6">
                <Search className="w-5 h-5" />
                <h3 className="font-bold uppercase tracking-widest text-sm">Search</h3>
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-navy-800 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center space-x-2 text-gold-500 mb-6">
                <Filter className="w-5 h-5" />
                <h3 className="font-bold uppercase tracking-widest text-sm">Categories</h3>
              </div>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left text-sm uppercase tracking-widest transition-colors ${
                      selectedCategory === cat ? 'text-gold-500 font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>


          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-400 text-sm">Showing {filteredProducts.length} results</p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-navy-800 border border-white/10 rounded-md px-4 py-2 text-white text-sm focus:outline-none focus:border-gold-500"
              >
                <option value="newest">Sort by: Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 glass rounded-xl">
                <p className="text-gray-400 text-lg">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="mt-6 text-gold-500 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;
