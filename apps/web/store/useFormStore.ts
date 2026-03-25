import { create } from "zustand";

export interface FormAnswers {
  [key: string]: string | string[];
}

interface FormStore {
  step: number;
  answers: FormAnswers;
  isSubmitting: boolean;
  isSuccess: boolean;
  isModalOpen: boolean;
  leadId: string | null;
  isBookingView: boolean;
  next: () => void;
  prev: () => void;
  openModal: () => void;
  closeModal: () => void;
  setAnswer: (key: string, value: string | string[]) => void;
  toggleMultiAnswer: (key: string, value: string) => void;
  setSubmitting: (val: boolean) => void;
  setSuccess: (val: boolean, leadId?: string | null) => void;
  setBookingView: (val: boolean) => void;
  reset: () => void;
}

export const useFormStore = create<FormStore>((set) => ({
  step: 0,
  answers: {},
  isSubmitting: false,
  isSuccess: false,
  isModalOpen: false,
  leadId: null,
  isBookingView: false,

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, isSuccess: false, isBookingView: false, step: 0, leadId: null }),

  next: () => set((state) => ({ step: state.step + 1 })),
  prev: () => set((state) => ({ step: Math.max(0, state.step - 1) })),

  setAnswer: (key, value) =>
    set((state) => ({
      answers: { ...state.answers, [key]: value },
    })),

  toggleMultiAnswer: (key, value) =>
    set((state) => {
      const current = (state.answers[key] as string[]) || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { answers: { ...state.answers, [key]: updated } };
    }),

  setSubmitting: (val) => set({ isSubmitting: val }),
  setSuccess: (val, leadId = null) => set({ isSuccess: val, leadId }),
  setBookingView: (val) => set({ isBookingView: val }),
  reset: () => set({ step: 0, answers: {}, isSuccess: false, isBookingView: false, leadId: null }),
}));
