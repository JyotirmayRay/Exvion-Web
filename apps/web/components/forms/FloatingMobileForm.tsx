"use client";

import { FormConfig } from "@exvion/types";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { useFormStore } from "@/store/useFormStore";
import { useEffect } from "react";

interface FloatingMobileFormProps {
  config: FormConfig;
  serviceTitle: string;
  accentColor: string;
}

export function FloatingMobileForm({ accentColor }: FloatingMobileFormProps) {
  const { isModalOpen, openModal } = useFormStore();
  const pulseControls = useAnimationControls();

  // Periodic pulse animation to draw attention
  useEffect(() => {
    if (isModalOpen) return;
    const interval = setInterval(async () => {
      await pulseControls.start({
        scale: [1, 1.03, 1],
        transition: { duration: 0.5, ease: "easeInOut" },
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [isModalOpen, pulseControls]);

  return (
    <AnimatePresence>
      {!isModalOpen && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="fixed bottom-0 left-0 right-0 px-5 pb-6 sm:pb-8 pt-0 z-[60] flex justify-center pointer-events-none"
        >
          {/* Ambient glow layer beneath the button */}
          <div
            className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center bottom, ${accentColor}35 0%, transparent 70%)`,
            }}
          />

          {/* Button wrapper – allows the pulse loop */}
          <motion.div
            animate={pulseControls}
            className="relative pointer-events-auto w-full md:w-auto md:min-w-[480px]"
          >
            {/* Outer glow ring – pulses continuously */}
            <motion.div
              className="absolute -inset-[3px] rounded-2xl md:rounded-full opacity-60"
              style={{ background: `${accentColor}50` }}
              animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.015, 1] }}
              transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
            />

            <motion.button
              onClick={openModal}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-full overflow-hidden rounded-2xl md:rounded-full py-[18px] md:py-5 font-black text-sm md:text-[15px] uppercase tracking-[0.18em] text-white flex items-center justify-center gap-3 border border-white/25"
              style={{
                background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
                boxShadow: `0 8px 40px -8px ${accentColor}99, 0 2px 0 0 rgba(255,255,255,0.12) inset`,
              }}
            >
              {/* Shimmer sweep */}
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
                transition={{ duration: 2.2, ease: "linear", repeat: Infinity, repeatDelay: 1.5 }}
              />

              {/* Rocket / lightning icon */}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 shrink-0"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </motion.svg>

              <span className="relative z-10">Start This Project</span>

              {/* Arrow that slides in on hover */}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 shrink-0 opacity-70"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, delay: 0.3 }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </motion.svg>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
