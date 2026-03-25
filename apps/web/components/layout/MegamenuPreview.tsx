"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceConfig } from "@exvion/types";
import { Icon } from "@exvion/ui";

interface MegamenuPreviewProps {
  activeService: ServiceConfig | null;
}

export const MegamenuPreview: React.FC<MegamenuPreviewProps> = ({ activeService }) => {
  if (!activeService) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white/[0.02] border border-white/[0.05] rounded-3xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FB4E00]/10 to-transparent pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-500">
            <Icon name="feature-dev" size={32} className="text-white/20" />
          </div>
          <h3 className="text-lg font-bold text-white/40">Select a Service</h3>
          <p className="text-xs text-white/20 leading-relaxed max-w-[200px]">
            Explore our specialized solutions by hovering over the service items.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white/[0.03] border border-white/[0.08] rounded-3xl overflow-hidden relative flex flex-col">
      {/* Background Glow */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-20 pointer-events-none transition-colors duration-700"
        style={{ background: activeService.accentColor || "#FB4E00" }}
      />

      {/* Header Info */}
      <div className="p-8 pb-0 relative z-10 flex-shrink-0">
        <div className="flex items-center gap-4 mb-5">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl border border-white/20 transition-all duration-500 scale-110"
            style={{ 
              background: `linear-gradient(135deg, ${activeService.accentColor}ff, ${activeService.accentColor}66)`,
              boxShadow: `0 12px 24px ${activeService.accentColor}44`
            }}
          >
            <Icon name={activeService.iconId as any} size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white leading-tight tracking-tight">{activeService.shortTitle}</h3>
            <p className="text-[11px] text-white/60 uppercase tracking-[0.25em] font-black">{activeService.category}</p>
          </div>
        </div>
        
        <p className="text-[13px] font-medium text-white/90 leading-relaxed mb-6 bg-white/[0.03] p-4 rounded-2xl border border-white/[0.05] shadow-inner">
          {activeService.description}
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {activeService.outcomes?.slice(0, 2).map((outcome, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              <span className="text-[10px] font-bold text-white/80 whitespace-nowrap">
                {outcome}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Mockup Visual + CTA */}
      <div className="flex-1 px-8 pb-8 relative flex flex-col gap-6 overflow-hidden">
        <div className="flex-1 rounded-3xl bg-[#050508] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden p-5 flex flex-col gap-4">
          {/* Top Bar Mockup */}
          <div className="flex items-center justify-between opacity-50">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            </div>
            <div className="flex gap-3">
               <div className="w-12 h-2 rounded-full bg-white/10" />
               <div className="w-8 h-2 rounded-full bg-white/10" />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -15 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col gap-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 rounded-2xl bg-white/[0.02] border border-white/[0.05] p-4 flex flex-col justify-between group/card overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
                   <div className="flex justify-between items-start relative z-10">
                    <div className="w-7 h-7 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                       <Icon name="ai-workflow" size={12} className="text-white/40" />
                    </div>
                    <div className="text-[9px] font-black text-brand-primary tracking-tighter bg-brand-primary/10 px-1.5 py-0.5 rounded">SYSTEM: LIVE</div>
                   </div>
                   <div className="relative z-10">
                      <div className="flex justify-between text-[9px] font-bold text-white/30 mb-1.5">
                        <span>EFFICIENCY</span>
                        <span className="text-white/60">84%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: "84%" }} 
                            className="h-full bg-brand-primary shadow-[0_0_10px_rgba(251,78,0,0.5)]"
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                      </div>
                   </div>
                </div>
                <div className="h-20 rounded-2xl bg-white/[0.02] border border-white/[0.05] p-4 flex flex-col justify-between group/card overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
                   <div className="flex justify-between items-start relative z-10">
                    <div className="w-7 h-7 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                       <Icon name="saas-mvp" size={12} className="text-white/40" />
                    </div>
                    <div className="text-[9px] font-black text-emerald-500 tracking-tighter bg-emerald-500/10 px-1.5 py-0.5 rounded">+42% ROI</div>
                   </div>
                   <div className="relative z-10">
                      <div className="flex justify-between text-[9px] font-bold text-white/30 mb-1.5">
                        <span>GROWTH</span>
                        <span className="text-white/60">67%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: "67%" }} 
                            className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                            transition={{ duration: 1.2, delay: 0.4 }}
                          />
                      </div>
                   </div>
                </div>
              </div>

              {/* Central Abstract Illustration Area */}
              <div className="flex-1 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.08] p-5 flex items-center justify-center relative group/inner overflow-hidden shadow-inner">
                 <div className="absolute inset-0 flex items-center justify-center opacity-40">
                    <div className="w-40 h-40 rounded-full border border-white-[0.03] animate-pulse" />
                    <div className="absolute w-24 h-24 rounded-full border border-dashed border-white/10 animate-[spin_15s_linear_infinite]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_70%)] opacity-60" />
                 </div>
                 
                 <div className="relative z-10 flex flex-col items-center gap-3">
                   <div className="relative">
                    <div className="absolute inset-0 blur-2xl opacity-40 scale-150" style={{ backgroundColor: activeService.accentColor }} />
                    <Icon 
                        name={activeService.iconId as any} 
                        size={56} 
                        className="text-white group-hover/inner:scale-110 transition-all duration-700 relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                    />
                   </div>
                   <div className="flex gap-1.5 mt-2">
                      {[1,2,3,4].map(i => (
                        <motion.div 
                          key={i}
                          animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
                          className="w-1.5 h-1.5 rounded-full bg-white/40"
                        />
                      ))}
                   </div>
                 </div>

                 {/* Floating Decorative Elements */}
                 <motion.div 
                   animate={{ y: [0, -10, 0], opacity: [0.2, 0.5, 0.2] }}
                   transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                   className="absolute top-4 right-4 text-[10px] font-mono text-white/20 whitespace-nowrap"
                 >
                   // EXECUTION_READY
                 </motion.div>
              </div>

              {/* Functional Footer Mockup */}
              <div className="flex items-center justify-between px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl">
                 <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
                    <span className="text-[9px] font-black text-white/50 uppercase tracking-[0.2em]">Operational Node: V4-X</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-px h-3 bg-white/10" />
                    <span className="text-[10px] font-bold text-white/70">{activeService.deliveryTime}</span>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Primary CTA Button - FIXED AT BOTTOM OF PREVIEW */}
        <motion.a
          href={`/services/${activeService.slug}`}
          className="w-full py-4 rounded-2xl font-black text-sm text-white flex items-center justify-center gap-3 transition-all active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.3)] group/cta overflow-hidden relative"
          style={{ background: `linear-gradient(135deg, ${activeService.accentColor}, ${activeService.accentColor}cc)` }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-700 ease-in-out" />
          GET INSTANT QUOTE
          <Icon name="arrow-right" size={16} className="group-hover/cta:translate-x-1 transition-transform" />
        </motion.a>
      </div>
    </div>
  );
};
