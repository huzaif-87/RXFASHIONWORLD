import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot, Diamond } from 'lucide-react';

const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Welcome to RX Concierge. How may I assist you with your sartorial needs today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const quickActions = [
    { label: 'Track Order', value: 'track' },
    { label: 'Size Guide', value: 'size' },
    { label: 'Store Locations', value: 'location' },
    { label: 'Offers', value: 'offers' }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isTyping]);

  const getBotResponse = (text) => {
    const input = text.toLowerCase();
    if (input.includes('track') || input.includes('order')) 
      return "I can help with that. Please enter your order number starting with #RX.";
    if (input.includes('size')) 
      return "Our garments follow a modern tailored fit. You can find a detailed size chart on each product page under the 'Details' section.";
    if (input.includes('location')) 
      return "We have flagship stores in Mumbai, Delhi, and Bangalore. Would you like the specific address for one?";
    if (input.includes('offer') || input.includes('promo')) 
      return "Current promotion: Use code RXFIRST for 15% off your first luxury purchase!";
    if (input.includes('hello') || input.includes('hi')) 
      return "Hello! I'm your RX Fashion concierge. How can I make your shopping experience more refined today?";
    
    return "I've passed your query to our elite style consultants. They will respond via email shortly.";
  };

  const handleSend = (text) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), type: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const botMsg = { id: Date.now() + 1, type: 'bot', text: getBotResponse(text) };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-gold-500/30 text-navy-900"
      >
        <MessageSquare className="w-8 h-8" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-navy-950"></span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100, x: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100, x: 100 }}
            className="fixed bottom-28 right-8 z-[101] w-[400px] max-w-[calc(100vw-4rem)] h-[600px] max-h-[calc(100vh-10rem)] glass rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-navy-900/80 p-6 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gold-500/10 rounded-xl flex items-center justify-center text-gold-500">
                  <Diamond className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-serif font-bold tracking-wider">RX CONCIERGE</h3>
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Always Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-navy-950/20"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-3 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.type === 'user' ? 'bg-gold-500 text-navy-900' : 'bg-navy-800 text-gold-500'}`}>
                      {msg.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${msg.type === 'user' ? 'bg-gold-500 text-navy-900 font-medium rounded-tr-none' : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/5'}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 flex flex-wrap gap-2 bg-navy-900/30">
              {quickActions.map(action => (
                <button
                  key={action.value}
                  onClick={() => handleSend(action.label)}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400 font-bold uppercase tracking-widest hover:bg-gold-500/10 hover:text-gold-500 hover:border-gold-500/30 transition-all"
                >
                  {action.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="p-4 bg-navy-900/50 border-t border-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask RX Concierge..."
                  className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-4 pr-14 text-white focus:outline-none focus:border-gold-500 transition-all text-sm"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center text-navy-900 hover:bg-gold-600 transition-colors shadow-lg">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SupportChat;
