
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Fingerprint, ChevronRight, Lock, User, Mail, Phone } from 'lucide-react';
import { useStore } from '../lib/store';
import { AppState } from '../types';

export const LandingPage: React.FC = () => {
  const { setAppState, updateUserProfile, initializeDeck } = useStore();
  const [showContract, setShowContract] = useState(false);
  const [agreed, setAgreed] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSign = () => {
    if (agreed && formData.name && formData.email && formData.phone) {
      updateUserProfile(formData);
      initializeDeck(); // Pick random jobs
      setAppState(AppState.UPLOADING);
    }
  };

  const isFormValid = formData.name.length > 2 && formData.email.includes('@') && formData.phone.length > 5;

  return (
    <div className="relative h-screen w-full flex flex-col justify-center items-center p-6 text-center z-10 overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(#00ff9d 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 space-y-6 max-w-4xl"
      >
        <div className="inline-flex items-center space-x-2 border border-hunter-green/30 px-4 py-1 rounded-full bg-hunter-green/5">
          <span className="w-2 h-2 bg-hunter-green rounded-full animate-pulse"></span>
          <span className="text-xs font-mono text-hunter-green uppercase tracking-widest">Protocol v2.4 Active</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-white leading-tight">
          Don't Search.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-hunter-green via-white to-hunter-purple">
            Let Us Hunt.
          </span>
        </h1>

        <p className="text-hunter-gray-400 max-w-lg mx-auto text-lg font-mono">
          The average job search takes 5 months. Our AI agents infiltrate HR systems to get you hired in 30 days.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowContract(true)}
          className="mt-8 px-10 py-5 bg-hunter-green text-black font-bold text-xl rounded-sm uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,157,0.4)] hover:shadow-[0_0_40px_rgba(0,255,157,0.6)] transition-shadow"
        >
          Initialize Protocol
        </motion.button>
      </motion.div>

      {/* Footer Signature */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 text-[10px] font-mono text-gray-600 tracking-widest uppercase"
      >
        System Architect: Can Tunçer <span className="mx-2 text-hunter-green">///</span> © 2024 All Rights Reserved
      </motion.div>

      {/* Contract Modal */}
      <AnimatePresence>
        {showContract && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-sm p-0 sm:p-4"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-full max-w-lg bg-hunter-gray border-t sm:border border-hunter-gray-800 rounded-t-2xl sm:rounded-xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-6 pb-2 border-b border-white/5">
                <div className="flex items-center space-x-3">
                   <ShieldCheck className="text-hunter-purple w-8 h-8" />
                   <h2 className="text-2xl font-bold text-white">Identity Verification</h2>
                </div>
                <p className="text-xs text-gray-500 font-mono mt-2">SECURE CONNECTION ESTABLISHED</p>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar">
                {/* Form Inputs */}
                <div className="space-y-4 mb-6">
                   <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                      <input 
                        type="text" 
                        placeholder="Full Legal Name" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-black/50 border border-gray-700 rounded p-3 pl-10 text-white focus:border-hunter-green focus:outline-none transition-colors"
                      />
                   </div>
                   <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                      <input 
                        type="email" 
                        placeholder="Private Email Address" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-black/50 border border-gray-700 rounded p-3 pl-10 text-white focus:border-hunter-green focus:outline-none transition-colors"
                      />
                   </div>
                   <div className="relative">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                      <input 
                        type="tel" 
                        placeholder="Mobile Number" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-black/50 border border-gray-700 rounded p-3 pl-10 text-white focus:border-hunter-green focus:outline-none transition-colors"
                      />
                   </div>
                </div>

                {/* Contract Text */}
                <div className="bg-black/50 p-4 rounded-lg mb-6 border border-white/10 font-mono text-xs text-gray-400 h-32 overflow-y-auto">
                  <p className="mb-2 text-white font-bold">PROTOCOL AGREEMENT v1.0</p>
                  <p className="mb-4">
                    I. COMMISSION: USER agrees to remit 25% of their first month's gross salary to JobHunter AI upon successful placement.
                  </p>
                  <p className="mb-4">
                    II. DATA USAGE: USER grants permission for AI Agents to construct synthetic identities based on provided data to bypass corporate firewalls.
                  </p>
                  <p>
                    III. LIABILITY: JobHunter AI is not responsible for detection by corporate counter-intelligence units.
                  </p>
                </div>

                <label className="flex items-start space-x-3 mb-2 cursor-pointer group">
                  <div className={`w-6 h-6 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${agreed ? 'bg-hunter-green border-hunter-green' : 'border-gray-600 group-hover:border-hunter-green'}`}>
                    {agreed && <Fingerprint className="w-4 h-4 text-black" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={agreed}
                    onChange={() => setAgreed(!agreed)}
                  />
                  <span className="text-sm text-gray-400 select-none">
                    I accept the 25% Commission Structure.
                  </span>
                </label>
              </div>

              {/* Footer Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={handleSign}
                  disabled={!agreed || !isFormValid}
                  className={`w-full py-4 rounded font-bold text-lg uppercase tracking-widest flex items-center justify-center space-x-2 transition-all
                    ${agreed && isFormValid
                      ? 'bg-hunter-purple text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:bg-hunter-purple/90' 
                      : 'bg-gray-800 text-gray-600 cursor-not-allowed'}`}
                >
                  <span>Sign & Hunt</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="flex items-center justify-center mt-4 space-x-1 text-xs text-gray-600">
                  <Lock className="w-3 h-3" />
                  <span>256-bit Encrypted. No Credit Card Required.</span>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
