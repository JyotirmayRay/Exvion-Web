"use client";
import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import { Lead, useLeadsStore } from "@/store/useLeadsStore";
import { Icon } from "@exvion/ui";
import { ScoreBadge } from "@/components/leads/ScoreBadge";
import { StatusBadge } from "@/components/leads/StatusBadge";
import { NotesPanel } from "@/components/leads/NotesPanel";
import { StatusSelector } from "@/components/leads/StatusSelector";

type Tab = "overview" | "answers" | "activity" | "actions";

export default function LeadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { updateLeadStatus } = useLeadsStore();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setLoading(true);
    setLead(null);
    api.getLead(id)
      .then(setLead)
      .catch((err) => {
        console.error("Failed to fetch lead:", err);
        router.push("/leads");
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  const handleStatusChange = async (status: string) => {
    try {
      await api.updateStatus(id, status);
      updateLeadStatus(id, status);
      setLead((prev) => prev ? { ...prev, status } : null);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <div className="w-12 h-12 border-3 border-brand-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-text-muted text-sm font-medium animate-pulse">Loading lead intelligence...</p>
    </div>
  );

  if (!lead) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header / Back Navigation */}
      <div className="flex items-center justify-between px-1">
        <button 
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-text-muted hover:text-white transition-all py-2"
        >
          <div className="p-1.5 rounded-lg glass border border-white/5 group-hover:border-white/20">
            <Icon name="arrow-left" size={14} />
          </div>
          <span className="text-sm font-bold tracking-tight">Pipeline</span>
        </button>
        <div className="flex items-center gap-2">
           <button className="p-2 rounded-xl glass border border-white/5 text-text-muted hover:text-white">
             <Icon name="menu" size={18} />
           </button>
        </div>
      </div>

      {/* Main Identity Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-6 md:p-8 border border-white/5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Icon name="leads" size={120} />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-3xl border border-brand-primary/20 shadow-glow-sm">
              {(lead.name?.[0] || 'L').toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-white text-2xl md:text-3xl font-black tracking-tighter">
                  {lead.name}
                </h1>
                <StatusBadge status={lead.status} />
              </div>
              <p className="text-text-muted text-sm mt-1 flex items-center gap-2">
                <Icon name="email" size={12} /> {lead.email}
              </p>
              <div className="flex items-center gap-4 mt-3">
                 <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-text-muted bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    <Icon name="calendar" size={10} />
                    {lead.createdAt ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(lead.createdAt)) : "—"}
                 </div>
                 <ScoreBadge score={lead.score} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a href={`tel:${lead.phone}`} className="flex-1 md:flex-none btn-primary py-3 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20">
              <Icon name="call" size={18} />
              <span className="font-bold">Call Now</span>
            </a>
            <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="p-3 rounded-2xl bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-all">
              <Icon name="whatsapp" size={24} />
            </a>
            <button className="p-3 rounded-2xl glass border border-white/5 hover:border-white/20 transition-all">
              <Icon name="copy" size={20} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Tabbed Content / Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Mobile Tabs Selector (Hidden on Desktop) */}
        <div className="lg:hidden flex items-center gap-1 p-1 glass rounded-2xl border border-white/5 mx-1">
          {(["overview", "answers", "activity", "actions"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === t ? "bg-white/10 text-white shadow-sm" : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8 space-y-6">
           {(activeTab === "overview" || !isMobile) && (
             <motion.div 
               key="overview"
               initial={{ opacity: 0, x: -10 }} 
               animate={{ opacity: 1, x: 0 }}
               className={`${activeTab === "overview" ? 'block' : 'hidden lg:block'} glass rounded-3xl p-6 border border-white/5`}
             >
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold flex items-center gap-2 uppercase tracking-widest text-xs">
                     <Icon name="pipeline" size={16} className="text-brand-primary" /> Project Intelligence
                  </h3>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                 {[
                   { label: "Service", value: lead.serviceType, icon: "saas-mvp" },
                   { label: "Budget Range", value: lead.budget || "—", icon: "budget" },
                   { label: "Timeline", value: lead.timeline || "—", icon: "calendar" },
                   { label: "Current Stage", value: lead.stage || "—", icon: "pipeline" },
                   { label: "Source", value: lead.source || "Direct", icon: "link" },
                   { label: "Company", value: lead.company || "—", icon: "marketplace" },
                 ].map((item) => (
                   <div key={item.label} className="space-y-1">
                     <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">{item.label}</p>
                     <div className="flex items-center gap-2">
                        <span className="text-white text-sm font-bold">{item.value}</span>
                     </div>
                   </div>
                 ))}
               </div>

               {lead.description && (
                 <div className="mt-8 pt-8 border-t border-white/5">
                   <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest mb-3">Project Brief</p>
                   <p className="text-text-secondary text-sm leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/5 italic">
                     "{lead.description}"
                   </p>
                 </div>
               )}
             </motion.div>
           )}

           {(activeTab === "answers" || !isMobile) && (
             <motion.div 
               key="answers"
               initial={{ opacity: 0, x: -10 }} 
               animate={{ opacity: 1, x: 0 }}
               className={`${activeTab === "answers" ? 'block' : 'hidden lg:block'} space-y-4`}
             >
               <div className="glass rounded-3xl p-6 border border-white/5">
                  <h3 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
                    <Icon name="leads" size={16} className="text-brand-primary" /> Form Submissions
                  </h3>
                  <div className="space-y-4">
                    {lead.answers && lead.answers.length > 0 ? (
                      lead.answers.map((ans, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all">
                          <p className="text-text-muted/60 uppercase tracking-widest text-[9px] font-bold mb-1.5">{ans.question}</p>
                          <p className="text-white text-sm font-bold leading-snug">{ans.answer}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-text-muted text-center py-8">No specific form answers recorded.</p>
                    )}
                  </div>
               </div>
             </motion.div>
           )}

           {(activeTab === "activity" || !isMobile) && (
             <motion.div 
               key="activity"
               initial={{ opacity: 0, x: -10 }} 
               animate={{ opacity: 1, x: 0 }}
               className={`${activeTab === "activity" ? 'block' : 'hidden lg:block'}`}
             >
               <NotesPanel leadId={lead.id} notes={lead.notes || []} />
             </motion.div>
           )}

           {activeTab === "actions" && (
              <motion.div
                key="actions"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:hidden space-y-6"
              >
                <StatusSelector currentStatus={lead.status} onStatusChange={handleStatusChange} />
              </motion.div>
           )}
        </div>

        {/* Sidebar - Actions & Flow (Desktop Only / Specific Tab Mobile) */}
        <div className="hidden lg:block lg:col-span-4 space-y-6">
          <StatusSelector
            currentStatus={lead.status}
            onStatusChange={handleStatusChange}
          />
          
          <div className="glass rounded-3xl p-6 border border-white/5">
             <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-[10px]">Quick Intelligence</h3>
             <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                   <p className="text-brand-primary text-[10px] font-bold uppercase tracking-tighter mb-1">Conversion Tip</p>
                   <p className="text-text-secondary text-xs leading-relaxed">
                      Lead score of {lead.score} indicates high intent. Follow up within 4 hours for maximum conversion probability.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}


