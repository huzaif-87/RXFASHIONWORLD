import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SupportChat from './components/SupportChat';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Admin from './pages/Admin';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import { Navigate } from 'react-router-dom';

const ProtectedAdmin = ({ children }) => {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/admin-login" />;
};

const ProtectedUser = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return ( 
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/profile" element={<ProtectedUser><Profile /></ProtectedUser>} />
                <Route path="/orders" element={<ProtectedUser><Orders /></ProtectedUser>} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/admin" element={<ProtectedAdmin><Admin /></ProtectedAdmin>} />
              </Routes>
            </main>
            <Footer />
            <SupportChat />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
