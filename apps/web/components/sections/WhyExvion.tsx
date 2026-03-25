"use client";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { SectionHeading } from "@exvion/ui";
import { Icon, type IconName } from "@exvion/ui";

const reasons: { icon: IconName; title: string; desc: string }[] = [
  {
    icon: "strategy",
    title: "Business-First Development",
    desc: "We build for outcomes, not just code. Every decision is tied to your business goals.",
  },
  {
    icon: "automation",
    title: "AI-Driven Thinking",
    desc: "Future-ready systems with automation built in from day one — not bolted on later.",
  },
  {
    icon: "pipeline",
    title: "Scalable Architecture",
    desc: "Systems built to grow with your business — from 10 users to 100,000.",
  },
  {
    icon: "fire",
    title: "Fast Execution",
    desc: "Speed without compromising quality. We ship fast and iterate faster.",
  },
];

const WhyExvion = () => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="section-padding bg-brand-navy/10">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="The Exvion "
            highlight="Difference"
            subtitle="We're not just developers. We're product engineers with a business mindset."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="glass rounded-2xl p-7 flex gap-5 border border-white/5
                  hover:border-brand-primary/20 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl glass shrink-0
                  flex items-center justify-center text-brand-primary
                  group-hover:shadow-glow transition-all duration-300">
                  <Icon name={r.icon} size={28} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2 
                    group-hover:text-brand-primary transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default WhyExvion;
