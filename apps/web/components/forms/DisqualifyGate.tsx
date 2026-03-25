"use client";

import { motion } from "framer-motion";

interface DisqualifyGateProps {
  message: string;
  serviceTitle: string;
  onGoBack: () => void;
}

export function DisqualifyGate({ message, serviceTitle, onGoBack }: DisqualifyGateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 text-center rounded-2xl border border-white/10 shadow-2xl"
    >
      <div className="max-w-sm">
        <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Not the right fit — yet</h3>
        <p className="text-white/70 mb-8 leading-relaxed">
          {message}
        </p>
        <div className="flex flex-col gap-3">
          <button 
            onClick={onGoBack}
            className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors border border-white/10"
          >
            Revise my answers
          </button>
          <a 
            href={`mailto:hello@exvion.com?subject=Custom Request for ${encodeURIComponent(serviceTitle)}`}
            className="w-full py-3 px-4 text-white/50 hover:text-white font-medium rounded-lg transition-colors text-sm underline underline-offset-4"
          >
            Contact us anyway
          </a>
        </div>
      </div>
    </motion.div>
  );
}
