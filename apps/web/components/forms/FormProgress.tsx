"use client";

import { motion } from "framer-motion";

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  accentColor: string;
  stepTitles: string[];
}

export function FormProgress({ currentStep, totalSteps, accentColor, stepTitles }: FormProgressProps) {
  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between relative mb-2">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: accentColor }}
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </div>
        
        {Array.from({ length: totalSteps }).map((_, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;
          return (
            <div key={i} className="relative z-10 flex items-center justify-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2 
                  ${isCompleted ? 'text-white' : isCurrent ? 'bg-black text-white' : 'bg-black border-white/10 text-white/30'}
                `}
                style={{
                  backgroundColor: isCompleted ? accentColor : undefined,
                  borderColor: isCompleted || isCurrent ? accentColor : undefined,
                  boxShadow: isCurrent ? `0 0 15px ${accentColor}40` : 'none',
                }}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <span className="text-sm font-semibold">{i + 1}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-3">
        <p className="text-sm font-medium text-white/80 transition-all duration-300">
          Step {currentStep + 1}: <span className="text-white">{stepTitles[currentStep]}</span>
        </p>
      </div>
    </div>
  );
}
