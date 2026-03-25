"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TechBackground } from "@/components/ui/TechBackground";
import { Icon } from "@exvion/ui";
import { services, serviceCategories } from "@/config/services";
import { CompactCard } from "@/components/ui/ServiceCard";

const PATH_CARDS = [
  {
    title: "AI Transformation",
    desc: "Automate operations and integrate intelligent workflows.",
    icon: "ai-workflow",
    category: "ai",
    color: "#8B5CF6"
  },
  {
    title: "SaaS Launch",
    desc: "From MVP to white-label reseller platforms.",
    icon: "saas-mvp",
    category: "saas",
    color: "#0EA5E9"
  },
  {
    title: "Custom Development",
    desc: "Unique features, plugins, and scalable architecture.",
    icon: "feature-dev",
    category: "development",
    color: "#F59E0B"
  }
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <>
      <TechBackground />
      <Navbar />
      <main className="pt-32 pb-24 overflow-hidden">
        
        {/* HERO SECTION */}
        <section className="section-padding relative">
          <div className="container-custom text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full glass border border-white/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.2em]">
                Our Expertise
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-tight">
                Solutions for Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-purple-400">Growth Stage</span>
              </h1>
              <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto font-medium opacity-80">
                17 specialized services designed to eliminate technical roadblocks and scale your business faster.
              </p>
            </motion.div>

            {/* CATEGORY TABS */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${
                  activeCategory === "all" 
                    ? "bg-white text-black border-white shadow-xl" 
                    : "bg-white/5 text-white/60 border-white/10 hover:border-white/20"
                }`}
              >
                All Services
              </button>
              {serviceCategories.filter(c => c.count > 0).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${
                    activeCategory === cat.id 
                      ? "bg-white text-black border-white shadow-xl" 
                      : "bg-white/5 text-white/60 border-white/10 hover:border-white/20"
                  }`}
                >
                  {cat.label}
                  <span className="ml-2 opacity-40">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICE GRID */}
        <section className="pb-24">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredServices.map((s, i) => (
                  <CompactCard key={s.id} service={s} index={i} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* NOT SURE WHERE TO START? */}
        <section className="py-24 border-t border-white/5">
          <div className="container-custom">
            <div className="max-w-3xl mb-16">
              <h2 className="text-4xl font-bold text-white mb-4 tracking-tighter">
                Not sure where to start?
              </h2>
              <p className="text-text-secondary text-lg font-medium">Choose a path that best describes your current goal.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PATH_CARDS.map((path, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setActiveCategory(path.category)}
                  className="glass p-8 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all group cursor-pointer text-left"
                >
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-2xl group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: path.color }}
                  >
                    <Icon name={path.icon as any} size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{path.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                    {path.desc}
                  </p>
                  <div className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: path.color }}>
                    Explore Path →
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
