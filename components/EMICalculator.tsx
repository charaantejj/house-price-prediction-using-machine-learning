
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calculator, IndianRupee } from 'lucide-react';

interface EMICalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  principal: number;
}

const EMICalculator: React.FC<EMICalculatorProps> = ({ isOpen, onClose, principal }) => {
  const [amount, setAmount] = useState(principal);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    setAmount(principal);
  }, [principal]);

  useEffect(() => {
    const r = rate / 12 / 100;
    const n = tenure * 12;
    const emiValue = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmi(Math.round(emiValue) || 0);
  }, [amount, rate, tenure]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl p-10 overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors">
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#B6FF3B]/20 rounded-xl flex items-center justify-center">
                <Calculator className="text-[#064E3B] w-5 h-5" />
              </div>
              <h2 className="text-3xl font-black serif italic text-slate-900">Loan Estimator</h2>
            </div>

            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Loan Amount</label>
                <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <IndianRupee className="w-5 h-5 text-slate-400" />
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="bg-transparent text-xl font-bold text-slate-900 w-full focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Interest Rate (%)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={rate} 
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xl font-bold text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Tenure (Years)</label>
                  <input 
                    type="number" 
                    value={tenure} 
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xl font-bold text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="bg-[#064E3B] rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-2">Estimated Monthly EMI</p>
                <div className="text-5xl font-black serif italic">
                  ₹{emi.toLocaleString('en-IN')}
                </div>
              </div>

              <button className="w-full bg-slate-900 text-white rounded-2xl py-4 font-bold hover:bg-slate-800 transition-all">
                Check Eligibility
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EMICalculator;
