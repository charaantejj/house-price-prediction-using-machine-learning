
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, Users2, Award } from 'lucide-react';

interface AboutSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl bg-white h-full shadow-2xl p-12 md:p-20 overflow-y-auto"
          >
            <button onClick={onClose} className="absolute top-10 right-10 text-slate-400 hover:text-slate-900 transition-colors">
              <X className="w-8 h-8" />
            </button>

            <div className="space-y-16">
              <div className="space-y-6">
                <h2 className="text-6xl font-black serif italic text-slate-900 leading-none">Redefining Real Estate Intelligence</h2>
                <p className="text-xl text-slate-500 font-medium leading-relaxed">
                  Livest is more than a valuation platform. We are a team of data scientists and real estate veterans dedicated to bringing clarity to the South Indian property market.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-10">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-slate-900">Modern Infrastructure</h4>
                    <p className="text-slate-500 leading-relaxed">Our proprietary AI tracks over 200 variables in the IT corridors of Bangalore, Hyderabad, and Chennai.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0">
                    <Users2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-slate-900">Expert Curation</h4>
                    <p className="text-slate-500 leading-relaxed">Every property listed undergoes a rigorous quality check by our on-ground property managers.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-slate-900">Award Winning Yields</h4>
                    <p className="text-slate-500 leading-relaxed">Voted the #1 Real Estate Investment Platform in the region for three consecutive years.</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-[2.5rem] p-12 text-center space-y-6">
                <h3 className="text-3xl font-black serif italic text-slate-900">Join the Future</h3>
                <p className="text-slate-500">Become a member today and get exclusive access to off-market listings.</p>
                <button className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold hover:bg-slate-800 transition-all">
                  Join now
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AboutSection;
