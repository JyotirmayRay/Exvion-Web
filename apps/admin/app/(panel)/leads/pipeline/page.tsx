"use client";
import React, { useEffect, useState, useMemo } from "react";
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@exvion/ui";
import { api } from "@/lib/api";
import { useLeadsStore, Lead } from "@/store/useLeadsStore";
import { ScoreBadge } from "@/components/leads/ScoreBadge";
import { StatusBadge } from "@/components/leads/StatusBadge";
import { QuickCallLog } from "@/components/leads/QuickCallLog";
import Link from "next/link";

const STAGES = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"];

export default function PipelinePage() {
  const { leads, setLeads, updateLeadStatus } = useLeadsStore();
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [callingLead, setCallingLead] = useState<Lead | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchLeads = async () => {
    try {
      const data = await api.getLeads({ limit: 200 });
      setLeads(data.data, data.total, data.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeLead = leads.find(l => l.id === active.id);
    const overId = over.id as string;

    // If hovering over a container (column)
    if (STAGES.includes(overId)) {
      if (activeLead && activeLead.status !== overId) {
        updateLeadStatus(activeLead.id, overId as any);
      }
      return;
    }

    // If hovering over another item
    const overLead = leads.find(l => l.id === overId);
    if (activeLead && overLead && activeLead.status !== overLead.status) {
      updateLeadStatus(activeLead.id, overLead.status as any);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const leadId = active.id as string;
    const newStatus = STAGES.includes(over.id as string) 
      ? (over.id as string) 
      : leads.find(l => l.id === over.id)?.status;

    if (newStatus) {
      try {
        await api.updateStatus(leadId, newStatus);
      } catch (err) {
        fetchLeads(); // Rollback on failure
        alert("Failed to update status");
      }
    }
  };

  const activeLead = useMemo(() => leads.find(l => l.id === activeId), [leads, activeId]);

  if (loading) return <PipelineSkeleton />;

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Sales Pipeline</h1>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-text-muted text-sm flex items-center gap-1.5">
              <Icon name="pipeline" size={14} />
              {leads.length} Active Leads
            </p>
            <div className="w-[1px] h-3 bg-white/10 hidden md:block" />
            <p className="text-brand-primary text-sm font-bold hidden md:block">
              ${(leads.length * 1250).toLocaleString()} Potential Value
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/leads" className="btn-secondary text-xs px-4 py-2 rounded-xl flex items-center gap-2 flex-1 md:flex-none justify-center">
            <Icon name="leads" size={14} />
            Table View
          </Link>
          <button onClick={() => fetchLeads()} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-text-muted hover:text-white transition-all">
            <Icon name="refresh" size={16} />
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        <div className="flex-1 overflow-x-auto pb-6 scrollbar-hide -mx-6 px-6">
          <div className="flex gap-5 h-full min-w-max">
            {STAGES.map((stage) => (
              <PipelineColumn 
                key={stage} 
                id={stage}
                title={stage} 
                leads={leads.filter(l => l.status === stage)} 
                onCall={setCallingLead}
              />
            ))}
          </div>
        </div>

        <DragOverlay dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: "0.5",
              },
            },
          }),
        }}>
          {activeLead ? (
            <div className="w-80 rotate-3 scale-105 pointer-events-none">
              <PipelineCard lead={activeLead} isOverlay />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <AnimatePresence>
        {callingLead && (
          <QuickCallLog 
            lead={callingLead} 
            onClose={() => setCallingLead(null)} 
            onSuccess={() => fetchLeads()} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function PipelineColumn({ id, title, leads, onCall }: { id: string, title: string, leads: Lead[], onCall: (lead: Lead) => void }) {
  const { setNodeRef } = useSortable({ id });

  return (
    <div 
      ref={setNodeRef}
      className="w-80 flex flex-col gap-4 p-4 rounded-[2rem] bg-white/[0.02] border border-white/5 shadow-inner"
    >
      <div className="flex items-center justify-between px-3 pt-1">
        <div className="flex items-center gap-2.5">
          <div className={`w-2 h-2 rounded-full shadow-glow-sm ${getStatusColor(title)}`} />
          <h3 className="text-xs font-black text-white tracking-[0.1em] uppercase italic opacity-80">{title}</h3>
        </div>
        <div className="bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
          <span className="text-[10px] font-black text-text-muted">
            {leads.length}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-hide min-h-[100px]">
        <SortableContext 
          id={id}
          items={leads.map(l => l.id)} 
          strategy={verticalListSortingStrategy}
        >
          {leads.map((lead) => (
            <SortablePipelineCard key={lead.id} lead={lead} onCall={onCall} />
          ))}
          {leads.length === 0 && (
            <div className="h-24 rounded-2xl border-2 border-dashed border-white/5 flex items-center justify-center">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-30">Drop here</p>
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
}

function SortablePipelineCard({ lead, onCall }: { lead: Lead, onCall: (lead: Lead) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <PipelineCard lead={lead} onCall={onCall} />
    </div>
  );
}

function PipelineCard({ lead, onCall, isOverlay }: { lead: Lead, onCall?: (lead: Lead) => void, isOverlay?: boolean }) {
  return (
    <motion.div
      layout
      className={`glass p-4 rounded-2xl border transition-all group ${isOverlay ? 'border-brand-primary shadow-glow bg-brand-dark' : 'border-white/5 hover:border-brand-primary/30 hover:shadow-glow-sm cursor-grab active:cursor-grabbing'}`}
    >
      <div className="flex items-start justify-between mb-2">
        <p className="text-white text-[13px] font-bold leading-tight truncate pr-2 group-hover:text-brand-primary transition-colors">
          {lead.name}
        </p>
        <ScoreBadge score={lead.score} />
      </div>

      <div className="flex items-center gap-1.5 mb-4">
        <Icon name="saas-mvp" size={10} className="text-text-muted" />
        <p className="text-text-muted text-[9px] uppercase font-bold tracking-wider truncate">
          {lead.serviceType}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <Icon name="calendar" size={10} className="text-text-muted opacity-50" />
          <p className="text-text-muted text-[10px] font-medium">
            {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(lead.createdAt))}
          </p>
        </div>
        {!isOverlay && onCall && (
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onCall(lead);
              }}
              className="p-1.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/30 transition-colors"
            >
              <Icon name="call" size={11} />
            </button>
            <Link href={`/leads/${lead.id}`} className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary border border-brand-primary/20 hover:bg-brand-primary/30 transition-colors">
              <Icon name="eye" size={11} />
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "NEW": return "bg-blue-400";
    case "CONTACTED": return "bg-yellow-400";
    case "QUALIFIED": return "bg-green-400";
    case "PROPOSAL": return "bg-purple-400";
    case "WON": return "bg-brand-primary";
    case "LOST": return "bg-red-400";
    default: return "bg-gray-400";
  }
};

function PipelineSkeleton() {
  return (
    <div className="h-full flex flex-col gap-6">
      <div className="h-16 w-full bg-white/5 rounded-2xl animate-pulse" />
      <div className="flex-1 flex gap-5 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-80 h-full glass rounded-[2rem] animate-pulse bg-white/[0.02]" />
        ))}
      </div>
    </div>
  );
}
