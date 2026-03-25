interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percent = Math.round(((current + 1) / total) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-text-muted mb-2">
        <span>Step {current + 1} of {total}</span>
        <span>{percent}% complete</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-brand rounded-full transition-all 
            duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
