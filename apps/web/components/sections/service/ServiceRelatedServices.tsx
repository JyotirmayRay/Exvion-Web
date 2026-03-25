"use client";
import React from "react";
import { type ServiceConfig } from "@exvion/types";
import { services } from "@/config/services";
import { CompactCard } from "../../ui/ServiceCard";

export const ServiceRelatedServices = ({ currentServiceId, currentCategory }: { currentServiceId: string, currentCategory: string }) => {
  const related = services
    .filter(s => s.id !== currentServiceId)
    .sort((a, b) => {
      // Sort by same category first
      if (a.category === currentCategory && b.category !== currentCategory) return -1;
      if (a.category !== currentCategory && b.category === currentCategory) return 1;
      // Then featured
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    })
    .slice(0, 3);

  return (
    <section className="py-24 border-t border-white/5">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-white mb-12 tracking-tight">
          You Might Also Need
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((s, i) => (
            <CompactCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
