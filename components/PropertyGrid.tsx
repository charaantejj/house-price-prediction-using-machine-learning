import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ComparableProperty } from '../types';
import { ArrowUpRight, Bed, Bath, Maximize } from 'lucide-react';

interface PropertyGridProps {
  properties: ComparableProperty[];
  onContact: (propName: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      // Fix: Use 'as const' to ensure the array is treated as a cubic-bezier tuple (BezierDefinition)
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
};

const PropertyGrid: React.FC<PropertyGridProps> = ({ properties, onContact }) => {
  const formatINR = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
    >
      {properties.map((item) => (
        <PropertyCard key={item.id} item={item} onContact={onContact} formatINR={formatINR} />
      ))}
    </motion.div>
  );
};

// Interface for PropertyCard props to satisfy TypeScript's strict type checking when used in a list with 'key'
interface PropertyCardProps {
  item: ComparableProperty;
  onContact: (p: string) => void;
  formatINR: (n: number) => string;
}

// Using React.FC to wrap the component and correctly handle React-specific props like 'key'
const PropertyCard: React.FC<PropertyCardProps> = ({ item, onContact, formatINR }) => {
  const [imgError, setImgError] = useState(false);
  const fallbackImg = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

  return (
    <motion.div 
      variants={itemVariants}
      className="property-card bg-white rounded-[3rem] overflow-hidden card-shadow border border-slate-50 group transition-all duration-700 hover:-translate-y-2"
    >
      <div className="relative h-80 overflow-hidden bg-slate-100">
        <img 
          src={imgError ? fallbackImg : item.imageUrl} 
          alt={item.title} 
          onError={() => setImgError(true)}
          className="property-img w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-6 left-6 flex gap-2">
          <div className="bg-white/95 backdrop-blur shadow-sm px-4 py-1.5 rounded-full text-[12px] font-extrabold text-[#1E293B]">
            {item.location}
          </div>
          <div className="bg-[#B6FF3B] px-4 py-1.5 rounded-full text-[12px] font-black text-[#064E3B] shadow-sm">
            {item.matchScore}% Match
          </div>
        </div>

        {/* Amenity Badges (Lower Over Image) */}
        {item.amenities && (
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
            {item.amenities.map((a, idx) => (
              <span key={idx} className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-bold text-white border border-white/10 uppercase tracking-widest leading-none">
                {a}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-10 space-y-8">
        <div className="space-y-2">
          <h5 className="text-3xl font-black text-[#064E3B] serif italic tracking-tight">{item.title}</h5>
          <p className="text-[11px] font-black text-[#94A3B8] uppercase tracking-[0.2em]">Available Immediately</p>
        </div>

        {/* Layout Icons */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="flex flex-col items-center gap-2">
            <Maximize className="w-5 h-5 text-[#94A3B8]/60" />
            <span className="text-sm font-extrabold text-[#1E293B]">{item.sqft} ft²</span>
          </div>
          <div className="flex flex-col items-center gap-2 border-x border-slate-100">
            <Bed className="w-5 h-5 text-[#94A3B8]/60" />
            <span className="text-sm font-extrabold text-[#1E293B]">{item.beds} BHK</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Bath className="w-5 h-5 text-[#94A3B8]/60" />
            <span className="text-sm font-extrabold text-[#1E293B]">{item.baths} Bath</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
          <div>
            <span className="text-[11px] font-black text-[#94A3B8] block mb-1 uppercase tracking-widest">Asset Value</span>
            <span className="text-3xl font-black text-[#064E3B] tracking-tight">{formatINR(item.price)}</span>
          </div>
          <button 
            onClick={() => onContact(item.title)}
            className="w-14 h-14 rounded-2xl bg-[#1E293B] text-white flex items-center justify-center hover:bg-[#064E3B] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-slate-200"
          >
            <ArrowUpRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyGrid;