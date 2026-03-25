"use client";
import React from "react";
import { motion } from "framer-motion";
import { type ServiceConfig } from "@exvion/types";
import { Icon } from "@exvion/ui";
import { Button } from "@/components/ui/Button";

export const ServicePricingSignal = ({ service }: { service: ServiceConfig }) => (
  <section className="py-24">
    <div className="container-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass p-12 rounded-[2.5rem] border border-white/10 relative overflow-hidden group shadow-2xl"
      >
        {/* Glow Background */}
        <div 
          className="absolute -top-24 -right-24 w-64 h-64 blur-[120px] opacity-20 transition-opacity group-hover:opacity-30" 
          style={{ backgroundColor: service.accentColor }} 
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: service.accentColor }}>
                <Icon name={service.iconId as any} size={20} />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Pricing & Delivery</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-2">Typical Delivery</p>
                <p className="text-4xl font-bold text-white">{service.deliveryTime}</p>
              </div>
            </div>

            <p className="text-text-secondary font-medium leading-relaxed max-w-xl">
              Every project is unique. We provide a custom quote based on your specific requirements, complexity, and integration needs.
            </p>
          </div>

          <div className="md:w-auto shrink-0 flex flex-col items-center">
            <Button 
              href="/contact" 
              size="lg" 
              className="hidden md:flex w-full text-lg shadow-glow-lg border border-white/10"
            >
              Get Your Custom Quote
            </Button>
            <p className="mt-4 text-[10px] font-bold text-text-muted uppercase tracking-widest text-center">
              No commitment. Reply within 24 hours.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
