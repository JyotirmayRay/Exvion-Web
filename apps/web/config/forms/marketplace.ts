import { FormConfig } from "@exvion/types";

export const marketplaceForm: FormConfig = {
  id: "marketplace-form",
  serviceId: "marketplace",
  qualifyingThreshold: 70,
  disqualifyMessage: "",
  successMessage: "Marketplace project request received. We'll send a platform architecture and phased delivery proposal within 24 hours.",
  steps: [
    {
      id: "step-1",
      title: "Your marketplace concept",
      subtitle: "What kind of ecosystem are we creating?",
      fields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "phone", required: true },
        {
          id: "marketplace_type",
          label: "What type of marketplace are you building?",
          type: "select",
          required: true,
          options: [
            { label: "Product marketplace (physical goods)", value: "physical", scoreWeight: 25 },
            { label: "Digital products marketplace", value: "digital", scoreWeight: 30 },
            { label: "Service marketplace (freelance/gig)", value: "service", scoreWeight: 30 },
            { label: "Rental / booking marketplace", value: "rental", scoreWeight: 30 },
            { label: "B2B wholesale marketplace", value: "b2b", scoreWeight: 35 },
            { label: "On-demand delivery platform", value: "on-demand", scoreWeight: 30 },
          ],
        },
        {
          id: "vendor_model",
          label: "How will vendors/sellers be structured?",
          type: "select",
          required: true,
          options: [
            { label: "Any approved vendor can list", value: "approved", scoreWeight: 25 },
            { label: "Curated vendors only (invite)", value: "invite", scoreWeight: 30 },
            { label: "Single vendor with resellers", value: "resellers", scoreWeight: 20 },
            { label: "Hybrid — curated + open", value: "hybrid", scoreWeight: 25 },
          ],
        },
      ],
    },
    {
      id: "step-2",
      title: "Scale expectations",
      subtitle: "How many users and transactions?",
      fields: [
        {
          id: "expected_vendors",
          label: "How many vendors do you expect in year one?",
          type: "select",
          required: true,
          options: [
            { label: "Under 20 vendors", value: "<20", scoreWeight: 15 },
            { label: "20–100 vendors", value: "20-100", scoreWeight: 25 },
            { label: "100–500 vendors", value: "100-500", scoreWeight: 35 },
            { label: "500+ vendors", value: ">500", scoreWeight: 40 },
          ],
        },
        {
          id: "expected_monthly_orders",
          label: "Expected monthly transaction volume at launch?",
          type: "select",
          required: true,
          options: [
            { label: "Under 100 transactions", value: "<100", scoreWeight: 10 },
            { label: "100–1,000 transactions", value: "100-1k", scoreWeight: 20 },
            { label: "1,000–10,000 transactions", value: "1k-10k", scoreWeight: 35 },
            { label: "10,000+ transactions", value: ">10k", scoreWeight: 45 },
          ],
        },
      ],
    },
    {
      id: "step-3",
      title: "Business model",
      subtitle: "How does the platform make money?",
      fields: [
        {
          id: "revenue_model",
          label: "How will you make money from the marketplace?",
          type: "multiselect",
          required: true,
          options: [
            { label: "Commission on each transaction", value: "commission", scoreWeight: 20 },
            { label: "Monthly subscription from vendors", value: "subscription", scoreWeight: 20 },
            { label: "Listing fees from vendors", value: "listing", scoreWeight: 15 },
            { label: "Featured placement fees", value: "featured", scoreWeight: 10 },
            { label: "Buyer service fees", value: "buyer-fee", scoreWeight: 15 },
          ],
        },
        {
          id: "payment_requirement",
          label: "Payment and payout requirements?",
          type: "select",
          required: true,
          options: [
            { label: "Need automated vendor payouts", value: "auto-payout", scoreWeight: 30 },
            { label: "Manual payouts are fine initially", value: "manual-payout", scoreWeight: 10 },
            { label: "Escrow / milestone-based payments", value: "escrow", scoreWeight: 35 },
            { label: "Subscription billing only", value: "subscription", scoreWeight: 20 },
          ],
        },
      ],
    },
    {
      id: "step-4",
      title: "Investment",
      subtitle: "Preparing your platform proposal.",
      fields: [
        {
          id: "budget",
          label: "Marketplace development budget?",
          type: "select",
          required: true,
          disqualifyIf: { field: "budget", values: ["<75k"], message: "Full marketplace platforms based on custom scope. We can discuss a phased approach." },
          options: [
            { label: "Entry Level / Seed", value: "<75k", scoreWeight: 5 },
            { label: "Growth / Standard", value: "75k-150k", scoreWeight: 20 },
            { label: "Growth / Standard", value: "150k-400k", scoreWeight: 35 },
            { label: "Custom+", value: ">400k", scoreWeight: 50 },
          ],
        },
        {
          id: "launch_timeline",
          label: "Launch timeline",
          type: "select",
          required: true,
          options: [
            { label: "Under 3 months", value: "<3mo", scoreWeight: 30 },
            { label: "3–6 months", value: "3-6mo", scoreWeight: 25 },
            { label: "6–12 months", value: "6-12mo", scoreWeight: 15 },
            { label: "Flexible", value: "flexible", scoreWeight: 10 },
          ],
        },
      ],
    },
  ],
};
