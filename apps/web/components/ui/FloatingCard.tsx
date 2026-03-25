"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  delay?: number;
  position?: string;
  className?: string;
}

export const FloatingCard = ({
  icon,
  title,
  value,
  delay = 0,
  position = "",
  className = "",
}: FloatingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className={`absolute ${position} glass rounded-xl px-4 py-3 flex items-center gap-3 shadow-glass animate-float ${className}`}
    >
      <div className="flex items-center justify-center">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-text-muted font-medium">{title}</span>
        <span className="text-sm font-bold text-white tracking-wide">{value}</span>
      </div>
    </motion.div>
  );
};
