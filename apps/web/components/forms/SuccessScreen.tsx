"use client";

import { motion } from "framer-motion";
import { useFormStore } from "@/store/useFormStore";
import { BookingCalendar } from "./BookingCalendar";

interface SuccessScreenProps {
  message: string;
  serviceTitle: string;
  leadName: string;
  accentColor: string;
}

export function SuccessScreen({ message, serviceTitle, leadName,  accentColor,
}: SuccessScreenProps) {
  const firstName = leadName.split(" ")[0] || "there";
  const { leadId, isBookingView, setBookingView } = useFormStore();

  if (isBookingView && leadId) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <BookingCalendar accentColor={accentColor} serviceTitle={serviceTitle} />
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full p-8 text-center flex flex-col items-center justify-center min-h-[400px]"
    >
      <div 
        className="w-20 h-20 rounded-full mb-6 flex items-center justify-center border-4"
        style={{ borderColor: `${accentColor}40`, backgroundColor: `${accentColor}10` }}
      >
        <motion.svg 
          className="w-10 h-10" 
          style={{ color: accentColor }}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <motion.path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={3} 
            d="M5 13l4 4L19 7" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          />
        </motion.svg>
      </div>
      
      <h3 className="text-3xl font-bold text-white mb-2">Request Confirmed</h3>
      <p className="text-white/60 mb-6 font-medium">Thanks, {firstName}.</p>
      
      <p className="text-lg text-white mb-10 leading-relaxed max-w-md mx-auto">
        {message}
      </p>

      <div className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-6 text-left mb-8 max-w-sm mx-auto">
        <h4 className="text-sm uppercase tracking-widest text-white/40 font-bold mb-4">What happens next</h4>
        
        <div className="flex gap-4 mb-4">
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-xs font-bold text-white/70">1</span>
          </div>
          <p className="text-sm text-white/80">We review your structural requirements & answers.</p>
        </div>
        
        <div className="flex gap-4 mb-4">
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-xs font-bold text-white/70">2</span>
          </div>
          <p className="text-sm text-white/80">We prepare a custom blueprint for {serviceTitle}.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-xs font-bold text-white/70">3</span>
          </div>
          <p className="text-sm text-white/80">You'll hear from an engineer within 24 hours.</p>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <a href="/portfolio" className="px-6 py-3 rounded-lg font-medium text-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors">
          View Portfolio
        </a>
        <button 
          onClick={() => setBookingView(true)}
          className="px-6 py-3 rounded-lg font-medium text-sm text-black transition-colors" 
          style={{ backgroundColor: accentColor }}
        >
          Book a Call Now
        </button>
      </div>
    </motion.div>
  );
}
