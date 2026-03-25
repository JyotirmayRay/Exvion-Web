"use client";
import { motion } from "framer-motion";
import { Icon } from "@exvion/ui";
import { FormStep } from "@/lib/form-engine";
import { useFormStore } from "@/store/useFormStore";

interface StepRendererProps {
  step: FormStep;
}

export const StepRenderer = ({ step }: StepRendererProps) => {
  const { answers, setAnswer, toggleMultiAnswer, next } = useFormStore();

  if (step.type === "single") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {step.options?.map((opt) => {
          const isSelected = answers[step.id] === opt.value;
          return (
            <motion.button
              key={opt.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setAnswer(step.id, opt.value);
                setTimeout(() => next(), 300);
              }}
              className={`
                flex items-center gap-3 p-4 rounded-xl border text-left
                transition-all duration-200
                ${isSelected
                  ? "border-brand-primary bg-brand-primary/10 text-white"
                  : "border-white/8 glass text-text-secondary hover:border-brand-primary/40 hover:text-white"
                }
              `}
            >
              {opt.icon && (
                <span className="text-xl shrink-0">{opt.icon}</span>
              )}
              <span className="font-medium text-sm">{opt.label}</span>
              {isSelected && (
                <Icon name="check" size={16} className="ml-auto text-brand-primary" />
              )}
            </motion.button>
          );
        })}
      </div>
    );
  }

  if (step.type === "multi") {
    const selected = (answers[step.id] as string[]) || [];
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {step.options?.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return (
              <motion.button
                key={opt.value}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => toggleMultiAnswer(step.id, opt.value)}
                className={`
                  flex items-center gap-2 p-3 rounded-xl border text-left
                  transition-all duration-200 text-sm
                  ${isSelected
                    ? "border-brand-primary bg-brand-primary/10 text-white"
                    : "border-white/8 glass text-text-secondary hover:border-white/20"
                  }
                `}
              >
                <span className={`w-4 h-4 rounded border shrink-0 flex 
                  items-center justify-center text-xs
                  ${isSelected
                    ? "bg-brand-primary border-brand-primary text-white"
                    : "border-white/20"
                  }`}>
                  {isSelected && <Icon name="check" size={10} />}
                </span>
                {opt.label}
              </motion.button>
            );
          })}
        </div>
        <p className="text-text-muted text-xs text-center">
          Select all that apply — then click Next
        </p>
      </div>
    );
  }

  if (step.type === "textarea") {
    return (
      <textarea
        value={(answers[step.id] as string) || ""}
        onChange={(e) => setAnswer(step.id, e.target.value)}
        placeholder={step.placeholder}
        rows={5}
        className="w-full glass rounded-xl p-4 text-white text-sm
          placeholder:text-text-muted border border-white/8
          focus:border-brand-primary/40 focus:outline-none
          resize-none transition-all"
      />
    );
  }

  if (step.type === "contact") {
    const fieldLabels: Record<string, string> = {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone / WhatsApp",
      company: "Company (optional)",
    };
    return (
      <div className="space-y-4">
        {step.fields?.map((field) => (
          <div key={field}>
            <label className="block text-text-secondary text-xs 
              font-medium mb-1.5 uppercase tracking-wider">
              {fieldLabels[field]}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              value={(answers[field] as string) || ""}
              onChange={(e) => setAnswer(field, e.target.value)}
              placeholder={fieldLabels[field]}
              className="w-full glass rounded-xl p-4 text-white text-sm
                placeholder:text-text-muted border border-white/8
                focus:border-brand-primary/40 focus:outline-none
                transition-all"
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
};
