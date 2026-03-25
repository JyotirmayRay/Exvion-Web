"use client";

const STATUSES = [
  { value: "NEW", label: "New", icon: "🔵" },
  { value: "QUALIFIED", label: "Qualified", icon: "🟣" },
  { value: "CONTACTED", label: "Contacted", icon: "🟡" },
  { value: "CONTACTED", label: "Call Booked", icon: "🟠" },
  { value: "PROPOSAL", label: "Proposal Sent", icon: "🔷" },
  { value: "WON", label: "Closed ✅", icon: "🟢" },
  { value: "LOST", label: "Rejected", icon: "🔴" },
];

interface Props {
  currentStatus: string;
  onStatusChange: (status: string) => void;
}

export const StatusSelector = ({ currentStatus, onStatusChange }: Props) => (
  <div className="glass rounded-2xl p-5 border border-white/5">
    <h3 className="text-white font-bold mb-4 text-sm">
      🎯 Update Status
    </h3>
    <div className="space-y-2">
      {STATUSES.map((s) => (
        <button
          key={s.value}
          onClick={() => onStatusChange(s.value)}
          className={`w-full flex items-center gap-3 p-3 rounded-xl
            text-sm font-medium transition-all text-left
            ${currentStatus === s.value
              ? "bg-brand-primary/15 border border-brand-primary/30 text-white"
              : "text-text-secondary hover:bg-white/5 hover:text-white border border-transparent"
            }`}
        >
          <span>{s.icon}</span>
          {s.label}
          {currentStatus === s.value && (
            <span className="ml-auto text-brand-primary text-xs">
              Current
            </span>
          )}
        </button>
      ))}
    </div>
  </div>
);
