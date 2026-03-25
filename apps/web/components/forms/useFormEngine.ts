import { useState, useMemo, useCallback } from "react";
import { FormConfig, FormField } from "@exvion/types";
import { submitLead } from "@/lib/api";

type FormAnswers = Record<string, string | string[]>;

export function useFormEngine(config: FormConfig) {
  // 1. Basic State
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormAnswers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [disqualifyMessage, setDisqualifyMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  const totalSteps = config.steps.length;
  const progressPct = ((currentStep + 1) / totalSteps) * 100;

  // 2. Helper Logic
  const evaluateShowIf = useCallback((field: FormField, data: FormAnswers) => {
    if (!field?.showIf) return true;
    const targetValue = data[field.showIf.field];
    if (Array.isArray(targetValue)) {
      return targetValue.some(v => field.showIf!.values.includes(v));
    }
    return targetValue ? field.showIf.values.includes(targetValue as string) : false;
  }, []);

  const validateSingleField = useCallback((field: FormField, val: any): string | null => {
    if (field.required) {
      if (val === undefined || val === null || val === "" || (Array.isArray(val) && val.length === 0)) {
        return "This field is required";
      }
    }
    if (val && typeof val === "string") {
      if (field.type === "email" && !/^\S+@\S+\.\S+$/.test(val)) return "Please enter a valid email address";
      if (field.type === "phone" && val.replace(/\D/g, "").length < 10) return "Must be at least 10 digits";
      if (field.type === "url" && !/^https?:\/\/.*/.test(val)) return "URL must start with http:// or https://";
      if (field.minLength && val.length < field.minLength) return `Must be at least ${field.minLength} characters`;
    }
    return null;
  }, []);

  // 3. Computed Props
  const currentStepFields = useMemo(() => {
    const step = config.steps[currentStep];
    if (!step) return [];
    return step.fields.filter(f => evaluateShowIf(f, formData));
  }, [currentStep, formData, config.steps, evaluateShowIf]);

  const score = useMemo(() => {
    let s = 0;
    config.steps.forEach(step => {
      step.fields.forEach(f => {
        const val = formData[f.id];
        if (!val || !f.options) return;
        if (Array.isArray(val)) {
          val.forEach(v => {
            const opt = f.options!.find(o => o.value === v);
            if (opt?.scoreWeight) s += opt.scoreWeight;
          });
        } else {
          const opt = f.options.find(o => o.value === val);
          if (opt?.scoreWeight) s += opt.scoreWeight;
        }
      });
    });
    return s;
  }, [formData, config.steps]);

  // 4. Action Handlers
  const setFieldValue = useCallback((id: string, value: string | string[]) => {
    setFormData(prev => {
      if (prev[id] === value) return prev;
      return { ...prev, [id]: value };
    });

    // Clear error for this field if it exists
    setErrors(prev => {
      if (!prev[id]) return prev;
      const field = config.steps.flatMap(s => s.fields).find(f => f.id === id);
      if (!field) return prev;
      const err = validateSingleField(field, value);
      if (err) return { ...prev, [id]: err };
      const next = { ...prev };
      delete next[id];
      return next;
    });

    // Disqualification Check
    const field = config.steps.flatMap(s => s.fields).find(f => f.id === id);
    if (field?.disqualifyIf && value) {
      const match = Array.isArray(value) 
        ? value.some(v => field.disqualifyIf!.values.includes(v))
        : field.disqualifyIf.values.includes(value as string);
      if (match) {
        setIsDisqualified(true);
        setDisqualifyMessage(field.disqualifyIf.message);
      }
    }
  }, [config.steps, validateSingleField]);

  const nextStep = useCallback(() => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    currentStepFields.forEach(field => {
      const err = validateSingleField(field, formData[field.id]);
      if (err) {
        newErrors[field.id] = err;
        isValid = false;
      }
    });

    if (isValid) {
      setErrors({});
      setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
    } else {
      setErrors(newErrors);
    }
  }, [currentStepFields, formData, totalSteps, validateSingleField]);

  const prevStep = useCallback(() => {
    setErrors({});
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const handleGoBack = useCallback(() => {
    setIsDisqualified(false);
    setDisqualifyMessage("");
  }, []);

  const submitForm = async () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    currentStepFields.forEach(field => {
      const err = validateSingleField(field, formData[field.id]);
      if (err) {
        newErrors[field.id] = err;
        isValid = false;
      }
    });

    if (!isValid) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    setSubmissionError("");

    const answers = Object.entries(formData).map(([k, v]) => {
      const field = config.steps.flatMap(s => s.fields).find(f => f.id === k);
      return {
        question: field?.label || k,
        answer: Array.isArray(v) ? v.join(", ") : v
      };
    });

    const payload = {
      name: (formData.name as string) || "",
      email: (formData.email as string) || "",
      phone: (formData.phone as string) || "",
      serviceType: config.serviceId,
      score,
      budget: (formData.budget_allocation as string) || undefined,
      timeline: (formData.launch_window as string) || (formData.timeline as string) || undefined,
      description: (formData.logic_description as string) || (formData.core_feature as string) || undefined,
      answers
    };

    try {
      await submitLead(payload);
      setIsSubmitted(true);
      const store = (await import("@/store/useFormStore")).useFormStore.getState();
      store.setSuccess(true);
    } catch (err: any) {
      setSubmissionError(err.message || "Failed to submit request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = useMemo(() => {
    const currentRequiredMet = currentStepFields.every(f => {
      const val = formData[f.id];
      if (!f.required) return true;
      return val !== undefined && val !== null && val !== "" && !(Array.isArray(val) && val.length === 0);
    });
    return currentRequiredMet && Object.keys(errors).length === 0;
  }, [currentStepFields, formData, errors]);

  return {
    currentStep,
    formData,
    errors,
    score,
    isDisqualified,
    disqualifyMessage,
    isSubmitting,
    isSubmitted,
    submissionError,
    totalSteps,
    progressPct,
    currentStepFields,
    canProceed,
    setFieldValue,
    nextStep,
    prevStep,
    submitForm,
    handleGoBack
  };
}
