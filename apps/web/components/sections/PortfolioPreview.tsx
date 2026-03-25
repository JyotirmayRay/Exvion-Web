import React, { useEffect, useRef } from "react";
import { motion, LazyMotion, domAnimation, useInView, animate } from "framer-motion";
import Link from "next/link";
import { SectionHeading, Icon } from "@exvion/ui";

// --- Animated Counter Component ---
const Counter = ({ from = 0, to, duration = 2, prefix = "", suffix = "" }: { from?: number, to: number, duration?: number, prefix?: string, suffix?: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = `${prefix}${Math.round(value).toLocaleString()}${suffix}`;
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, prefix, suffix, inView]);

  return <span ref={nodeRef}>{prefix}{from}{suffix}</span>;
};

const cases = [
  {
    tag: "Marketplace",
    title: "Multi-Vendor Marketplace Platform",
    bgMetrics: "GMV Growth | Active Vendors",
    problem: "No scalable system to manage vendors and orders, resulting in inefficient workflows and disconnected data ecosystems.",
    solution: "Built a fully automated marketplace with a unified vendor panel, real-time analytics, and automated payouts.",
    resultLabel: "Efficiency",
    resultPrefix: "+",
    resultTo: 240,
    resultSuffix: "%",
    glowColor: "rgba(251,78,0,0.6)",
  },
  {
    tag: "SaaS",
    title: "Digital Products SaaS Platform",
    bgMetrics: "MRR Retention | User Engagement",
    problem: "High customer churn and low engagement due to no recurring revenue system or customer lifecycle management.",
    solution: "Designed and built a subscription SaaS with personalized membership tiers, usage analytics, and a retention engine.",
    resultLabel: "Customer Base",
    resultPrefix: "+",
    resultTo: 3000,
    resultSuffix: "",
    glowColor: "rgba(59,130,246,0.6)",
  },
  {
    tag: "Website System",
    title: "High-Converting Lead Engine",
    problem: "A generic, slow-loading website that generated zero qualified leads and suffered from rising bounce rates.",
    bgMetrics: "Lead Velocity | Conversion Rate",
    solution: "Engineered a smart form engine with AI-driven lead scoring, automated routing, and an admin pipeline.",
    resultLabel: "Qualified Inquiries",
    resultPrefix: "",
    resultTo: 4,
    resultSuffix: "x",
    glowColor: "rgba(168,85,247,0.6)",
  },
];

const PortfolioPreview = () => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Portfolio"
            title="Real Work. "
            highlight="Real Impact."
            subtitle="We let results speak — not just screenshots."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {/* Background connecting line (desktop) */}
            <div className="hidden lg:block absolute top-[50%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10" />

            {cases.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.2, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group relative flex flex-col h-full"
              >
                {/* Cinematic Core Card */}
                <div className="relative flex flex-col h-full bg-[#07090E] border border-white/5 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/15 hover:shadow-[0_0_40px_rgba(251,78,0,0.1)]">
                  
                  {/* Dashboard Header Mockup */}
                  <div className="relative h-32 border-b border-white/5 overflow-hidden bg-gradient-to-b from-white/[0.03] to-transparent shrink-0">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
                    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${c.glowColor}, transparent)` }} />
                    
                    <div className="p-5 flex flex-col gap-2 h-full justify-between relative z-10">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Project:</span>
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-white/10" />
                          <div className="w-2 h-2 rounded-full bg-white/10" />
                          <div className="w-2 h-2 rounded-full bg-white/10" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg leading-none mb-1">{c.title}</h4>
                        <p className="text-white/40 text-xs font-mono">{c.bgMetrics}</p>
                      </div>
                    </div>
                  </div>

                  {/* Evidence Layer Content */}
                  <div className="p-6 flex flex-col gap-6 flex-grow">
                    
                    {/* Problem Block */}
                    <div className="relative pl-5 border-l-2 border-red-500/30">
                      <div className="absolute top-1 -left-[5px] w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse" />
                      <h5 className="text-[10px] font-bold tracking-widest text-red-400 uppercase mb-2">Problem</h5>
                      <p className="text-text-secondary text-sm leading-relaxed">{c.problem}</p>
                    </div>

                    {/* Solution Block */}
                    <div className="relative pl-5 border-l-2 border-blue-500/30">
                      <div className="absolute top-1 -left-[5px] w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                      <h5 className="text-[10px] font-bold tracking-widest text-blue-400 uppercase mb-2">Solution</h5>
                      <p className="text-text-secondary text-sm leading-relaxed">{c.solution}</p>
                    </div>

                  </div>

                  {/* Cinematic Result Footer */}
                  <div className="mt-auto p-6 bg-gradient-to-t from-green-500/[0.05] to-transparent border-t border-white/5 relative overflow-hidden shrink-0">
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-500/10 blur-[50px] rounded-full translate-x-1/2 translate-y-1/2" />
                    
                    <h5 className="text-[10px] font-bold tracking-widest text-green-400 uppercase mb-2 relative z-10">Hard Result</h5>
                    <div className="flex items-end justify-between relative z-10">
                      <div className="flex flex-col">
                        <div className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                          <Counter to={c.resultTo} prefix={c.resultPrefix} suffix={c.resultSuffix} />
                        </div>
                        <span className="text-white/60 text-xs font-mono tracking-wide uppercase mt-1">{c.resultLabel}</span>
                      </div>
                      
                      {/* Decorative Graph Element */}
                      <svg width="60" height="30" viewBox="0 0 60 30" fill="none" className="text-green-400/30 mb-2">
                        <path d="M0 25 Q15 25, 20 15 T40 10 T60 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                        <path d="M0 25 Q15 25, 20 15 T40 10 T60 5 L60 30 L0 30 Z" fill="currentColor" opacity="0.2" />
                      </svg>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="/portfolio">
              <button className="btn-secondary px-8 py-3 rounded-xl">
                View Full Portfolio →
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default PortfolioPreview;
