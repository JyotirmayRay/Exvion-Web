"use client";
import { useLeadsStore } from "@/store/useLeadsStore";

const selectClass = `glass border border-white/8 rounded-xl px-3 py-2.5
  text-text-secondary text-sm focus:outline-none 
  focus:border-brand-primary/40 transition-all bg-transparent
  cursor-pointer`;

export const LeadsFilters = () => {
  const { filters, setFilter, resetFilters } = useLeadsStore();
  const hasFilters = Object.values(filters).some((v) => v !== "");

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <input
        value={filters.search}
        onChange={(e) => setFilter("search", e.target.value)}
        placeholder="Search name, email, phone..."
        className={`${selectClass} min-w-48 flex-1 md:flex-none`}
      />

      <select value={filters.status}
        onChange={(e) => setFilter("status", e.target.value)}
        className={selectClass}>
        <option value="">All Statuses</option>
        <option value="NEW">New</option>
        <option value="QUALIFIED">Qualified</option>
        <option value="CONTACTED">Contacted</option>
        <option value="CALL_BOOKED">Call Booked</option>
        <option value="PROPOSAL_SENT">Proposal Sent</option>
        <option value="CLOSED">Closed</option>
        <option value="REJECTED">Rejected</option>
      </select>

      <select value={filters.tier}
        onChange={(e) => setFilter("tier", e.target.value)}
        className={selectClass}>
        <option value="">All Tiers</option>
        <option value="high">🔥 High Value</option>
        <option value="medium">🟡 Medium</option>
        <option value="low">⚪ Low</option>
      </select>

      <select value={filters.budget}
        onChange={(e) => setFilter("budget", e.target.value)}
        className={selectClass}>
        <option value="">All Budgets</option>
        <option value="above_2l">₹2L+</option>
        <option value="50k_2l">₹50K–₹2L</option>
        <option value="under_50k">Under ₹50K</option>
      </select>

      <select value={filters.serviceType}
        onChange={(e) => setFilter("serviceType", e.target.value)}
        className={selectClass}>
        <option value="">All Services</option>
        <option value="AI Automation Systems">AI Automation</option>
        <option value="SaaS & MVP Development">SaaS & MVP</option>
        <option value="Custom Software Development">Custom Software</option>
        <option value="API & System Integration">API & Integration</option>
        <option value="Startup Tech Consulting">Tech Consulting</option>
        <option value="Legacy Code Modernization">Modernization</option>
        <option value="Database Architecture">Database Design</option>
        <option value="UI/UX Engineering">UI/UX Design</option>
        <option value="WordPress Performance">WordPress Web</option>
        <option value="E-commerce Solutions">E-commerce</option>
        <option value="Cloud Infrastructure">Cloud & DevOps</option>
        <option value="Mobile App Development">Mobile Apps</option>
        <option value="Web3 & Blockchain">Web3 / Crypto</option>
        <option value="Cybersecurity Audit">Security Audit</option>
        <option value="QA & Test Automation">QA Testing</option>
        <option value="Data Analytics & BI">Data Engineering</option>
        <option value="Dedicated Dev Team">Dedicated Team</option>
      </select>

      {hasFilters && (
        <button onClick={resetFilters}
          className="text-text-muted hover:text-white text-sm 
            transition-colors px-3 py-2">
          ✕ Clear
        </button>
      )}
    </div>
  );
};
