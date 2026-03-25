"use client";
import { motion } from "framer-motion";

interface FloatingCardProps {
  icon: string;
  label: string;
  delay?: number;
  position?: string;
}

export const FloatingCard = ({
  icon,
  label,
  delay = 0,
  position = "",
}: FloatingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className={`absolute ${position} glass rounded-xl px-4 py-3 
        flex items-center gap-3 shadow-glass animate-float`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-semibold text-white">{label}</span>
    </motion.div>
  );
};
