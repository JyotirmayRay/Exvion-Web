"use client";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { Icon } from "@exvion/ui";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "99.9%", label: "System Uptime" },
  { value: "4.2x", label: "Faster Deployment" },
  { value: "24/7", label: "Expert Support" },
];

const logos = [
  "Microsoft", "Amazon", "Google", "Meta", "Stripe", "Airbnb"
];

const TrustStrip = () => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="py-20 border-y border-white/5 bg-brand-navy/5">
        <div className="container-custom">
          {/* Logo Marquee */}
          <div className="mb-20">
            <p className="text-center text-text-muted text-[10px] font-bold 
              uppercase tracking-[0.2em] mb-10 opacity-50">
              Trusted by Innovative Teams & Global Enterprises
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10 px-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              {logos.map((logo) => (
                <span key={logo} className="text-2xl font-black tracking-tighter text-white/80">
                  {logo}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-text-muted">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default TrustStrip;
