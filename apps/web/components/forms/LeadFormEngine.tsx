"use client";

import { useFormEngine } from "./useFormEngine";
import { FormConfig } from "@exvion/types";
import { FormField } from "./FormField";
import { FormProgress } from "./FormProgress";
import { ScoreIndicator } from "./ScoreIndicator";
import { DisqualifyGate } from "./DisqualifyGate";
import { SuccessScreen } from "./SuccessScreen";
import { motion, AnimatePresence } from "framer-motion";

interface LeadFormEngineProps {
  config: FormConfig;
  serviceTitle: string;
  accentColor: string;
  onClose?: () => void;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    position: "absolute" as const,
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative" as const,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
    position: "absolute" as const,
  }),
};

export function LeadFormEngine({ config, serviceTitle, accentColor, onClose }: LeadFormEngineProps) {
  const {
    currentStep,
    formData,
    errors,
    score,
    isDisqualified,
    disqualifyMessage,
    isSubmitting,
    isSubmitted,
    totalSteps,
    currentStepFields,
    canProceed,
    setFieldValue,
    nextStep,
    prevStep,
    submitForm,
    handleGoBack
  } = useFormEngine(config);

  if (isSubmitted) {
    return (
      <div className="w-full relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <SuccessScreen 
          message={config.successMessage} 
          serviceTitle={serviceTitle}
          leadName={(formData.name as string) || "Founder"}
          accentColor={accentColor}
        />
        {onClose && (
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full relative bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex flex-col min-h-[500px]">
      {/* HEADER */}
      <div className="px-6 py-6 border-b border-white/5 flex items-start justify-between bg-white/[0.02]">
        <div>
          <h2 className="text-xl font-bold text-white mb-1 tracking-tight">Project Inquiry</h2>
          <p className="text-sm font-medium" style={{ color: accentColor }}>{serviceTitle}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </div>

      <div className="relative px-6 py-6 flex-grow flex flex-col">
        {/* LIVE SCORE (Hidden on step 1) */}
        {currentStep > 0 && (
          <ScoreIndicator score={score} qualifyingThreshold={config.qualifyingThreshold} accentColor={accentColor} />
        )}

        <FormProgress 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
          accentColor={accentColor} 
          stepTitles={config.steps.map(s => s.title)} 
        />

        <div className="mb-6 flex-grow relative">
          <AnimatePresence initial={false} custom={1} mode="popLayout">
            <motion.div
              key={currentStep}
              custom={1}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              className="w-full"
            >
              {config.steps[currentStep] && (
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{config.steps[currentStep].title}</h3>
                  {config.steps[currentStep].subtitle && (
                    <p className="text-white/60 font-medium">{config.steps[currentStep].subtitle}</p>
                  )}
                </div>
              )}

              <div className="space-y-1">
                {currentStepFields.map((field) => (
                  <FormField
                    key={field.id}
                    field={field}
                    value={formData[field.id] || ""}
                    error={errors[field.id]}
                    onChange={setFieldValue}
                    accentColor={accentColor}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5 bg-[#0a0a0a]/50 -mx-6 px-6 -mb-6 pb-6 rounded-b-3xl">
          {currentStep > 0 && (
             <button
               type="button"
               onClick={prevStep}
               className="px-6 py-3.5 rounded-xl font-medium text-white/70 bg-white/5 hover:bg-white/10 hover:text-white transition-colors border border-white/10"
             >
               Back
             </button>
          )}
          
          <div className="flex-grow" />

          {currentStep < totalSteps - 1 ? (
             <button
               type="button"
               onClick={nextStep}
               disabled={!canProceed}
               className="px-8 py-3.5 rounded-xl font-medium text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl group flex items-center gap-2"
               style={{ backgroundColor: accentColor }}
             >
               Next Step
               <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
             </button>
          ) : (
             <button
               type="button"
               onClick={submitForm}
               disabled={!canProceed || isSubmitting}
               className="px-8 py-3.5 rounded-xl font-bold text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center min-w-[140px]"
               style={{ backgroundColor: accentColor }}
             >
               {isSubmitting ? (
                 <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
               ) : "Submit Request"}
             </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isDisqualified && (
          <DisqualifyGate 
             message={disqualifyMessage}
             serviceTitle={serviceTitle}
             onGoBack={handleGoBack}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
