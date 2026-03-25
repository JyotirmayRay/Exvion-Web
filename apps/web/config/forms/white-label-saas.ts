import { FormConfig } from "@exvion/types";

export const whiteLabelSaasForm: FormConfig = {
  id: "white-label-saas-form",
  serviceId: "white-label-saas",
  qualifyingThreshold: 65,
  disqualifyMessage: "",
  successMessage: "Your white-label SaaS request is received. We'll prepare a platform recommendation and proposal within 24 hours.",
  steps: [
    {
      id: "step-1",
      title: "Your agency",
      subtitle: "Who are we building for?",
      fields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "phone", required: true },
        {
          id: "agency_type",
          label: "What kind of agency do you run?",
          type: "select",
          required: true,
          options: [
            { label: "Digital marketing agency", value: "marketing", scoreWeight: 20 },
            { label: "Web design/development agency", value: "web-dev", scoreWeight: 25 },
            { label: "SEO / content agency", value: "seo", scoreWeight: 15 },
            { label: "Business consulting firm", value: "consulting", scoreWeight: 20 },
            { label: "Freelancer / solo consultant", value: "freelancer", scoreWeight: 10 },
            { label: "Other", value: "other", scoreWeight: 10 },
          ],
        },
      ],
    },
    {
      id: "step-2",
      title: "Your client base",
      subtitle: "Understanding your current reach.",
      fields: [
        {
          id: "active_clients",
          label: "How many active clients does your agency have?",
          type: "select",
          required: true,
          options: [
            { label: "1–5 clients", value: "1-5", scoreWeight: 10 },
            { label: "6–20 clients", value: "6-20", scoreWeight: 25 },
            { label: "21–50 clients", value: "21-50", scoreWeight: 35 },
            { label: "50+ clients", value: "50+", scoreWeight: 40 },
          ],
        },
        {
          id: "client_monthly_value",
          label: "What's the average monthly value per client?",
          type: "select",
          required: true,
          options: [
            { label: "Entry Level / Seed/mo", value: "<10k", scoreWeight: 5 },
            { label: "Growth / Standard/mo", value: "10k-30k", scoreWeight: 15 },
            { label: "Growth / Standard/mo", value: "30k-100k", scoreWeight: 30 },
            { label: "Custom+/mo", value: ">100k", scoreWeight: 40 },
          ],
        },
      ],
    },
    {
      id: "step-3",
      title: "SaaS intention",
      subtitle: "What are we building?",
      fields: [
        {
          id: "saas_type",
          label: "What type of SaaS do you want to offer clients?",
          type: "select",
          required: true,
          options: [
            { label: "CRM / client management tool", value: "crm", scoreWeight: 20 },
            { label: "Reporting and analytics dashboard", value: "reporting", scoreWeight: 20 },
            { label: "Email marketing platform", value: "email", scoreWeight: 15 },
            { label: "Project management tool", value: "pm", scoreWeight: 20 },
            { label: "Booking / scheduling platform", value: "booking", scoreWeight: 15 },
            { label: "I need recommendations", value: "recommendations", scoreWeight: 10 },
          ],
        },
        {
          id: "resell_intent",
          label: "How do you plan to monetize it?",
          type: "select",
          required: true,
          options: [
            { label: "Monthly subscription per client", value: "subscription", scoreWeight: 35 },
            { label: "Included in agency retainer", value: "retainer", scoreWeight: 20 },
            { label: "One-time setup fee only", value: "one-time", scoreWeight: 5 },
            { label: "Not sure yet", value: "unsure", scoreWeight: 10 },
          ],
        },
      ],
    },
    {
      id: "step-4",
      title: "Launch readiness",
      subtitle: "Almost there.",
      fields: [
        {
          id: "budget",
          label: "Budget for setup?",
          type: "select",
          required: true,
          options: [
            { label: "Entry Level / Seed", value: "<20k", scoreWeight: 5 },
            { label: "Growth / Standard", value: "20k-50k", scoreWeight: 20 },
            { label: "Growth / Standard", value: "50k-100k", scoreWeight: 35 },
            { label: "Custom+", value: ">100k", scoreWeight: 45 },
          ],
        },
        {
          id: "launch_timeline",
          label: "Launch timeline?",
          type: "select",
          required: true,
          options: [
            { label: "ASAP — this week", value: "this-week", scoreWeight: 30 },
            { label: "Within 2 weeks", value: "2-weeks", scoreWeight: 25 },
            { label: "This month", value: "month", scoreWeight: 15 },
            { label: "Next quarter", value: "quarter", scoreWeight: 5 },
          ],
        },
      ],
    },
  ],
};
