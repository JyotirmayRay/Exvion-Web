"use client";
import React from "react";
import { motion } from "framer-motion";
import { type ServiceConfig } from "@exvion/types";
import { Icon } from "@exvion/ui";

export const ServiceProblem = ({ service }: { service: ServiceConfig }) => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-brand-dark opacity-40 mix-blend-multiply" />
    
    <div className="container-custom relative z-10">
      <div className="max-w-3xl mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
          {service.problemHeadline}
        </h2>
        <div className="w-20 h-1 bg-red-500/50" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {service.problems.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-3xl border border-red-500/10 flex items-start gap-5 hover:border-red-400/30 transition-all group"
            style={{ borderLeft: `4px solid ${service.accentColor}40` }}
          >
            <div className="w-10 h-10 rounded-xl bg-red-400/10 flex items-center justify-center text-red-500 shrink-0 group-hover:scale-110 transition-transform">
              <Icon name="close" size={20} />
            </div>
            <p className="text-text-secondary text-lg font-medium leading-relaxed group-hover:text-white/90 transition-colors">
              {p}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
