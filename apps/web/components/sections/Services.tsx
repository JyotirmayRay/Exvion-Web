import React from "react";
import { services } from "@/config/services";
import ServiceFilterGrid from "./ServiceFilterGrid";

export default function Services() {
  return (
    <div id="services">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block mb-4 px-4 py-1.5 rounded-full glass border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-widest">
          What We Build
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          17 Services. One Team. <span className="gradient-text">Real Outcomes.</span>
        </h2>
        <p className="text-text-secondary text-lg leading-relaxed">
          From AI automation to full SaaS platforms — we build the systems that move your business forward.
        </p>
      </div>

      {/* Interactive Filter & Grid */}
      <ServiceFilterGrid services={services} />

      {/* Bottom CTA */}
      <div className="mt-24 text-center p-8 md:p-12 rounded-3xl glass border border-white/5 bg-gradient-brand-subtle">
        <h3 className="text-2xl font-bold text-white mb-4">Not sure which service you need?</h3>
        <p className="text-text-secondary mb-8 max-w-xl mx-auto">
          Book a free 15-minute strategy call. We'll audit your current workflow and suggest the best starting point for your project.
        </p>
        <a href="/contact?type=call">
          <button className="btn-primary px-10 py-4 rounded-xl font-bold shadow-glow transition-transform hover:scale-105">
            Book Your Free Strategy Call
          </button>
        </a>
      </div>
    </div>
  );
}
