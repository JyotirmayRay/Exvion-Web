"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@exvion/ui";
import { FormConfig, loadFormConfig, calculateScore } from "@/lib/form-engine";
import { useFormStore } from "@/store/useFormStore";
import { ProgressBar } from "./ProgressBar";
import { StepRenderer } from "./StepRenderer";

interface MultiStepFormProps {
  serviceSlug: string;
  serviceTitle: string;
}

export const MultiStepForm = ({
  serviceSlug,
  serviceTitle,
}: MultiStepFormProps) => {
  const [config, setConfig] = useState<FormConfig | null>(null);
  const {
    step, answers, isSubmitting, isSuccess,
    next, prev, setSubmitting, setSuccess,
  } = useFormStore();

  useEffect(() => {
    loadFormConfig(serviceSlug).then(setConfig);
  }, [serviceSlug]);

  if (!config) return (
    <div className="flex items-center justify-center h-48">
      <div className="w-8 h-8 border-2 border-brand-primary 
        border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const totalSteps = config.steps.length;
  const currentStep = config.steps[step];
  const isLastStep = step === totalSteps - 1;
  const isMultiOrText = currentStep?.type === "multi" || 
    currentStep?.type === "textarea" || 
    currentStep?.type === "contact";

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const score = calculateScore(answers);
      const payload = {
        ...answers,
        serviceType: serviceTitle,
        source: "service-page",
        score,
        answers: Object.entries(answers).map(([question, answer]) => ({
          question,
          answer: Array.isArray(answer) ? answer.join(", ") : answer,
        })),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/leads/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) setSuccess(true);
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 rounded-full bg-green-500/15 
          flex items-center justify-center mx-auto mb-4">
          <Icon name="check" size={32} className="text-green-500" />
        </div>
        <h3 className="text-white text-2xl font-bold mb-2">
          Request Received!
        </h3>
        <p className="text-text-secondary mb-6">
          Our team will review your project and reach out 
          within 24 hours with a clear plan.
        </p>
        <div className="glass rounded-xl p-4 text-sm text-text-secondary">
          <p className="flex items-center gap-2"><Icon name="email" size={14} /> Check your email for confirmation</p>
          <p className="mt-2 flex items-center gap-2"><Icon name="whatsapp" size={14} /> We may reach you on WhatsApp too</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      <ProgressBar current={step} total={totalSteps} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          {currentStep && (
            <>
              <h3 className="text-white font-bold text-xl mb-6">
                {currentStep.question}
              </h3>
              <StepRenderer step={currentStep} />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
        <div>
          {step > 0 && (
            <button
              onClick={prev}
              className="px-6 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm flex items-center gap-2 group"
            >
              <Icon name="arrow-left" size={16} className="transition-transform group-hover:-translate-x-1" />
              Back
            </button>
          )}
        </div>

        <div>
          {isLastStep ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary px-10 py-3 rounded-xl font-bold shadow-glow flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Submitting
                </>
              ) : (
                <>
                  Submit Request
                  <Icon name="check" size={18} />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={next}
              className="btn-primary px-10 py-3 rounded-xl font-bold shadow-glow flex items-center gap-2 group"
            >
              Next Step
              <Icon name="arrow-right" size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
