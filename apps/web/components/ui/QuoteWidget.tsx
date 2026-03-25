"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Icon } from "@exvion/ui";

export const QuoteWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 btn-primary 
          rounded-full shadow-glow-lg flex items-center gap-2 px-5 py-3"
      >
        <Icon name="fire" size={18} className="text-white" />
        <span className="text-sm font-semibold">Get Instant Quote</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-6 z-50 w-80 glass 
              rounded-2xl p-6 shadow-glass"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-text-muted 
                hover:text-white transition-colors"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-2">Start Your Project</h3>
            <p className="text-text-secondary text-sm mb-4">
              Tell us what you need — get a plan in 24 hours.
            </p>
            <a href="/services" className="btn-primary w-full 
              justify-center text-sm gap-2">
              Answer 5 Quick Questions <Icon name="arrow-right" size={14} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
