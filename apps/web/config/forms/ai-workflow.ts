import { FormConfig } from "@exvion/types";

export const aiWorkflowForm: FormConfig = {
  id: "ai-workflow-form",
  serviceId: "ai-workflow",
  qualifyingThreshold: 60,
  disqualifyMessage: "Based on your answers, we may not be the best fit right now. We'll follow up with resources that could help.",
  successMessage: "Your workflow audit request is confirmed. We'll prepare a custom automation plan and reach out within 24 hours.",
  steps: [
    {
      id: "step-1",
      title: "Tell us about your business",
      subtitle: "Help us understand your scale.",
      fields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "phone", required: true },
        {
          id: "company_size",
          label: "Company Size",
          type: "select",
          required: true,
          scoreWeight: 0, // Used as a high-weight field conceptually by options
          options: [
            { label: "1–5 people", value: "1-5", scoreWeight: 5 },
            { label: "6–20 people", value: "6-20", scoreWeight: 15 },
            { label: "21–50 people", value: "21-50", scoreWeight: 25 },
            { label: "51–200 people", value: "51-200", scoreWeight: 30 },
            { label: "200+ people", value: "200+", scoreWeight: 20 },
          ],
        },
      ],
    },
    {
      id: "step-2",
      title: "Your current operations",
      subtitle: "Where do you lose the most time?",
      fields: [
        {
          id: "biggest_manual_task",
          label: "What task wastes your team's time the most?",
          type: "select",
          required: true,
          options: [
            { label: "Data entry and transfers", value: "data-entry", scoreWeight: 20 },
            { label: "Lead follow-up and communication", value: "lead-followup", scoreWeight: 25 },
            { label: "Reporting and document creation", value: "reporting", scoreWeight: 20 },
            { label: "Customer support responses", value: "support", scoreWeight: 20 },
            { label: "Invoice and payment processing", value: "invoicing", scoreWeight: 15 },
          ],
        },
        {
          id: "weekly_hours_wasted",
          label: "Roughly how many hours per week does your team spend on this?",
          type: "select",
          required: true,
          options: [
            { label: "Less than 5 hours", value: "<5", scoreWeight: 5 },
            { label: "5–15 hours", value: "5-15", scoreWeight: 15 },
            { label: "15–30 hours", value: "15-30", scoreWeight: 25 },
            { label: "30+ hours", value: "30+", scoreWeight: 35 },
          ],
        },
      ],
    },
    {
      id: "step-3",
      title: "Your tools and readiness",
      subtitle: "What is your current stack?",
      fields: [
        {
          id: "current_tools",
          label: "Which tools does your team currently use?",
          type: "multiselect",
          required: false,
          options: [
            { label: "Google Workspace", value: "google", scoreWeight: 5 },
            { label: "Zoho CRM", value: "zoho", scoreWeight: 8 },
            { label: "HubSpot", value: "hubspot", scoreWeight: 10 },
            { label: "Slack", value: "slack", scoreWeight: 5 },
            { label: "Notion", value: "notion", scoreWeight: 5 },
            { label: "Airtable", value: "airtable", scoreWeight: 8 },
            { label: "Custom software", value: "custom", scoreWeight: 15 },
            { label: "WhatsApp for business", value: "whatsapp", scoreWeight: 10 },
          ],
        },
        {
          id: "has_tried_automation",
          label: "Have you tried automating this before?",
          type: "radio",
          required: true,
          options: [
            { label: "No, first time", value: "no", scoreWeight: 10 },
            { label: "Yes, it didn't work well", value: "failed", scoreWeight: 20 },
            { label: "Partially, want to go further", value: "partial", scoreWeight: 25 },
          ],
        },
      ],
    },
    {
      id: "step-4",
      title: "Budget and timeline",
      subtitle: "Final details to prepare your plan.",
      fields: [
        {
          id: "budget",
          label: "What's your budget for this project?",
          type: "select",
          required: true,
          disqualifyIf: { field: "budget", values: ["<25k"], message: "Our AI workflow projects based on custom scope. We can discuss a phased approach." },
          options: [
            { label: "Entry Level / Seed", value: "<25k", scoreWeight: 5 },
            { label: "Growth / Standard", value: "25k-60k", scoreWeight: 20 },
            { label: "Growth / Standard", value: "60k-150k", scoreWeight: 35 },
            { label: "Custom+", value: ">150k", scoreWeight: 50 },
          ],
        },
        {
          id: "timeline",
          label: "Timeline",
          type: "select",
          required: true,
          options: [
            { label: "This week", value: "this-week", scoreWeight: 25 },
            { label: "Within a month", value: "month", scoreWeight: 20 },
            { label: "1–3 months", value: "1-3-months", scoreWeight: 10 },
            { label: "Just exploring", value: "exploring", scoreWeight: 5 },
          ],
        },
        {
          id: "description",
          label: "Describe the workflow you want automated",
          type: "textarea",
          required: false,
          placeholder: "Tell us about the specific process...",
          minLength: 30,
        },
      ],
    },
  ],
};
