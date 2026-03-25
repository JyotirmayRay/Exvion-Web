export interface ScoringInput {
  budget?: string;
  timeline?: string;
  stage?: string;
  features?: string | string[];
  projectType?: string;
}

export interface ScoringResult {
  score: number;
  tier: "high" | "medium" | "low";
  reasons: string[];
}

export const calculateLeadScore = (data: ScoringInput): ScoringResult => {
  let score = 0;
  const reasons: string[] = [];

  // Budget scoring (highest weight)
  if (data.budget === "above_2l" || data.budget === "above_1l" || data.budget === "above_75k") {
    score += 50;
    reasons.push("High budget");
  } else if (data.budget === "50k_2l" || data.budget === "30k_1l" || data.budget === "25k_75k") {
    score += 25;
    reasons.push("Medium budget");
  } else if (data.budget === "under_50k" || data.budget === "under_30k" || data.budget === "under_25k") {
    score += 5;
    reasons.push("Low budget");
  }

  // Timeline scoring (urgency signal)
  if (data.timeline === "urgent") {
    score += 20;
    reasons.push("Urgent timeline");
  } else if (data.timeline === "1_month" || data.timeline === "2_weeks") {
    score += 12;
    reasons.push("Ready within 1 month");
  } else if (data.timeline === "1_3_months") {
    score += 6;
    reasons.push("Planning 1–3 months");
  }

  // Stage scoring
  if (data.stage === "scaling" || data.stage === "rebrand" || data.stage === "growth") {
    score += 30;
    reasons.push("Scaling/Rebranding existing product");
  } else if (data.stage === "mvp" || data.stage === "seed") {
    score += 15;
    reasons.push("Building MVP");
  } else if (data.stage === "rebuild") {
    score += 20;
    reasons.push("Rebuilding existing system");
  } else if (data.stage === "idea") {
    score += 5;
    reasons.push("Early stage idea");
  }

  // Features complexity bonus
  const features = Array.isArray(data.features)
    ? data.features
    : data.features?.split(", ") || [];

  if (features.length > 5) {
    score += 15;
    reasons.push("Complex feature requirements");
  } else if (features.length > 2) {
    score += 8;
    reasons.push("Moderate feature requirements");
  }

  // Tier classification
  let tier: "high" | "medium" | "low";
  if (score >= 70) tier = "high";
  else if (score >= 35) tier = "medium";
  else tier = "low";

  return { score, tier, reasons };
};
