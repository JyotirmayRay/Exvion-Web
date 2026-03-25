"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import { Icon } from "@exvion/ui";

interface Note {
  id: string;
  content: string;
  type?: string;
  metadata?: any;
  createdAt: string;
}

interface Props {
  leadId: string;
  notes: Note[];
}

export const NotesPanel = ({ leadId, notes: initialNotes }: Props) => {
  const [notes, setNotes] = useState(initialNotes);
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    if (!content.trim()) return;
    setSaving(true);
    try {
      const note = await api.addNote(leadId, content.trim());
      setNotes((prev) => [note, ...prev]);
      setContent("");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const getNoteIcon = (type?: string) => {
    switch (type) {
      case "call": return "call";
      case "status_change": return "pipeline";
      case "import": return "import";
      default: return "notes";
    }
  };

  const getNoteColor = (type?: string) => {
    switch (type) {
      case "call": return "text-green-400 bg-green-400/10 border-green-400/20";
      case "status_change": return "text-brand-primary bg-brand-primary/10 border-brand-primary/20";
      case "import": return "text-purple-400 bg-purple-400/10 border-purple-400/20";
      default: return "text-white/40 bg-white/5 border-white/10";
    }
  };

  return (
    <div className="glass rounded-[2rem] p-6 border border-white/5 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
          <Icon name="notes" size={16} className="text-text-muted" />
        </div>
        <h3 className="text-white font-bold text-sm tracking-tight">Activity Timeline</h3>
      </div>

      <div className="space-y-3 mb-8">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a new note..."
          rows={2}
          className="w-full bg-white/5 rounded-2xl p-4 text-white text-sm
            placeholder:text-white/20 border border-white/5
            focus:border-brand-primary/40 focus:outline-none
            resize-none transition-all"
        />
        <div className="flex justify-end">
          <button
            onClick={handleAdd}
            disabled={saving || !content.trim()}
            className="bg-brand-primary text-white text-[10px] font-black uppercase tracking-[0.1em] px-6 py-2.5 rounded-xl 
              disabled:opacity-50 shadow-glow transition-all hover:translate-y-[-1px] active:translate-y-[0px]">
            {saving ? "Saving..." : "Post Note"}
          </button>
        </div>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
        <AnimatePresence mode="popLayout">
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative pl-8 pb-1 group"
            >
              {/* Connector line */}
              <div className="absolute left-[15px] top-[34px] bottom-[-16px] w-[1px] bg-white/5 group-last:hidden" />
              
              {/* Icon */}
              <div className={`absolute left-0 top-1.5 w-8 h-8 rounded-xl border flex items-center justify-center z-10 ${getNoteColor(note.type)} shadow-sm`}>
                <Icon name={getNoteIcon(note.type) as any} size={14} />
              </div>

              <div className="p-4 rounded-[1.5rem] bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60">
                    {note.type || "note"}
                  </span>
                  <span className="text-[10px] font-bold text-text-muted opacity-40">
                    {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(note.createdAt))}
                  </span>
                </div>
                
                <p className="text-white text-sm leading-relaxed font-medium">
                  {note.content}
                </p>

                {note.metadata && note.type === "call" && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <div className="px-2 py-0.5 rounded-lg bg-green-400/10 border border-green-400/20 text-[9px] font-bold text-green-400 uppercase tracking-tighter">
                      Outcome: {note.metadata.outcome}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {notes.length === 0 && (
          <div className="text-center py-12 opacity-20">
            <Icon name="notes" size={48} className="mx-auto mb-4" />
            <p className="text-text-muted text-sm font-bold uppercase tracking-widest">
              No activity yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
