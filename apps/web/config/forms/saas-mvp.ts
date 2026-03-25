import { FormConfig } from "@exvion/types";

export const saasMvpForm: FormConfig = {
  id: "saas-mvp-form",
  serviceId: "saas-mvp",
  qualifyingThreshold: 70,
  disqualifyMessage: "",
  successMessage: "SaaS MVP request confirmed. We'll send a technical architecture proposal within 24 hours.",
  steps: [
    {
      id: "step-1",
      title: "Your SaaS idea",
      subtitle: "Tell us about your product vision.",
      fields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "phone", required: true },
        {
          id: "saas_model",
          label: "What subscription model are you planning?",
          type: "select",
          required: true,
          options: [
            { label: "Per-user monthly subscription", value: "per-user", scoreWeight: 30 },
            { label: "Tiered feature plans", value: "tiered", scoreWeight: 35 },
            { label: "Usage-based billing", value: "usage", scoreWeight: 30 },
            { label: "Freemium with paid upgrades", value: "freemium", scoreWeight: 25 },
            { label: "Not sure yet", value: "unsure", scoreWeight: 10 },
          ],
        },
        {
          id: "target_customer",
          label: "Who is your target customer?",
          type: "select",
          required: true,
          options: [
            { label: "Small businesses (SMBs)", value: "smb", scoreWeight: 30 },
            { label: "Enterprise companies", value: "enterprise", scoreWeight: 35 },
            { label: "Individual consumers", value: "b2c", scoreWeight: 20 },
            { label: "Agencies and freelancers", value: "agency", scoreWeight: 25 },
            { label: "Developers / technical users", value: "dev", scoreWeight: 25 },
          ],
        },
      ],
    },
    {
      id: "step-2",
      title: "Core product",
      subtitle: "Why should customers switch to you?",
      fields: [
        {
          id: "differentiator",
          label: "What makes your SaaS different from what already exists?",
          sublabel: "Be specific — what unique value do paying customers get?",
          type: "textarea",
          required: true,
          placeholder: "Our product is different because...",
          minLength: 40,
        },
        {
          id: "has_competitors",
          label: "Are there existing competitors doing something similar?",
          type: "select",
          required: true,
          options: [
            { label: "Yes — we have a clear differentiation", value: "yes-clear", scoreWeight: 30 },
            { label: "Yes — we're targeting an underserved niche", value: "yes-niche", scoreWeight: 35 },
            { label: "Not really — new market", value: "no", scoreWeight: 20 },
            { label: "Not sure", value: "unsure", scoreWeight: 10 },
          ],
        },
      ],
    },
    {
      id: "step-3",
      title: "Technical requirements",
      subtitle: "What functionality is required on day one?",
      fields: [
        {
          id: "required_infrastructure",
          label: "Which of these does your SaaS require from day one?",
          type: "multiselect",
          required: true,
          options: [
            { label: "Stripe subscription billing", value: "stripe", scoreWeight: 15 },
            { label: "Multi-tenant user accounts", value: "auth", scoreWeight: 15 },
            { label: "Role-based permissions", value: "rbac", scoreWeight: 15 },
            { label: "Admin panel", value: "admin", scoreWeight: 10 },
            { label: "Email automation flows", value: "email", scoreWeight: 10 },
            { label: "Third-party API integrations", value: "api", scoreWeight: 15 },
            { label: "Analytics and reporting", value: "analytics", scoreWeight: 10 },
          ],
        },
        {
          id: "preferred_stack",
          label: "Do you have a preferred tech stack?",
          type: "select",
          required: false,
          options: [
            { label: "Next.js + Node.js (recommended)", value: "nextjs", scoreWeight: 15 },
            { label: "React + Python/FastAPI", value: "react-python", scoreWeight: 15 },
            { label: "PHP / Laravel", value: "laravel", scoreWeight: 10 },
            { label: "No preference — recommend one", value: "none", scoreWeight: 10 },
          ],
        },
      ],
    },
    {
      id: "step-4",
      title: "Budget and go-to-market",
      subtitle: "Finalizing your launch plans.",
      fields: [
        {
          id: "budget",
          label: "SaaS MVP development budget?",
          type: "select",
          required: true,
          disqualifyIf: { field: "budget", values: ["<50k"], message: "SaaS MVPs require proper infrastructure. Projects based on custom scope." },
          options: [
            { label: "Entry Level / Seed", value: "<50k", scoreWeight: 5 },
            { label: "Growth / Standard", value: "50k-100k", scoreWeight: 20 },
            { label: "Growth / Standard", value: "100k-250k", scoreWeight: 35 },
            { label: "Custom+", value: ">250k", scoreWeight: 50 },
          ],
        },
        {
          id: "launch_target",
          label: "When are you targeting first paying user?",
          type: "select",
          required: true,
          options: [
            { label: "Within 2 months", value: "<2mo", scoreWeight: 35 },
            { label: "3–6 months", value: "3-6mo", scoreWeight: 25 },
            { label: "6–12 months", value: "6-12mo", scoreWeight: 15 },
            { label: "No fixed target", value: "flexible", scoreWeight: 5 },
          ],
        },
      ],
    },
  ],
};
