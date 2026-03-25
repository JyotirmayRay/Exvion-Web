"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@exvion/ui";
import { api } from "@/lib/api";
import { Lead } from "@/store/useLeadsStore";

interface QuickCallLogProps {
  lead: Lead;
  onClose: () => void;
  onSuccess: () => void;
}

const QUICK_OUTCOMES = [
  { label: "Successful", status: "QUALIFIED", icon: "check", color: "text-green-400" },
  { label: "Contacted", status: "CONTACTED", icon: "user", color: "text-blue-400" },
  { label: "No Answer", status: "CONTACTED", icon: "call", color: "text-yellow-400" },
  { label: "Busy", status: "CONTACTED", icon: "clock", color: "text-orange-400" },
  { label: "Wrong Number", status: "LOST", icon: "close", color: "text-red-400" },
  { label: "Not Interested", status: "LOST", icon: "delete", color: "text-gray-400" },
];

export function QuickCallLog({ lead, onClose, onSuccess }: QuickCallLogProps) {
  const [content, setContent] = useState("");
  const [selectedOutcome, setSelectedOutcome] = useState<typeof QUICK_OUTCOMES[0] | null>(null);
  const [status, setStatus] = useState(lead.status);
  const [loading, setLoading] = useState(false);

  const handleOutcomeSelect = (outcome: typeof QUICK_OUTCOMES[0]) => {
    setSelectedOutcome(outcome);
    setStatus(outcome.status);
    if (!content) {
      setContent(`Call outcome: ${outcome.label}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const metadata = {
        outcome: selectedOutcome?.label || "Custom",
        duration: "unknown", // Could be enhanced with a timer
        timestamp: new Date().toISOString()
      };

      // Create typed note
      await api.addNote(lead.id, content || `Call logged: ${selectedOutcome?.label}`, "call", metadata);
      
      // Update status if changed
      if (status !== lead.status) {
        await api.updateStatus(lead.id, status);
      }
      
      onSuccess();
      onClose();
    } catch (err) {
      alert("Failed to save call log");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg glass rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20">
                <Icon name="call" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Quick Call Log</h2>
                <p className="text-text-muted text-sm font-medium">{lead.name} • {lead.phone}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-text-muted hover:text-white transition-colors">
              <Icon name="close" size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-text-muted text-[10px] font-black uppercase tracking-[0.15em] mb-4 ml-1">
                Select Quick Outcome
              </label>
              <div className="grid grid-cols-2 gap-3">
                {QUICK_OUTCOMES.map((outcome) => (
                  <button
                    key={outcome.label}
                    type="button"
                    onClick={() => handleOutcomeSelect(outcome)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border transition-all text-left ${
                      selectedOutcome?.label === outcome.label 
                        ? 'bg-brand-primary/20 border-brand-primary/50 text-white shadow-glow-sm' 
                        : 'bg-white/5 border-white/5 text-text-muted hover:border-white/10 hover:bg-white/[0.07]'
                    }`}
                  >
                    <Icon name={outcome.icon as any} size={16} className={outcome.color} />
                    <span className="text-xs font-bold leading-none">{outcome.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-text-muted text-[10px] font-black uppercase tracking-[0.15em] mb-4 ml-1">
                Additional Notes
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write specific details about the call..."
                className="w-full h-28 bg-white/5 border border-white/10 rounded-[1.5rem] p-4 text-white text-sm focus:outline-none focus:border-brand-primary/50 transition-all resize-none placeholder:text-white/20"
              />
            </div>

            <div>
              <label className="block text-text-muted text-[10px] font-black uppercase tracking-[0.15em] mb-4 ml-1">
                Next Pipeline Stage
              </label>
              <div className="flex flex-wrap gap-2">
                {["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all border ${
                      status === s 
                        ? 'bg-brand-primary text-white border-brand-primary shadow-glow-sm' 
                        : 'bg-white/5 text-text-muted border-white/5 hover:border-white/20'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-4 rounded-2xl bg-white/5 text-white font-bold text-sm border border-white/10 hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || (!selectedOutcome && !content)}
                className="flex-[2] bg-brand-primary text-white rounded-2xl py-4 font-black text-sm shadow-glow hover:translate-y-[-2px] active:translate-y-[0px] transition-all disabled:opacity-50 disabled:translate-y-0"
              >
                {loading ? "Saving Log..." : "Finish and Save Log"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
