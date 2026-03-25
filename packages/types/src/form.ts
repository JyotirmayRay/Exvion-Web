export type FieldType =
  | "text"
  | "email"
  | "phone"
  | "select"
  | "multiselect"
  | "textarea"
  | "radio"
  | "number"
  | "url";

export interface FieldOption {
  value: string;
  label: string;
  scoreWeight: number;
  triggersField?: string;
}

export interface FormField {
  id: string;
  label: string;
  sublabel?: string;
  type: FieldType;
  required: boolean;
  options?: FieldOption[];
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  scoreWeight?: number;
  showIf?: {
    field: string;
    values: string[];
  };
  disqualifyIf?: {
    field: string;
    values: string[];
    message: string;
  };
}

export interface FormStep {
  id: string;
  title: string;
  subtitle: string;
  fields: FormField[];
}

export interface FormConfig {
  id: string;
  serviceId: string;
  steps: FormStep[];
  qualifyingThreshold: number;
  disqualifyMessage: string;
  successMessage: string;
}
