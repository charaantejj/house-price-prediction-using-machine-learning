
import React, { useState } from 'react';
import { HouseInputs } from '../types';
import { SOUTH_INDIA_LOCALITIES } from '../constants';
import { Search, MapPin, Home, SlidersHorizontal, Plus, Minus } from 'lucide-react';

interface PredictorFormProps {
  onPredict: (data: HouseInputs) => void;
  isLoading: boolean;
}

const PredictorForm: React.FC<PredictorFormProps> = ({ onPredict, isLoading }) => {
  const [formData, setFormData] = useState<HouseInputs>({
    sqft: 2400,
    bhk: 3,
    bathrooms: 3,
    neighborhood: SOUTH_INDIA_LOCALITIES[9].name // Default to Tellapur
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center">
      <div className="glass-search rounded-full p-2 pl-6 flex flex-col md:flex-row items-center w-full max-w-6xl card-shadow border border-white gap-0">
        
        {/* LOCALITY SECTION - Using min-w-0 to prevent flex item truncation */}
        <div className="flex-1 min-w-0 w-full py-2 pr-4 md:pr-6">
          <label className="text-[10px] md:text-[11px] font-black text-[#94A3B8] uppercase tracking-[0.1em] block mb-1 ml-6">
            Locality
          </label>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#94A3B8] shrink-0" />
            <select 
              value={formData.neighborhood}
              onChange={(e) => setFormData({...formData, neighborhood: e.target.value})}
              className="bg-transparent text-[14px] md:text-[15px] font-extrabold text-[#1E293B] focus:outline-none w-full appearance-none cursor-pointer truncate"
            >
              {SOUTH_INDIA_LOCALITIES.map(l => (
                <option key={l.name} value={l.name}>{l.name}, {l.city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* VERTICAL DIVIDER */}
        <div className="hidden md:block h-10 w-px bg-slate-100"></div>

        {/* AREA SECTION */}
        <div className="flex-1 min-w-0 w-full py-2 px-4 md:px-6">
          <label className="text-[10px] md:text-[11px] font-black text-[#94A3B8] uppercase tracking-[0.1em] block mb-1 ml-6">
            Area (SQFT)
          </label>
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-[#94A3B8] shrink-0" />
            <input 
              type="number"
              value={formData.sqft}
              onChange={(e) => setFormData({...formData, sqft: parseInt(e.target.value) || 0})}
              className="bg-transparent text-[14px] md:text-[15px] font-extrabold text-[#1E293B] focus:outline-none w-full"
            />
          </div>
        </div>

        {/* VERTICAL DIVIDER */}
        <div className="hidden md:block h-10 w-px bg-slate-100"></div>

        {/* CONFIGURATION SECTION */}
        <div className="flex-1 min-w-0 w-full py-2 px-4 md:px-6">
          <label className="text-[10px] md:text-[11px] font-black text-[#94A3B8] uppercase tracking-[0.1em] block mb-1 ml-6">
            Configuration
          </label>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#94A3B8] shrink-0" />
              <span className="text-[14px] md:text-[15px] font-extrabold text-[#1E293B] whitespace-nowrap">{formData.bhk} BHK</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button 
                type="button" 
                onClick={() => setFormData({...formData, bhk: Math.max(1, formData.bhk-1)})} 
                className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-all border border-slate-100"
              >
                <Minus className="w-3 h-3 md:w-4 md:h-4" />
              </button>
              <button 
                type="button" 
                onClick={() => setFormData({...formData, bhk: Math.min(10, formData.bhk+1)})} 
                className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-all border border-slate-100"
              >
                <Plus className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* SEARCH BUTTON */}
        <button
          disabled={isLoading}
          className="bg-[#242C3C] text-white rounded-full py-3 px-6 md:px-10 font-bold text-sm hover:bg-[#064E3B] transition-all flex items-center justify-center gap-3 disabled:opacity-50 h-14 md:h-16 w-full md:w-auto md:ml-4 shadow-xl"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <Search className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-extrabold tracking-widest uppercase text-[11px] md:text-[12px]">Search</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default PredictorForm;
