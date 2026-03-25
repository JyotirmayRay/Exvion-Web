"use client";
import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@exvion/ui";
import { useFormStore } from "@/store/useFormStore";

export const ServiceFinalCTA = () => {
  const { openModal } = useFormStore();
  
  return (
    <section className="py-32 relative overflow-hidden">
    <div className="container-custom relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter leading-tight">
          Ready to get started?
        </h2>
        <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto font-medium">
          Tell us about your project and get a custom plan and quote in 24 hours.
        </p>
        
        <button 
          onClick={openModal}
          className="bg-white text-black px-12 py-6 rounded-2xl font-black text-lg uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
        >
          Start This Project
          <Icon name="arrow-right" size={24} />
        </button>

        <div className="flex flex-wrap justify-center gap-8 mt-16">
          {[
            { label: "No commitment", icon: "check" },
            { label: "Custom plan", icon: "check" },
            { label: "24-hour reply", icon: "check" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-text-muted">
              <span className="text-brand-primary"><Icon name="check" size={14} /></span>
              {item.label}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
  );
};
