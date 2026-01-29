
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, User, Mail, MessageSquare } from 'lucide-react';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose, propertyName }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2500);
    }, 1500);
  };

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
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-10 overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors">
              <X className="w-6 h-6" />
            </button>

            {isSuccess ? (
              <div className="py-12 flex flex-col items-center text-center space-y-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black serif italic text-slate-900">Message Sent</h3>
                  <p className="text-slate-500 font-medium">An expert agent will contact you shortly.</p>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-3xl font-black serif italic text-slate-900">Contact Agent</h2>
                  <p className="text-slate-500 text-sm font-medium mt-1">
                    {propertyName ? `Inquiry for ${propertyName}` : 'Tell us about your requirements.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <User className="w-4 h-4 text-slate-400" />
                      <input required type="text" placeholder="John Doe" className="bg-transparent w-full text-slate-900 font-bold focus:outline-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <input required type="email" placeholder="john@example.com" className="bg-transparent w-full text-slate-900 font-bold focus:outline-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Message</label>
                    <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <MessageSquare className="w-4 h-4 text-slate-400 mt-1" />
                      <textarea required rows={4} placeholder="I'm interested in viewing this property..." className="bg-transparent w-full text-slate-900 font-bold focus:outline-none resize-none" />
                    </div>
                  </div>

                  <button
                    disabled={isLoading}
                    className="w-full bg-[#064E3B] text-white rounded-2xl py-5 font-bold hover:bg-[#043327] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isLoading ? 'Sending...' : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;
