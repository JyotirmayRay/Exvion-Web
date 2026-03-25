import { create } from "zustand";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  projectType?: string;
  stage?: string;
  budget?: string;
  timeline?: string;
  description?: string;
  company?: string;
  score: number;
  status: string;
  source?: string;
  createdAt: string;
  answers?: { question: string; answer: string }[];
  notes?: { id: string; content: string; createdAt: string }[];
}

interface LeadsStore {
  leads: Lead[];
  total: number;
  pages: number;
  currentPage: number;
  filters: {
    status: string;
    serviceType: string;
    budget: string;
    tier: string;
    search: string;
  };
  selectedIds: string[];
  setLeads: (leads: Lead[], total: number, pages: number) => void;
  setFilter: (key: string, value: string) => void;
  setPage: (page: number) => void;
  updateLeadStatus: (id: string, status: string) => void;
  resetFilters: () => void;
  toggleSelect: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
}

const defaultFilters = {
  status: "", serviceType: "", budget: "", tier: "", search: "",
};

export const useLeadsStore = create<LeadsStore>((set) => ({
  leads: [],
  total: 0,
  pages: 0,
  currentPage: 1,
  filters: defaultFilters,
  selectedIds: [],

  setLeads: (leads, total, pages) => set({ leads, total, pages }),
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
      currentPage: 1,
    })),
  setPage: (page) => set({ currentPage: page }),
  updateLeadStatus: (id, status) =>
    set((state) => ({
      leads: state.leads.map((l) =>
        l.id === id ? { ...l, status } : l
      ),
    })),
  resetFilters: () => set({ filters: defaultFilters, currentPage: 1 }),
  toggleSelect: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((i) => i !== id)
        : [...state.selectedIds, id],
    })),
  selectAll: (ids) => set({ selectedIds: ids }),
  clearSelection: () => set({ selectedIds: [] }),
}));
