"use client";
import { usePathname } from "next/navigation";
import { api } from "@/lib/api";
import { Icon } from "@exvion/ui";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/leads": "All Leads",
  "/settings": "Settings",
};

export const TopBar = () => {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "Leads";

  return (
    <header className="sticky top-0 z-30 glass border-b 
      border-white/5 px-6 py-4 flex items-center justify-between">
      <h2 className="text-white font-bold text-lg">{title}</h2>
      <div className="flex items-center gap-3">
        <button
          onClick={() => api.exportCsv()}
          className="btn-secondary text-xs px-4 py-2 rounded-lg flex items-center gap-2">
          <Icon name="export" size={14} /> Export CSV
        </button>
        <div className="w-2 h-2 rounded-full bg-green-400 
          animate-pulse" title="API Connected" />
      </div>
    </header>
  );
};
