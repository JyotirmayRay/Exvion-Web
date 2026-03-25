"use client";
import React from "react";
import { motion } from "framer-motion";
import { type ServiceConfig } from "@exvion/types";
import { Icon } from "@exvion/ui";

export const ServiceUseCases = ({ service }: { service: ServiceConfig }) => (
  <section className="py-24">
    <div className="container-custom">
      <div className="max-w-3xl mb-16">
        <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
          Common Use Cases
        </h2>
        <div className="w-20 h-1 bg-brand-primary/50" />
      </div>

      <div className="flex flex-wrap gap-4">
        {service.useCases.map((uc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass px-6 py-4 rounded-full border border-white/10 flex items-center gap-3 hover:border-brand-primary/40 transition-all group cursor-default"
          >
            {i === 0 && (
              <span style={{ color: service.accentColor }}>
                <Icon name={service.iconId as any} size={18} />
              </span>
            )}
            <span className="text-white/80 font-bold text-sm tracking-wide group-hover:text-white transition-colors">
              {uc.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
