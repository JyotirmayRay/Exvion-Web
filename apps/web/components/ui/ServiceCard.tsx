"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@exvion/ui";
import type { ServiceConfig } from "@exvion/types";

interface ServiceCardProps {
  service: ServiceConfig;
  index: number;
}

export const FeaturedCard = ({ service, index }: ServiceCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative h-full"
    >
      <Link href={`/services/${service.slug}`} className="block h-full">
        <div 
          className="glass h-full p-8 rounded-3xl border border-white/10 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 flex flex-col items-start text-left overflow-hidden"
          style={{ 
            borderLeft: `3px solid ${service.accentColor}`,
            background: `linear-gradient(145deg, ${service.gradientFrom}, rgba(13,14,19,0.5))` 
          }}
        >
          {/* Card Glow Effect */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
            style={{ backgroundColor: service.accentColor }} 
          />

          <div className="flex items-center justify-between w-full mb-6 relative z-10">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
              style={{ backgroundColor: service.accentColor }}
            >
              <Icon name={service.iconId as any} size={24} />
            </div>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/50">
              {service.category === 'ai' || service.category === 'automation' ? 'AI & Automation' : service.category}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white mb-2 relative z-10 group-hover:text-white transition-colors">
            {service.shortTitle}
          </h3>
          <p className="text-sm font-medium mb-4" style={{ color: service.accentColor }}>
            {service.tagline}
          </p>
          <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-2">
            {service.description}
          </p>

          <div className="space-y-2 mb-8 relative z-10">
            {service.outcomes.slice(0, 2).map((outcome, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                <span style={{ color: service.accentColor }}>
                  <Icon name="check" size={12} />
                </span>
                <span>{outcome}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto w-full pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
            <div className="flex flex-col">
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Delivery</span>
              <span className="text-white/80 text-xs">{service.deliveryTime}</span>
            </div>
          </div>
          
          <div className="mt-6 w-full relative z-10">
            <div className="w-full py-3 rounded-xl font-bold text-xs text-center border transition-all flex items-center justify-center gap-2"
              style={{ 
                borderColor: `${service.accentColor}40`, 
                color: '#fff',
                backgroundColor: `${service.accentColor}10` 
              }}
            >
              Start This Project <Icon name="arrow-right" size={12} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export const CompactCard = ({ service, index }: ServiceCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/services/${service.slug}`} className="block">
        <div className="glass p-5 rounded-2xl border border-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] group-hover:shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: service.accentColor }}
            >
              <Icon name={service.iconId as any} size={20} />
            </div>
            <div className="min-w-0">
              <h4 className="text-white font-bold text-sm truncate group-hover:text-brand-primary transition-colors">
                {service.shortTitle}
              </h4>
              <span className="text-[9px] uppercase tracking-tighter text-text-muted font-bold">
                {service.category}
              </span>
            </div>
          </div>
          
          <p className="text-xs text-text-secondary line-clamp-1 mb-4">
            {service.tagline}
          </p>

          <div className="flex items-center justify-end text-[10px] font-bold text-white/40 pt-3 border-t border-white/5">
            <span className="text-brand-primary group-hover:translate-x-1 transition-transform flex items-center gap-1" style={{ color: service.accentColor }}>
              Learn More <Icon name="arrow-right" size={10} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
