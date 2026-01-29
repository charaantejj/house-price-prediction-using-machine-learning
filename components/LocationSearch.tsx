
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, ChevronRight } from 'lucide-react';
import { SOUTH_INDIA_LOCALITIES } from '../constants';

interface LocationSearchProps {
  value: string;
  onChange: (locality: string) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ value, onChange }) => {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = SOUTH_INDIA_LOCALITIES.filter(l => 
    l.name.toLowerCase().includes(query.toLowerCase()) || 
    l.city.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative group">
        <input
          type="text"
          value={isOpen ? query : value}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search Bangalore, Hyderabad, Kochi..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#40E0FF]/30 focus:border-[#40E0FF] transition-all text-lg font-medium"
        />
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#40E0FF]" />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
      </div>

      {isOpen && query.length > 0 && (
        <div className="absolute z-[60] mt-2 w-full glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-64 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((l) => (
                <button
                  key={l.name}
                  onClick={() => {
                    onChange(l.name);
                    setQuery(l.name);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 text-left transition-colors border-b border-white/5 last:border-none group"
                >
                  <div>
                    <div className="font-bold text-white group-hover:text-[#40E0FF] transition-colors">{l.name}</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{l.city}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    {l.isHighDemand && <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded font-black">HIGH DEMAND</span>}
                    <ChevronRight className="w-4 h-4 text-slate-700" />
                  </div>
                </button>
              ))
            ) : (
              <div className="p-5 text-center text-slate-500 text-sm">No localities found in our 2026 database.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
