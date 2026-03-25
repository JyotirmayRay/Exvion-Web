"use client";
import { motion } from "framer-motion";
import { Icon } from "@exvion/ui";
import { MultiStepForm } from "@/components/forms/MultiStepForm";

interface ServiceLeadFormProps {
  serviceSlug: string;
  serviceTitle: string;
}

export const ServiceLeadForm = ({
  serviceSlug,
  serviceTitle,
}: ServiceLeadFormProps) => (
  <section id="get-started" className="section-padding">
    <div className="container-custom">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left: Pitch */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full
            glass border border-brand-primary/20 text-brand-primary
            text-xs font-semibold uppercase tracking-widest">
            Start Your Project
          </span>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Get a Custom Plan in{" "}
            <span className="gradient-text">24 Hours</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-8">
            Answer 6 quick questions and we'll come back with a clear 
            execution plan tailored to your project.
          </p>
          <div className="space-y-4">
            {[
              "No commitment required",
              "Custom plan for your specific project",
              "Direct response from our team — not a bot",
              "Reply guaranteed within 24 hours",
            ].map((point) => (
              <p key={point} className="text-text-secondary text-sm flex items-center gap-2">
                <Icon name="check" size={14} className="text-brand-primary" />
                {point}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 border border-white/8 shadow-glass"
        >
          <MultiStepForm
            serviceSlug={serviceSlug}
            serviceTitle={serviceTitle}
          />
        </motion.div>
      </div>
    </div>
  </section>
);
