export const calculateLeadScore = (answers: Record<string, any>): number => {
  let score = 0;
  // Simple scoring logic based on budget and timeline
  if (answers.budget?.includes('$10k+')) score += 50;
  if (answers.timeline?.includes('Immediately')) score += 30;
  return score;
};
