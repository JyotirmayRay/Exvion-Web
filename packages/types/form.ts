export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'radio' | 'textarea';
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export interface FormConfig {
  id: string;
  name: string;
  steps: FormStep[];
}

export interface FormAnswer {
  questionId: string;
  answer: string | string[];
}
