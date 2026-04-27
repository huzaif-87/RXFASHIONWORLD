import React, { useState } from 'react';
import { products, weeklySales } from '../data/products';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  LayoutDashboard, Package, PlusCircle, TrendingUp, Settings, 
  LogOut, ToggleLeft, ToggleRight, Trash2, Edit3, Save, X
} from 'lucide-react';
import { motion } from 'framer-motion';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [localProducts, setLocalProducts] = useState(products);
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', category: 'shirts', price: '', inStock: true
  });
  const [editingProduct, setEditingProduct] = useState(null);

  const toggleStock = (id) => {
    setLocalProducts(localProducts.map(p => 
      p.id === id ? { ...p, inStock: !p.inStock } : p
    ));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...newProduct,
      id: Date.now(),
      image: `https://picsum.photos/seed/${Date.now()}/600/800`,
      price: parseInt(newProduct.price),
      sizes: ['M', 'L', 'XL'],
      description: 'Newly added product via dashboard.'
    };
    setLocalProducts([productToAdd, ...localProducts]);
    setIsAdding(false);
    setNewProduct({ name: '', category: 'shirts', price: '', inStock: true });
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    setLocalProducts(localProducts.map(p => 
      p.id === editingProduct.id ? { ...editingProduct, price: parseInt(editingProduct.price) } : p
    ));
    setEditingProduct(null);
  };

  return (
    <div className="pt-20 min-h-screen flex flex-col md:flex-row bg-navy-950">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-navy-900 border-r border-white/5 p-6 space-y-8">
        <div className="flex items-center space-x-3 mb-10 px-2">
          <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center text-navy-900 font-bold">A</div>
          <div>
            <p className="text-white font-bold text-sm">Admin Portal</p>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest">Manager Access</p>
          </div>
        </div>

        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'products' ? 'bg-gold-500/10 text-gold-500' : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            <Package className="w-5 h-5" />
            <span>Product Inventory</span>
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'analytics' ? 'bg-gold-500/10 text-gold-500' : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span>Sales Analytics</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="pt-20">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-serif font-bold text-white mb-2">
              {activeTab === 'products' ? 'Inventory Management' : 'Performance Insights'}
            </h1>
            <p className="text-gray-500 text-sm">Welcome back, Administrator. Here's your overview.</p>
          </div>
          {activeTab === 'products' && (
            <button 
              onClick={() => setIsAdding(true)}
              className="btn-gold flex items-center space-x-2 text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          )}
        </header>

        {activeTab === 'products' ? (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="glass p-6 rounded-xl">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Total SKU</p>
                <p className="text-3xl font-bold text-white">{localProducts.length}</p>
              </div>
              <div className="glass p-6 rounded-xl">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Out of Stock</p>
                <p className="text-3xl font-bold text-red-500">{localProducts.filter(p => !p.inStock).length}</p>
              </div>
              <div className="glass p-6 rounded-xl">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Avg. Price</p>
                <p className="text-3xl font-bold text-gold-500">
                  ₹{Math.round(localProducts.reduce((s, p) => s + p.price, 0) / localProducts.length)}
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="glass rounded-xl overflow-hidden border border-white/5">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-gray-400 text-[10px] uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4 font-bold">Product</th>
                    <th className="px-6 py-4 font-bold">Category</th>
                    <th className="px-6 py-4 font-bold">Price</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {localProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <img src={product.image} className="w-10 h-10 rounded object-cover" alt="" />
                          <span className="text-white font-medium text-sm">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-xs uppercase tracking-widest">{product.category}</td>
                      <td className="px-6 py-4 text-white font-mono">₹{product.price}</td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => toggleStock(product.id)}
                          className={`flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                            product.inStock ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                          }`}
                        >
                          {product.inStock ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                          <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right space-x-4">
                        <button 
                          onClick={() => setEditingProduct(product)}
                          className="text-gray-500 hover:text-gold-500 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setLocalProducts(localProducts.filter(p => p.id !== product.id))}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="glass p-8 rounded-2xl">
            <h3 className="text-xl font-serif font-bold text-white mb-8">Weekly Revenue (₹)</h3>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklySales} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis 
                    dataKey="week" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  />
                  <Tooltip 
                    cursor={{ fill: '#ffffff05' }}
                    contentStyle={{ 
                      backgroundColor: '#112240', 
                      borderColor: '#ffffff10',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="sales" radius={[4, 4, 0, 0]}>
                    {weeklySales.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 3 ? '#D4AF37' : '#1d4ed8'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Add Product Modal */}
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/80 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass max-w-md w-full p-8 rounded-2xl border border-gold-500/20"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif font-bold text-white">New Collection Item</h2>
                <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-white"><X /></button>
              </div>
              <form onSubmit={handleAddProduct} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Product Name</label>
                  <input 
                    required
                    type="text" 
                    value={newProduct.name}
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                    placeholder="Ex: Silk Evening Scarf"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Category</label>
                    <select 
                      value={newProduct.category}
                      onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                      className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                    >
                      <option value="shirts">Shirts</option>
                      <option value="pants">Pants</option>
                      <option value="watches">Watches</option>
                      <option value="wallets">Wallets</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Price (₹)</label>
                    <input 
                      required
                      type="number" 
                      value={newProduct.price}
                      onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                      className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                      placeholder="999"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full btn-gold py-4 flex items-center justify-center space-x-2">
                  <PlusCircle className="w-4 h-4" />
                  <span>Add to Catalog</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* Edit Product Modal */}
        {editingProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/80 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass max-w-md w-full p-8 rounded-2xl border border-gold-500/20"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif font-bold text-white">Edit Catalog Item</h2>
                <button onClick={() => setEditingProduct(null)} className="text-gray-400 hover:text-white"><X /></button>
              </div>
              <form onSubmit={handleUpdateProduct} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Product Name</label>
                  <input 
                    required
                    type="text" 
                    value={editingProduct.name}
                    onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                    className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Category</label>
                    <select 
                      value={editingProduct.category}
                      onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                      className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                    >
                      <option value="shirts">Shirts</option>
                      <option value="pants">Pants</option>
                      <option value="watches">Watches</option>
                      <option value="wallets">Wallets</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Price (₹)</label>
                    <input 
                      required
                      type="number" 
                      value={editingProduct.price}
                      onChange={e => setEditingProduct({...editingProduct, price: e.target.value})}
                      className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full btn-gold py-4 flex items-center justify-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Update Item</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
