"use client";
import React from "react";
import { motion } from "framer-motion";
import { type ServiceConfig } from "@exvion/types";
import { Icon } from "@exvion/ui";

export const ServiceSolution = ({ service }: { service: ServiceConfig }) => (
  <section className="py-24">
    <div className="container-custom">
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-green-400/10 flex items-center justify-center text-green-400 border border-green-400/20">
            <Icon name="check" size={16} />
          </div>
          <span className="text-green-400 text-xs font-black uppercase tracking-[0.2em]">The Solution</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter leading-tight">
          {service.solutionHeadline}
        </h2>
        
        <p className="text-xl md:text-2xl text-text-secondary leading-relaxed mb-12 max-w-3xl font-medium">
          {service.solutionDesc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {service.outcomes.map((outcome, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4"
            >
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg"
                style={{ backgroundColor: service.accentColor }}
              >
                <Icon name="check" size={12} className="text-white" />
              </div>
              <span className="text-white text-lg font-bold leading-tight">
                {outcome}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
