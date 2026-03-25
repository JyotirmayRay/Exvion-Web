"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormStore } from "@/store/useFormStore";
import { LeadFormEngine } from "./LeadFormEngine";
import { type FormConfig } from "@exvion/types";

interface ServiceFormModalProps {
  config: FormConfig;
  serviceTitle: string;
  accentColor: string;
}

export const ServiceFormModal = ({ config, serviceTitle, accentColor }: ServiceFormModalProps) => {
  const { isModalOpen, closeModal } = useFormStore();

  // Prevent background scrolling when modal is active
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, closeModal]);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Glassmorphic Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
          />
          
          {/* Popup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl z-10 custom-scrollbar bg-brand-dark border border-white/10"
            style={{ 
              boxShadow: `0 0 80px -20px ${accentColor}40`,
            }}
          >
            <LeadFormEngine 
              config={config} 
              serviceTitle={serviceTitle} 
              accentColor={accentColor}
              onClose={closeModal}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
