import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('rx_fashion_user');
    const savedAdmin = localStorage.getItem('rx_fashion_admin');
    const savedOrders = localStorage.getItem('rx_fashion_orders');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedAdmin === 'true') setIsAdmin(true);
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('rx_fashion_user', JSON.stringify(userData));
  };

  const signup = (userData) => {
    setUser(userData);
    localStorage.setItem('rx_fashion_user', JSON.stringify(userData));
  };

  const adminLogin = (email, password) => {
    if (email === 'sharukshaik631@gmail.com' && password === '8790601087') {
      setIsAdmin(true);
      localStorage.setItem('rx_fashion_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('rx_fashion_user');
    localStorage.removeItem('rx_fashion_admin');
  };

  const addOrder = (order) => {
    setOrders(prev => {
      const updated = [order, ...prev];
      localStorage.setItem('rx_fashion_orders', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, orders, login, signup, adminLogin, logout, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
