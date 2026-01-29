
import React from 'react';
import { motion } from 'framer-motion';
import { PredictionResult } from '../types';
import { CheckCircle, Shield, TrendingUp, Compass } from 'lucide-react';
import PropertyGrid from './PropertyGrid';

interface ResultsDisplayProps {
  result: PredictionResult;
  onContactAgent: (propName?: string) => void;
  onCheckEMI: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onContactAgent, onCheckEMI }) => {
  const formatINR = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* Advantage Grid Section (Lifestyle) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-lg"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 serif leading-tight mb-6 italic">
              Your real estate <br/> investment advantage
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              From curated properties to end-to-end management, we simplify investing so you can focus on growing your wealth.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
            {[
              { icon: TrendingUp, label: 'Steady returns', desc: 'Earn reliable returns without day-to-day involvement.' },
              { icon: Shield, label: 'Reliable growth', desc: 'Backed by data and expert analysis for long-term success.' },
              { icon: Compass, label: 'Clear insights', desc: 'Track your investment with real-time AI-powered insights.' }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[2.5rem] card-shadow border border-slate-50"
              >
                <div className="w-12 h-12 bg-[#B6FF3B]/20 rounded-2xl flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-[#064E3B]" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{item.label}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Valuation Highlight */}
      <section className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-[4rem] p-12 md:p-20 card-shadow border border-slate-50 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#B6FF3B]/10 rounded-full -mr-48 -mt-48 blur-[100px]"></div>
          
          <div className="space-y-8 relative z-10 w-full lg:w-auto">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-[#B6FF3B]/20 rounded-full text-[10px] font-black text-[#064E3B] tracking-widest uppercase inline-flex">
              <CheckCircle className="w-4 h-4" /> AI Valuation Certified
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-400 serif italic">Projected Valuation 2026</h3>
              <div className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter serif italic leading-none">
                {formatINR(result.estimatedPrice)}
              </div>
            </div>
            <div className="flex gap-12 pt-8 border-t border-slate-100">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Scale Value</p>
                <p className="text-2xl font-bold text-slate-800 italic serif">{formatINR(result.pricePerSqft)} / sqft</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Confidence</p>
                <p className="text-2xl font-bold text-slate-800 italic serif">{(result.confidenceScore * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 w-full lg:w-96 relative z-10">
             <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100 space-y-6">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Lifestyle Match Index</p>
                <div className="space-y-6">
                  {Object.entries(result.lifestyle).filter(([k]) => k !== 'overall').map(([key, val]) => (
                    <div key={key}>
                      <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-2 capitalize tracking-tight">
                        <span>{key} Analysis</span>
                        <span>{val}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${val}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-[#064E3B]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
             </div>
             <div className="flex gap-4">
                <button 
                  onClick={onCheckEMI}
                  className="flex-1 bg-white border border-slate-200 text-slate-900 font-bold py-5 rounded-full text-sm hover:bg-slate-50 transition-all"
                >
                  Loan EMI
                </button>
                <button 
                  onClick={() => onContactAgent()}
                  className="flex-1 bg-[#B6FF3B] text-[#064E3B] font-black py-5 rounded-full text-sm hover:brightness-95 transition-all shadow-xl shadow-[#B6FF3B]/30"
                >
                  Invest Now
                </button>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Expanded Property Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-black text-slate-900 serif italic"
          >
            Discover our top investment properties
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 font-medium"
          >
            Explore handpicked real estate opportunities with high growth potential.
          </motion.p>
        </div>

        <PropertyGrid 
          properties={result.comparables} 
          onContact={onContactAgent} 
        />
        
        <div className="mt-20 flex justify-center">
          <button className="flex items-center gap-3 bg-white border border-slate-200 px-10 py-5 rounded-full text-sm font-bold text-slate-900 hover:bg-slate-50 transition-all group">
            Load More Listings
            <TrendingUp className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </section>

    </div>
  );
};

export default ResultsDisplay;
