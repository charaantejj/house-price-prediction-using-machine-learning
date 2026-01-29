
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import PredictorForm from './components/PredictorForm';
import ResultsDisplay from './components/ResultsDisplay';
import EMICalculator from './components/EMICalculator';
import ContactForm from './components/ContactForm';
import AboutSection from './components/AboutSection';
import { HouseInputs, PredictionResult } from './types';
import { predictHousePrice } from './services/priceEngine';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  
  // UI States
  const [isLoanOpen, setIsLoanOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | undefined>();

  const handlePrediction = useCallback(async (data: HouseInputs) => {
    setIsLoading(true);
    setResult(null);
    try {
      const prediction = await predictHousePrice(data);
      setResult(prediction);
      // Smooth scroll to results
      setTimeout(() => {
        const resultEl = document.getElementById('valuation-result');
        if (resultEl) {
           resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
           window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        }
      }, 100);
    } catch (error) {
      console.error('Prediction failed', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleNavClick = (section: 'home' | 'about' | 'loan' | 'contact') => {
    switch(section) {
      case 'home':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'about':
        setIsAboutOpen(true);
        break;
      case 'loan':
        setIsLoanOpen(true);
        break;
      case 'contact':
        setSelectedProperty(undefined);
        setIsContactOpen(true);
        break;
    }
  };

  const handleContactAgent = (propName?: string) => {
    setSelectedProperty(propName);
    setIsContactOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col pt-32 pb-24">
      <Header onNavClick={handleNavClick} />

      <main className="flex-1 space-y-32">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left space-y-6 max-w-4xl"
          >
            <h1 className="text-7xl md:text-9xl font-black text-[#064E3B] leading-[0.85] tracking-tighter serif italic">
              Invest in property,<br/>build your future
            </h1>
            <p className="text-lg md:text-2xl text-slate-500 font-medium max-w-2xl leading-relaxed italic serif">
              Take control of your financial future by diversifying your portfolio with secure and high-yield real estate properties in South India.
            </p>
          </motion.div>

          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-[600px] w-full rounded-[4rem] overflow-hidden card-shadow border-[12px] border-white relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80" 
                alt="Luxury Estate" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B]/30 to-transparent"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-12 left-0 right-0 flex justify-center z-10 px-6"
            >
              <PredictorForm onPredict={handlePrediction} isLoading={isLoading} />
            </motion.div>
          </div>
        </section>

        {/* Dynamic Content Section */}
        <div className="pt-20" id="valuation-result">
          <AnimatePresence mode="wait">
            {result && !isLoading && (
              <ResultsDisplay 
                key="results"
                result={result} 
                onContactAgent={handleContactAgent}
                onCheckEMI={() => setIsLoanOpen(true)}
              />
            )}

            {isLoading && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center py-40 space-y-8"
              >
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-[#B6FF3B]/30 border-t-[#064E3B] rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-[#B6FF3B] rounded-lg animate-pulse"></div>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-[#064E3B] font-black italic serif text-4xl">Synthesizing Market Data</p>
                  <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Analyzing 2026 Projections</p>
                </div>
              </motion.div>
            )}

            {!result && !isLoading && (
              <motion.section 
                key="stats"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left py-24 border-t border-slate-100 mt-20"
              >
                {[
                  { label: 'Total Investments', val: '$500M+' },
                  { label: 'Properties Managed', val: '10K+' },
                  { label: 'Registered Members', val: '100K+' },
                  { label: 'Avg Annual ROI', val: '8-10%' }
                ].map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-5xl font-black text-slate-900 serif italic tracking-tighter">{stat.val}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="pt-32 pb-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 border-t border-slate-200 pt-20 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3 grayscale opacity-40">
            <div className="w-8 h-8 bg-slate-900 rounded-lg"></div>
            <span className="text-3xl font-black tracking-tighter text-slate-900 italic serif">livest</span>
          </div>
          <div className="flex flex-wrap justify-center gap-12 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <button onClick={() => handleNavClick('home')} className="hover:text-slate-900 transition-colors">Properties</button>
            <button onClick={() => setIsLoanOpen(true)} className="hover:text-slate-900 transition-colors">Yield Intelligence</button>
            <button onClick={() => setIsAboutOpen(true)} className="hover:text-slate-900 transition-colors">Privacy Neural</button>
          </div>
          <div className="text-[11px] font-bold text-slate-400 italic serif">
            © 2026 Livest Real Estate Systems
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <EMICalculator 
        isOpen={isLoanOpen} 
        onClose={() => setIsLoanOpen(false)} 
        principal={result?.estimatedPrice || 10000000} 
      />
      <ContactForm 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
        propertyName={selectedProperty} 
      />
      <AboutSection 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)} 
      />
    </div>
  );
};

export default App;
