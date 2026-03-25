"use client";
import React from "react";
import { motion } from "framer-motion";
import { type ServiceConfig } from "@exvion/types";

export const ServiceProcess = ({ service }: { service: ServiceConfig }) => (
  <section className="py-24">
    <div className="container-custom">
      <div className="max-w-3xl mb-20 text-center mx-auto">
        <h2 className="text-4xl font-bold text-white mb-4 tracking-tighter">
          How We Work
        </h2>
        <p className="text-text-muted font-medium italic">Clear engineering workflow for predictable results.</p>
      </div>

      <div className="relative">
        {/* Horizontal Connector Line (Desktop) */}
        <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[1px] bg-white/5 z-0">
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full origin-left"
            style={{ backgroundColor: service.accentColor }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          {service.process.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center text-center md:items-start md:text-left group"
            >
              <div 
                className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-xl font-black mb-6 shadow-2xl transition-all group-hover:scale-110 group-hover:rotate-3"
                style={{ backgroundColor: service.accentColor, border: `2px solid ${service.accentColor}40`, color: '#fff' }}
              >
                {p.step}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-brand-primary transition-colors">
                {p.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed font-medium opacity-80">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
