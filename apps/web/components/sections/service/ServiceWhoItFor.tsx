"use client";
import React from "react";
import { motion } from "framer-motion";
import { type ServiceConfig } from "@exvion/types";
import { Icon } from "@exvion/ui";

export const ServiceWhoItFor = ({ service }: { service: ServiceConfig }) => (
  <section className="py-24 relative overflow-hidden">
    <div className="container-custom">
      <div className="max-w-3xl mb-16">
        <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
          Built For You If...
        </h2>
        <div className="w-20 h-1 bg-brand-primary/50" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {service.whoItFor.map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-3xl border border-white/5 flex items-start gap-4 hover:border-brand-primary/20 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary/10 transition-all shrink-0">
              <Icon name="user" size={24} />
            </div>
            <p className="text-text-secondary text-lg font-medium leading-relaxed group-hover:text-white transition-colors">
              {w}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
