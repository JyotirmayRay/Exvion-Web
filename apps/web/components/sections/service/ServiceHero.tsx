"use client";
import { motion } from "framer-motion";
import { type ServiceConfig } from "@exvion/types";
import { Icon } from "@exvion/ui";
import { useFormStore } from "@/store/useFormStore";

export const ServiceHero = ({ service }: { service: ServiceConfig }) => {
  const { openModal } = useFormStore();

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    <div className="container-custom relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-12 max-w-4xl"
        >
          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass border border-white/10 shadow-2xl">
            <span style={{ color: service.accentColor }}>
              <Icon name={service.iconId as any} size={16} />
            </span>
            <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">
              {service.category}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tighter">
            {service.heroHeadline.split(' ').map((word, i) => {
              // Highlight key words (this is a heuristic, real implementation might need config)
              const highlights = ["AI", "SaaS", "Marketplace", "Scale", "Revenue", "Platform", "Faster", "Growth"];
              const cleanWord = word.replace(/[.,]/g, '');
              if (highlights.includes(cleanWord)) {
                return (
                  <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40" style={{ backgroundImage: `linear-gradient(to right, ${service.accentColor}, #fff)` }}>
                    {word}{' '}
                  </span>
                );
              }
              return word + ' ';
            })}
          </h1>

          <p className="text-text-secondary text-xl md:text-2xl leading-relaxed mb-12 max-w-2xl font-medium opacity-80">
            {service.heroSub}
          </p>

          <div className="flex flex-wrap gap-5 mb-12">
            <button 
              onClick={openModal}
              className="px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest text-white shadow-glow hover:scale-[1.05] active:scale-[0.95] transition-all" 
              style={{ backgroundColor: service.accentColor }}
            >
              Start This Project
            </button>
            <a href="https://calendly.com/exvion" target="_blank">
              <button className="px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest text-white glass border border-white/10 hover:bg-white/5 transition-all">
                Book a Free Call
              </button>
            </a>
          </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
              <Icon name="clock" size={14} className="text-text-muted" />
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Delivered in {service.deliveryTime}</span>
            </div>
        </motion.div>
      </div>
    </div>
  </section>
  );
};
