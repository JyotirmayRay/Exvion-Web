"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { api } from "@/lib/api";
import { useLeadsStore, Lead } from "@/store/useLeadsStore";
import { ScoreBadge } from "@/components/leads/ScoreBadge";
import { StatusBadge } from "@/components/leads/StatusBadge";
import { LeadsFilters } from "@/components/leads/LeadsFilters";
import { ImportLeads } from "@/components/leads/ImportLeads";
import { ExportLeads } from "@/components/leads/ExportLeads";
import { QuickCallLog } from "@/components/leads/QuickCallLog";
import { Icon } from "@exvion/ui";

export default function LeadsPage() {
  const { leads, total, pages, currentPage, filters,
    setLeads, setPage, resetFilters, selectedIds, toggleSelect, selectAll, clearSelection } = useLeadsStore();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [bulkUpdating, setBulkUpdating] = useState(false);
  const [callingLead, setCallingLead] = useState<Lead | null>(null);

  const fetchLeads = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    
    try {
      const data = await api.getLeads({
        ...filters,
        page: currentPage,
        limit: 20,
      });
      setLeads(data.data, data.total, data.pages);
      clearSelection();
      setIsSelectionMode(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filters, currentPage, setLeads, clearSelection]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  useEffect(() => {
    if (selectedIds.length === 0 && isSelectionMode) {
      setIsSelectionMode(false);
    }
  }, [selectedIds, isSelectionMode]);

  const handleBulkStatusUpdate = async (status: string) => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Update ${selectedIds.length} leads to ${status}?`)) return;
    setBulkUpdating(true);
    try {
      await api.bulkUpdateStatus(selectedIds, status);
      fetchLeads(true);
    } catch (err) {
      alert("Bulk update failed");
    } finally {
      setBulkUpdating(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    const confirmText = prompt(`Delete ${selectedIds.length} leads permanently? Type "DELETE" to confirm:`);
    if (confirmText !== "DELETE") return;
    
    setBulkUpdating(true);
    try {
      await api.bulkDelete(selectedIds);
      fetchLeads(true);
    } catch (err) {
      alert("Bulk delete failed");
    } finally {
      setBulkUpdating(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between px-1">
        <div className="hidden md:block">
          <h1 className="text-2xl font-bold text-white tracking-tight">Leads Dashboard</h1>
          <p className="text-text-muted text-sm mt-1">{total} total leads in pipeline</p>
        </div>
        <div className="md:hidden pt-2">
          <h1 className="text-xl font-bold text-white tracking-tight">Leads</h1>
          <p className="text-text-muted text-[10px] uppercase font-bold tracking-widest">{total} leads found</p>
        </div>
        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <button 
              onClick={() => clearSelection()}
              className="text-brand-primary text-[10px] font-bold uppercase tracking-widest px-3"
            >
              Deselect All
            </button>
          )}
          <Link href="/leads/pipeline" className="btn-secondary text-xs px-4 py-2 rounded-xl flex items-center gap-2">
            <Icon name="pipeline" size={14} />
            <span className="hidden sm:inline">Pipeline</span>
          </Link>
          <button 
            onClick={() => setShowImport(true)}
            className="btn-secondary text-xs px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <Icon name="import" size={14} />
            <span className="hidden sm:inline">Import</span>
          </button>
          <ExportLeads />
          <button 
            onClick={() => fetchLeads(true)}
            disabled={refreshing}
            className={`btn-secondary text-xs px-4 py-2 rounded-xl flex items-center gap-2 ${refreshing ? 'opacity-50' : ''}`}
          >
            <Icon name="refresh" size={14} className={refreshing ? 'animate-spin' : ''} />
            {refreshing ? 'Sync' : 'Sync'}
          </button>
        </div>
      </div>

      <LeadsFilters />

      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ y: 100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            exit={{ y: 100, x: "-50%", opacity: 0 }}
            className="fixed bottom-24 left-1/2 z-50 w-[95%] max-w-2xl"
          >
            <div className="glass border border-brand-primary/30 rounded-[2rem] p-4 flex items-center justify-between shadow-2xl shadow-brand-primary/20 backdrop-blur-xl bg-black/60">
              <div className="flex items-center gap-4 pl-2">
                <div className="flex flex-col">
                  <span className="text-white text-sm font-bold">{selectedIds.length} Selected</span>
                  <button onClick={clearSelection} className="text-brand-primary text-[10px] font-bold uppercase text-left hover:underline">Cancel</button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative group">
                  <select 
                    disabled={bulkUpdating}
                    onChange={(e) => handleBulkStatusUpdate(e.target.value)}
                    value=""
                    className="appearance-none bg-white/10 border border-white/10 rounded-2xl px-5 py-2.5 pr-10 text-xs text-white focus:outline-none focus:border-brand-primary/50 transition-all cursor-pointer"
                  >
                    <option value="" disabled>Change Status</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="QUALIFIED">Qualified</option>
                    <option value="PROPOSAL">Proposal</option>
                    <option value="WON">Won (Close)</option>
                    <option value="LOST">Lost (Reject)</option>
                  </select>
                  <Icon name="chevron-down" size={12} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                </div>
                
                <button 
                  onClick={handleBulkDelete}
                  disabled={bulkUpdating}
                  className="p-3 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/30 transition-all"
                  title="Delete Selected"
                >
                  <Icon name="delete" size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <LeadsSkeleton />
      ) : leads.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-16 text-center border border-white/5"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
            <Icon name="leads" size={32} className="text-text-muted" />
          </div>
          <p className="text-white font-bold text-xl">No matching leads</p>
          <p className="text-text-muted text-sm mt-2 max-w-xs mx-auto">
            We couldn't find any leads matching your current filter criteria.
          </p>
          <button 
            onClick={() => resetFilters()}
            className="mt-6 text-brand-primary font-semibold text-sm hover:underline"
          >
            Clear all filters
          </button>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <div className="hidden md:block glass rounded-3xl border border-white/5 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="p-5">
                    <input 
                      type="checkbox" 
                      onChange={(e) => {
                        if (e.target.checked) selectAll(leads.map((l: Lead) => l.id));
                        else clearSelection();
                      }}
                      checked={selectedIds.length === leads.length && leads.length > 0}
                      className="rounded border-white/20 bg-transparent text-brand-primary focus:ring-brand-primary"
                    />
                  </th>
                  {["Lead", "Service", "Budget", "Score", "Status", "Date", ""].map((h) => (
                    <th key={h} className="p-5 text-text-muted text-[10px] font-bold uppercase tracking-widest">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <AnimatePresence mode="popLayout">
                  {leads.map((lead: Lead, i: number) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ delay: i * 0.02 }}
                      className={`hover:bg-white/[0.03] transition-all group cursor-pointer ${selectedIds.includes(lead.id) ? 'bg-brand-primary/5' : ''}`}
                    >
                      <td className="p-5">
                        <input 
                          type="checkbox" 
                          checked={selectedIds.includes(lead.id)}
                          onChange={() => toggleSelect(lead.id)}
                          className="rounded border-white/20 bg-transparent text-brand-primary focus:ring-brand-primary"
                        />
                      </td>
                      <td className="p-5" onClick={() => window.location.href = `/leads/${lead.id}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold border border-brand-primary/20">
                            {(lead.name?.[0] || 'L').toUpperCase()}
                          </div>
                          <div>
                            <p className="text-white text-sm font-bold group-hover:text-brand-primary transition-colors">
                              {lead.name}
                            </p>
                            <p className="text-text-muted text-xs mt-0.5">{lead.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2">
                          <Icon name="saas-mvp" size={14} className="text-text-muted" />
                          <span className="text-text-secondary text-sm font-medium">{lead.serviceType}</span>
                        </div>
                      </td>
                      <td className="p-5">
                        <span className="text-text-secondary text-sm font-mono">{lead.budget || "—"}</span>
                      </td>
                      <td className="p-5">
                        <ScoreBadge score={lead.score} />
                      </td>
                      <td className="p-5">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="p-5 text-text-muted text-[11px] font-medium">
                        {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(lead.createdAt))}
                      </td>
                      <td className="p-5 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setCallingLead(lead);
                            }}
                            className="p-2 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20"
                          >
                            <Icon name="call" size={14} />
                          </button>
                          <Link href={`/leads/${lead.id}`} className="p-2 rounded-lg bg-brand-primary/10 text-brand-primary border border-brand-primary/20 hover:bg-brand-primary/20">
                            <Icon name="eye" size={14} />
                          </Link>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <div className="md:hidden flex flex-col gap-4 pb-32">
            {leads.map((lead) => (
              <MobileLeadCard 
                key={lead.id} 
                lead={lead} 
                onCall={setCallingLead}
                isSelected={selectedIds.includes(lead.id)}
                isSelectionMode={isSelectionMode}
                onSelect={() => {
                  toggleSelect(lead.id);
                  if (!isSelectionMode) setIsSelectionMode(true);
                }}
              />
            ))}
          </div>

          {pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {[...Array(pages)].map((_, i: number) => (
                <button key={i}
                  onClick={() => {
                    setPage(i + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                    currentPage === i + 1
                      ? "bg-brand-primary text-white shadow-glow"
                      : "glass text-text-muted hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {showImport && (
          <ImportLeads 
            onClose={() => setShowImport(false)} 
            onSuccess={() => fetchLeads(true)} 
          />
        )}
        {callingLead && (
          <QuickCallLog 
            lead={callingLead} 
            onClose={() => setCallingLead(null)} 
            onSuccess={() => fetchLeads(true)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

const MobileLeadCard = ({ 
  lead, 
  onCall,
  isSelected,
  isSelectionMode,
  onSelect
}: { 
  lead: Lead; 
  onCall: (lead: Lead) => void;
  isSelected: boolean;
  isSelectionMode: boolean;
  onSelect: () => void;
}) => {
  const x = useMotionValue(0);
  const leftActionOpacity = useTransform(x, [40, 100], [0, 1]);
  const rightActionOpacity = useTransform(x, [-40, -100], [0, 1]);
  const { updateLeadStatus } = useLeadsStore();
  const longPressTimer = useRef<NodeJS.Timeout>();

  const handleTouchStart = () => {
    longPressTimer.current = setTimeout(() => {
      onSelect();
    }, 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };
  
  return (
    <div className="relative group overflow-hidden rounded-2xl">
      <div className="absolute inset-0 flex items-center justify-between px-6 bg-brand-dark/50 pointer-events-none">
        <motion.div style={{ opacity: leftActionOpacity }} className="bg-green-500/20 text-green-400 flex items-center gap-2 px-4 py-2 rounded-xl border border-green-500/30">
          <Icon name="check" size={18} />
          <span className="text-xs font-bold uppercase tracking-wider">Qualify</span>
        </motion.div>
        
        <motion.div style={{ opacity: rightActionOpacity }} className="bg-brand-primary/20 text-brand-primary flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-primary/30">
          <span className="text-xs font-bold uppercase tracking-wider">Contact</span>
          <Icon name="call" size={18} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isSelectionMode && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20"
          >
            <button 
              onClick={onSelect}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-brand-primary border-brand-primary text-white' : 'border-white/20 bg-white/5'}`}
            >
              {isSelected && <Icon name="check" size={14} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        drag={isSelectionMode ? false : "x"}
        dragConstraints={{ left: -100, right: 100 }}
        dragElastic={0.1}
        style={{ x: isSelectionMode ? (isSelected ? 40 : 0) : x }}
        onDragEnd={(_: any, info: any) => {
          if (info.offset.x > 80) {
            updateLeadStatus(lead.id, "QUALIFIED");
          } else if (info.offset.x < -80) {
            updateLeadStatus(lead.id, "CONTACTED");
          }
          x.set(0);
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onContextMenu={(e: any) => {
          e.preventDefault();
          onSelect();
        }}
        onClick={() => isSelectionMode ? onSelect() : null}
        className={`relative z-10 glass rounded-2xl p-5 border transition-all duration-300 ${isSelected ? 'bg-brand-primary/10 border-brand-primary/40' : 'bg-[#0A0A0F] border-white/5'} ${isSelectionMode ? 'translate-x-12' : ''}`}
      >
        <div className="flex items-start justify-between mb-4">
          <div onClick={(e) => isSelectionMode && (e.preventDefault(), onSelect())} className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border transition-all ${isSelected ? 'bg-brand-primary text-white border-brand-primary' : 'bg-brand-primary/10 text-brand-primary border-brand-primary/20'}`}>
              {(lead.name?.[0] || 'L').toUpperCase()}
            </div>
            <div className="min-w-0">
              <Link href={isSelectionMode ? "#" : `/leads/${lead.id}`} className={`text-white font-bold truncate hover:text-brand-primary ${isSelectionMode ? 'pointer-events-none' : ''}`}>{lead.name}</Link>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Icon name="saas-mvp" size={10} className="text-text-muted" />
                <p className="text-text-muted text-[10px] font-medium uppercase tracking-wider">{lead.serviceType}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isSelectionMode && (
              <button 
                onClick={() => onCall(lead)}
                className="p-2 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20"
              >
                <Icon name="call" size={14} />
              </button>
            )}
            <ScoreBadge score={lead.score} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <StatusBadge status={lead.status} />
          <div className="flex items-center gap-4">
            <span className="text-text-muted text-[10px] font-medium">
              {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(lead.createdAt))}
            </span>
            <Link href={isSelectionMode ? "#" : `/leads/${lead.id}`} className={`${isSelectionMode ? 'pointer-events-none' : ''}`}>
              <Icon name="arrow-right" size={12} className="text-text-muted opacity-50" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const LeadsSkeleton = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-24 glass rounded-3xl animate-pulse bg-white/[0.02]" />
    ))}
  </div>
);
