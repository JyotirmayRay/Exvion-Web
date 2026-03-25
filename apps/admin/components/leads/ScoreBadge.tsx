export const ScoreBadge = ({ score }: { score: number }) => {
  const tier = score >= 70 ? "high" : score >= 35 ? "medium" : "low";
  const styles = {
    high: "bg-green-500/15 text-green-400 border-green-500/20",
    medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    low: "bg-white/5 text-text-muted border-white/10",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold 
      border shrink-0 ${styles[tier]}`}>
      {score}pts
    </span>
  );
};
