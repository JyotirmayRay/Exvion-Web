const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("exvion_token");
};

const headers = (extra = {}) => ({
  "Content-Type": "application/json",
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
  ...extra,
});

export const api = {
  // Auth
  login: async (email: string, password: string) => {
    const res = await fetch(`${BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Invalid credentials");
    return res.json();
  },

  me: async () => {
    const res = await fetch(`${BASE}/auth/me`, { headers: headers() });
    if (!res.ok) throw new Error("Unauthorized");
    return res.json();
  },

  // Leads
  getLeads: async (params: Record<string, any> = {}) => {
    const query = new URLSearchParams(
      Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== undefined && v !== "")
      )
    ).toString();
    const res = await fetch(`${BASE}/leads${query ? `?${query}` : ""}`,
      { headers: headers() });
    if (!res.ok) throw new Error("Failed to fetch leads");
    return res.json();
  },

  getLead: async (id: string) => {
    const res = await fetch(`${BASE}/leads/${id}`, { headers: headers() });
    if (!res.ok) throw new Error("Lead not found");
    return res.json();
  },

  getStats: async () => {
    const res = await fetch(`${BASE}/leads/stats`, { headers: headers() });
    if (!res.ok) throw new Error("Failed to fetch stats");
    return res.json();
  },

  updateStatus: async (id: string, status: string) => {
    const res = await fetch(`${BASE}/leads/${id}/status`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Update failed");
    return res.json();
  },

  addNote: async (id: string, content: string, type?: string, metadata?: any) => {
    const res = await fetch(`${BASE}/leads/${id}/notes`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ content, type, metadata }),
    });
    if (!res.ok) throw new Error("Note failed");
    return res.json();
  },

  importLeads: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${BASE}/leads/import`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    });
    if (!res.ok) throw new Error("Import failed");
    return res.json();
  },

  bulkUpdateStatus: async (ids: string[], status: string) => {
    const res = await fetch(`${BASE}/leads/bulk/status`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify({ ids, status }),
    });
    if (!res.ok) throw new Error("Bulk update failed");
    return res.json();
  },

  bulkDelete: async (ids: string[]) => {
    const res = await fetch(`${BASE}/leads/bulk`, {
      method: "DELETE",
      headers: headers(),
      body: JSON.stringify({ ids }),
    });
    if (!res.ok) throw new Error("Bulk delete failed");
    return res.json();
  },

  getLeadsCount: async (params: Record<string, any> = {}) => {
    const query = new URLSearchParams(
      Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== undefined && v !== "")
      )
    ).toString();
    const res = await fetch(`${BASE}/leads/count${query ? `?${query}` : ""}`, {
      headers: headers(),
    });
    if (!res.ok) throw new Error("Failed to fetch count");
    return res.json();
  },

  exportCsv: async (params: Record<string, any> = {}) => {
    const query = new URLSearchParams(
      Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== undefined && v !== "")
      )
    ).toString();
    const res = await fetch(`${BASE}/leads/export/csv${query ? `?${query}` : ""}`, {
      headers: headers(),
    });
    if (!res.ok) throw new Error("Export failed");
    
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `exvion-leads-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },

  // Bookings
  getBookings: async () => {
    const res = await fetch(`${BASE}/bookings/admin/list`, {
      headers: headers(),
    });
    if (!res.ok) throw new Error("Failed to fetch bookings");
    return res.json();
  },

  // Settings
  getSettings: async () => {
    const res = await fetch(`${BASE}/settings`, { headers: headers() });
    if (!res.ok) throw new Error("Failed to fetch settings");
    return res.json();
  },

  setSetting: async (key: string, value: string) => {
    const res = await fetch(`${BASE}/settings`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ key, value }),
    });
    if (!res.ok) throw new Error("Failed to update setting");
    return res.json();
  },
};
