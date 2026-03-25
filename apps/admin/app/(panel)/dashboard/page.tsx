"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { RecentLeads } from "@/components/dashboard/RecentLeads";
import { Icon, type IconName } from "@exvion/ui";
import { useCountUp } from "@/hooks/useCountUp";
import { useAuth } from "@/hooks/useAuth";

interface Stats {
  total: number;
  newLeads: number;
  qualified: number;
  closed: number;
  highValue: number;
  today: number;
  conversionRate: string;
}

const StatCard = ({ icon, label, value, color, bg, index }: { 
  icon: IconName; label: string; value: number | string; color: string; bg: string; index: number 
}) => {
  const numericValue = typeof value === "number" ? value : parseFloat((value || 0).toString().replace('%', ''));
  const displayValue = useCountUp(numericValue);
  const suffix = typeof value === "string" && value.includes('%') ? '%' : '';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className={`${bg} rounded-2xl p-5 border border-white/5 min-w-[140px] md:min-w-0 flex-1`}
    >
      <div className={`mb-3 ${color}`}>
        <Icon name={icon} size={24} />
      </div>
      <div className={`text-2xl font-bold text-white`}>
        {displayValue}{suffix}
      </div>
      <div className="text-text-muted text-[10px] uppercase tracking-wider mt-1 font-bold">
        {label}
      </div>
    </motion.div>
  );
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    api.getStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <DashboardSkeleton />;
  if (!stats) return null;

  const cards = [
    { icon: "leads" as IconName, label: "Total Leads", value: stats.total, color: "text-white", bg: "bg-white/5" },
    { icon: "notification" as IconName, label: "New Today", value: stats.today, color: "text-blue-400", bg: "bg-blue-500/10" },
    { icon: "fire" as IconName, label: "High Value", value: stats.highValue, color: "text-brand-primary", bg: "bg-brand-primary/10" },
    { icon: "check" as IconName, label: "Closed", value: stats.closed, color: "text-green-400", bg: "bg-green-500/10" },
    { icon: "chart" as IconName, label: "Conversion", value: `${stats.conversionRate}%`, color: "text-purple-400", bg: "bg-purple-500/10" },
    { icon: "strategy" as IconName, label: "Qualified", value: stats.qualified, color: "text-yellow-400", bg: "bg-yellow-500/10" },
  ];

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-8">
      {/* Mobile Greeting Card */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:hidden glass p-6 rounded-3xl border border-brand-primary/20 bg-gradient-brand-subtle overflow-hidden relative"
      >
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-white mb-1">
            {getTimeGreeting()}, {user?.name?.split(' ')[0] || "Admin"}
          </h1>
          <p className="text-brand-primary font-medium text-xs">
            You have {stats.today} new leads to review today.
          </p>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
          <Icon name="dashboard" size={120} />
        </div>
      </motion.div>

      {/* Desktop Header */}
      <div className="hidden md:block">
        <h1 className="text-2xl font-bold text-white">
          {getTimeGreeting()}, {user?.name || "Admin"}
        </h1>
        <p className="text-text-muted text-sm mt-1">
          Here's your lead pipeline overview for today.
        </p>
      </div>

      {/* Stats Row - Horizontal Scroll on Mobile */}
      <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        {cards.map((card, i) => (
          <StatCard key={card.label} {...card} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Pipeline Health */}
          <div className="glass rounded-3xl p-8 border border-white/5 space-y-6">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Icon name="pipeline" size={20} className="text-brand-primary" />
              Pipeline Health
            </h3>
            <div className="flex items-center gap-2 h-4 rounded-full overflow-hidden bg-white/5 p-1">
              {[
                { pct: stats.total > 0 ? (stats.newLeads / stats.total) * 100 : 0, color: "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" },
                { pct: stats.total > 0 ? (stats.qualified / stats.total) * 100 : 0, color: "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]" },
                { pct: stats.total > 0 ? (stats.closed / stats.total) * 100 : 0, color: "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" },
              ].map((bar, i) => (
                <motion.div
                  key={i}
                  initial={{ width: 0 }}
                  animate={{ width: `${bar.pct}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                  className={`h-full ${bar.color} rounded-full`}
                />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "New", color: "bg-blue-500", value: stats.newLeads },
                { label: "Qualified", color: "bg-yellow-500", value: stats.qualified },
                { label: "Closed", color: "bg-green-500", value: stats.closed },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-[10px] uppercase font-bold text-text-muted">{item.label}</span>
                  </div>
                  <span className="text-lg font-bold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <RecentLeads />
        </div>

        {/* Quick Actions / Activity - For Desktop */}
        <div className="hidden lg:block space-y-8">
          <div className="glass rounded-3xl p-8 border border-white/5">
            <h3 className="text-white font-bold mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 hover:bg-brand-primary/10 border border-white/5 hover:border-brand-primary/30 transition-all group">
                <Icon name="export" size={24} className="text-text-muted group-hover:text-brand-primary" />
                <span className="text-sm font-semibold text-white">Full Export</span>
              </button>
              <button className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 hover:bg-brand-primary/10 border border-white/5 hover:border-brand-primary/30 transition-all group">
                <Icon name="settings" size={24} className="text-text-muted group-hover:text-brand-primary" />
                <span className="text-sm font-semibold text-white">Config</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DashboardSkeleton = () => (
  <div className="space-y-8">
    <div className="h-32 glass rounded-3xl animate-pulse" />
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-28 glass rounded-2xl animate-pulse" />
      ))}
    </div>
    <div className="h-64 glass rounded-3xl animate-pulse" />
  </div>
);
