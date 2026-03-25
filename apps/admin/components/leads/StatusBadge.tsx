const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  QUALIFIED: "bg-purple-500/15 text-purple-400 border-blue-500/20",
  CONTACTED: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  CALL_BOOKED: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  PROPOSAL_SENT: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
  PROPOSAL: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
  CLOSED: "bg-green-500/15 text-green-400 border-green-500/20",
  WON: "bg-green-500/15 text-green-400 border-green-500/20",
  REJECTED: "bg-red-500/15 text-red-400 border-red-500/20",
  LOST: "bg-red-500/15 text-red-400 border-red-500/20",
};

export const StatusBadge = ({ status }: { status: string }) => (
  <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold 
    border shrink-0 uppercase tracking-wide
    ${STATUS_STYLES[status] || STATUS_STYLES.NEW}`}>
    {status.replace("_", " ")}
  </span>
);
