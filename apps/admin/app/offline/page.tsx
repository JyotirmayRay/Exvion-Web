"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@exvion/ui";

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-brand-dark text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-3xl p-10 border border-white/5 max-w-sm w-full"
      >
        <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-8 relative">
          <Icon name="maintenance" size={40} className="text-text-muted" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-brand-dark animate-pulse" />
        </div>
        
        <h1 className="text-2xl font-black text-white mb-2 italic uppercase tracking-tighter">Connection Lost</h1>
        <p className="text-text-muted text-sm mb-8 leading-relaxed">
          It looks like you're offline. Exvion Admin requires an active connection for real-time lead sync.
        </p>

        <button 
          onClick={() => window.location.reload()}
          className="w-full btn-primary py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 mb-4"
        >
          <Icon name="refresh" size={18} />
          Retry Connection
        </button>

        <Link href="/dashboard" className="text-text-muted text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
          Return to Dashboard
        </Link>
      </motion.div>
    </div>
  );
}
