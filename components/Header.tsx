
import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';

interface HeaderProps {
  onNavClick: (section: 'home' | 'about' | 'loan' | 'contact') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 px-6 py-4 flex justify-center ${isScrolled ? 'glass-header py-3 shadow-sm' : ''}`}>
      <div className="max-w-7xl w-full flex items-center justify-between">
        <button onClick={() => onNavClick('home')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-[#B6FF3B] rounded-lg"></div>
          <span className="text-2xl font-black tracking-tighter text-[#064E3B] serif italic">livest</span>
        </button>
        
        <nav className="hidden md:flex items-center gap-10 text-[13px] font-semibold text-slate-500 tracking-tight">
          <button onClick={() => onNavClick('home')} className="hover:text-slate-900 transition-colors">Home</button>
          <button onClick={() => onNavClick('home')} className="hover:text-slate-900 transition-colors">Properties</button>
          <button onClick={() => onNavClick('loan')} className="hover:text-slate-900 transition-colors">Loan</button>
          <button onClick={() => onNavClick('about')} className="hover:text-slate-900 transition-colors">About</button>
          <button onClick={() => onNavClick('contact')} className="hover:text-slate-900 transition-colors">Contact</button>
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-[13px] font-semibold text-slate-600 px-5 py-2 hover:text-slate-900">Log in</button>
          <button className="bg-slate-950 text-white text-[13px] font-semibold px-6 py-2.5 rounded-full hover:bg-slate-800 transition-all">Join now</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
