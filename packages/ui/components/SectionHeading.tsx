"use client";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
}

export const SectionHeading = ({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
}: SectionHeadingProps) => {
  const titleParts = highlight
    ? title.split(highlight)
    : [title];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {eyebrow && (
        <span className="inline-block mb-4 px-4 py-1.5 rounded-full glass text-brand-primary 
          text-xs font-semibold uppercase tracking-widest border border-brand-primary/20">
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
        {titleParts[0]}
        {highlight && (
          <span className="gradient-text">{highlight}</span>
        )}
        {titleParts[1]}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
