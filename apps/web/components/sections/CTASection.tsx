"use client";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import Link from "next/link";
import { Icon } from "@exvion/ui";

const CTASection = () => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden border border-brand-primary/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br 
              from-brand-primary/10 via-brand-navy/30 to-brand-dark" />
            <div className="absolute -top-20 -right-20 w-64 h-64 
              bg-brand-primary/10 rounded-full blur-[60px]" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 
              bg-brand-navy/30 rounded-full blur-[40px]" />

            <div className="relative z-10 px-8 py-20 md:py-24 text-center">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-block mb-4 px-4 py-1.5 rounded-full glass 
                  text-brand-primary text-xs font-semibold uppercase 
                  tracking-widest border border-brand-primary/20"
              >
                Ready to Build?
              </motion.span>

              <h2 className="text-4xl md:text-5xl font-bold text-white 
                mb-4 leading-tight">
                Let's Build Something{" "}
                <span className="gradient-text">Powerful Together</span>
              </h2>

              <p className="text-text-secondary text-lg max-w-xl mx-auto mb-10">
                Tell us about your project and get a clear execution plan
                within 24 hours — no fluff, no delays.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/contact">
                  <button className="btn-primary text-base px-10 py-4 
                    rounded-xl shadow-glow-lg text-lg">
                      Start Your Project
                    </button>
                </Link>
                <Link href="/contact?type=proposal">
                  <button className="btn-secondary text-base px-10 py-4 
                    rounded-xl text-lg flex items-center gap-2">
                    <Icon name="search" size={20} /> Get Proposal in 24 Hours
                  </button>
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-text-muted text-sm">
                <span className="flex items-center gap-1.5"><Icon name="check" size={14} className="text-brand-primary" /> No commitment required</span>
                <span className="flex items-center gap-1.5"><Icon name="check" size={14} className="text-brand-primary" /> Custom plan for your project</span>
                <span className="flex items-center gap-1.5"><Icon name="check" size={14} className="text-brand-primary" /> Reply within 24 hours</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default CTASection;
