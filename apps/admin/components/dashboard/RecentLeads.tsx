"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { ScoreBadge } from "@/components/leads/ScoreBadge";
import { StatusBadge } from "@/components/leads/StatusBadge";
import { Lead } from "@/store/useLeadsStore";

export const RecentLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    api.getLeads({ limit: 5, page: 1 })
      .then((data) => setLeads(data.data))
      .catch(console.error);
  }, []);

  return (
    <div className="glass rounded-2xl border border-white/5 overflow-hidden">
      <div className="flex items-center justify-between p-6 
        border-b border-white/5">
        <h3 className="text-white font-bold">Recent Leads</h3>
        <Link href="/leads"
          className="text-brand-primary text-sm font-medium hover:underline">
          View All →
        </Link>
      </div>

      <div className="divide-y divide-white/5">
        {leads.map((lead) => (
          <Link key={lead.id} href={`/leads/${lead.id}`}>
            <div className="flex items-center gap-4 p-4 
              hover:bg-white/3 transition-all group">
              <div className="w-10 h-10 rounded-full bg-brand-primary/15 
                flex items-center justify-center text-brand-primary 
                font-bold text-sm shrink-0">
                {lead.name[0]}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm 
                  group-hover:text-brand-primary transition-colors truncate">
                  {lead.name}
                </p>
                <p className="text-text-muted text-xs truncate">
                  {lead.serviceType}
                </p>
              </div>

              <ScoreBadge score={lead.score} />
              <StatusBadge status={lead.status} />

              <p className="text-text-muted text-xs hidden md:block shrink-0">
                {new Date(lead.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
