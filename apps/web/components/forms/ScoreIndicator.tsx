"use client";

import { motion } from "framer-motion";

interface ScoreIndicatorProps {
  score: number;
  qualifyingThreshold: number;
  accentColor: string;
}

export function ScoreIndicator({ score, qualifyingThreshold, accentColor }: ScoreIndicatorProps) {
  // Typical max score for forms is ~120
  const maxScore = 120;
  const clampedScore = Math.min(score, maxScore);
  const percentage = (clampedScore / maxScore) * 100;
  
  let colorClass = "bg-red-500";
  if (score >= qualifyingThreshold) {
    colorClass = ""; // We will use inline style for accentColor
  } else if (score >= 31) {
    colorClass = "bg-yellow-500";
  }

  return (
    <div className="absolute top-4 right-4 flex items-center gap-3">
      <div className="text-right">
        <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-1">
          Match Score
        </p>
        <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden" title="Higher score = faster response">
          <motion.div 
            className={`h-full rounded-full ${colorClass}`}
            style={{ backgroundColor: score >= qualifyingThreshold ? accentColor : undefined }}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </div>
      </div>
      <p className="text-xs font-mono font-bold text-white/80 w-6 text-right">
        {score}
      </p>
    </div>
  );
}
