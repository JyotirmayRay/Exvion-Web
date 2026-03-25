export interface FormOption {
  value: string;
  label: string;
  icon?: string;
}

export interface FormStep {
  id: string;
  question: string;
  type: "single" | "multi" | "textarea" | "contact";
  options?: FormOption[];
  placeholder?: string;
  fields?: string[];
}

export interface FormConfig {
  service: string;
  steps: FormStep[];
}

export const loadFormConfig = async (slug: string): 
  Promise<FormConfig> => {
  const config = await import(`@/config/forms/${slug}.json`);
  return config.default;
};

export const calculateScore = (answers: Record<string, 
  string | string[]>): number => {
  let score = 0;

  const budget = answers.budget as string;
  const timeline = answers.timeline as string;
  const stage = answers.stage as string;
  const features = answers.features as string[];

  if (budget === "above_2l" || budget === "above_1l" || budget === "above_75k") score += 50;
  else if (budget === "50k_2l" || budget === "30k_1l" || budget === "25k_75k") score += 25;

  if (timeline === "urgent") score += 20;
  else if (timeline === "1_month" || timeline === "2_weeks") score += 10;

  if (stage === "scaling" || stage === "rebrand" || stage === "growth") score += 30;
  else if (stage === "mvp" || stage === "seed") score += 15;

  if (features?.length > 4) score += 15;
  else if (features?.length > 2) score += 8;

  return score;
};
