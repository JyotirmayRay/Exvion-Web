"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FeaturedCard, CompactCard } from "@/components/ui/ServiceCard";
import type { ServiceConfig } from "@exvion/types";

interface ServiceFilterGridProps {
  services: ServiceConfig[];
}

const UI_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "ai-automation", label: "AI & Automation" },
  { id: "saas", label: "SaaS" },
  { id: "development", label: "Development" },
  { id: "wordpress", label: "WordPress" },
  { id: "consulting", label: "Consulting" },
  { id: "maintenance", label: "Maintenance" },
];

export default function ServiceFilterGrid({ services }: ServiceFilterGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: services.length };
    counts["ai-automation"] = services.filter(s => s.category === "ai" || s.category === "automation").length;
    counts["saas"] = services.filter(s => s.category === "saas").length;
    counts["development"] = services.filter(s => s.category === "development").length;
    counts["wordpress"] = services.filter(s => s.category === "wordpress").length;
    counts["consulting"] = services.filter(s => s.category === "consulting").length;
    counts["maintenance"] = services.filter(s => s.category === "maintenance").length;
    return counts;
  }, [services]);

  const filteredServices = useMemo(() => {
    if (activeCategory === "all") return services;
    if (activeCategory === "ai-automation") {
      return services.filter(s => s.category === "ai" || s.category === "automation");
    }
    return services.filter(s => s.category === activeCategory);
  }, [activeCategory, services]);

  const featured = useMemo(() => filteredServices.filter(s => s.featured), [filteredServices]);
  const regular = useMemo(() => filteredServices.filter(s => !s.featured), [filteredServices]);

  return (
    <>
      {/* Filter Bar */}
      <div className="flex justify-center mb-16">
        <div className="glass p-1.5 rounded-2xl border border-white/5 flex items-center gap-1 overflow-x-auto no-scrollbar max-w-full">
          {UI_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive ? "text-white" : "text-text-muted hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-brand-primary rounded-xl -z-10 shadow-glow"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {cat.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                  isActive ? "bg-white/20 text-white" : "bg-white/5 text-text-muted"
                }`}>
                  {categoryCounts[cat.id]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Area */}
      <motion.div layout className="space-y-12">
        {/* Featured Row */}
        <AnimatePresence mode="popLayout">
          {featured.length > 0 && (
            <motion.div 
              key={`${activeCategory}-featured`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featured.map((service, idx) => (
                <FeaturedCard key={service.id} service={service} index={idx} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Regular Grid */}
        <AnimatePresence mode="popLayout">
          {regular.length > 0 && (
            <motion.div 
              key={`${activeCategory}-regular`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {regular.map((service, idx) => (
                <CompactCard key={service.id} service={service} index={idx} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
