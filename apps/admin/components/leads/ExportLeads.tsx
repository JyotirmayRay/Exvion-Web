"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@exvion/ui";
import { api } from "@/lib/api";
import { useLeadsStore } from "@/store/useLeadsStore";

export const ExportLeads = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [options, setOptions] = useState({
    columns: 'all' as 'all' | 'contact' | 'crm',
    format: 'csv' as 'csv' | 'xlsx'
  });
  
  const { filters } = useLeadsStore();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const { total } = await api.getLeadsCount(filters);
        setCount(total);
      } catch (err) {
        console.error("Failed to fetch export count", err);
      }
    };
    if (isOpen) fetchCount();
  }, [isOpen, filters]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleExport = async () => {
    setExporting(true);
    try {
      await api.exportCsv({ ...filters, ...options });
      setIsOpen(false);
    } catch (err) {
      alert("Export failed: " + (err as any).message);
    } finally {
      setExporting(false);
    }
  };

  const activeFilters = Object.entries(filters)
    .filter(([_, v]) => v && v !== "")
    .map(([k, v]) => ({ key: k, value: v }));

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-secondary text-xs px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-colors"
      >
        <Icon name="export" size={14} />
        Export
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-80 glass border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-5 border-b border-white/5">
              <h3 className="text-sm font-bold text-white">Export Leads</h3>
              <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider font-medium">Selected filters will be applied</p>
            </div>

            <div className="p-5 space-y-6">
              {/* Filter Summary */}
              {activeFilters.length > 0 && (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest pl-1">Active Filters</label>
                  <div className="flex flex-wrap gap-1.5">
                    {activeFilters.map(f => (
                      <span key={f.key} className="px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary text-[9px] font-bold border border-brand-primary/20">
                        {f.key}: {f.value}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Column Options */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest pl-1">Columns</label>
                <div className="grid gap-2">
                  {[
                    { id: 'all', label: 'All columns', sub: 'Complete data + form answers' },
                    { id: 'contact', label: 'Contact only', sub: 'Name, Email, Phone, Service' },
                    { id: 'crm', label: 'CRM Format', sub: 'Optimized for HubSpot/Zoho' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setOptions(prev => ({ ...prev, columns: opt.id as any }))}
                      className={`text-left p-3 rounded-xl border transition-all ${options.columns === opt.id ? 'bg-brand-primary/10 border-brand-primary/40' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                    >
                      <p className={`text-[11px] font-bold ${options.columns === opt.id ? 'text-brand-primary' : 'text-white'}`}>{opt.label}</p>
                      <p className="text-[9px] text-text-muted mt-0.5">{opt.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Format Toggle */}
              <div className="flex items-center justify-between p-1 bg-white/5 rounded-xl border border-white/5">
                {(['csv', 'xlsx'] as const).map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => setOptions(prev => ({ ...prev, format: fmt }))}
                    className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${options.format === fmt ? 'bg-brand-primary text-white shadow-glow' : 'text-text-muted hover:text-white'}`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>

              {/* Action */}
              <div className="pt-2">
                <p className="text-[10px] text-text-muted text-center mb-3">
                  {count !== null ? `Exporting ${count} leads matching filters` : 'Calculating...'}
                </p>
                <button
                  onClick={handleExport}
                  disabled={exporting || count === 0}
                  className="w-full py-3 bg-brand-primary text-white rounded-xl text-xs font-bold shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2"
                >
                  <Icon name="export" size={14} className={exporting ? 'animate-bounce' : ''} />
                  {exporting ? 'Exporting...' : `Export ${count || ''} Leads`}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
