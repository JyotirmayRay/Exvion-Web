import { FormConfig } from "@exvion/types";

export const businessAutomationForm: FormConfig = {
  id: "business-automation-form",
  serviceId: "business-automation",
  qualifyingThreshold: 65,
  disqualifyMessage: "",
  successMessage: "Automation project request received. We'll map your workflow and send a system design proposal within 24 hours.",
  steps: [
    {
      id: "step-1",
      title: "Your business operations",
      subtitle: "Tell us about your organization.",
      fields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "phone", required: true },
        {
          id: "business_size",
          label: "How big is your team?",
          type: "select",
          required: true,
          options: [
            { label: "Solo / 1–3 people", value: "1-3", scoreWeight: 10 },
            { label: "4–15 people", value: "4-15", scoreWeight: 20 },
            { label: "16–50 people", value: "16-50", scoreWeight: 30 },
            { label: "50+ people", value: ">50", scoreWeight: 35 },
          ],
        },
        {
          id: "industry",
          label: "What industry are you in?",
          type: "select",
          required: true,
          options: [
            { label: "E-commerce / retail", value: "ecommerce", scoreWeight: 20 },
            { label: "Professional services", value: "services", scoreWeight: 25 },
            { label: "Healthcare / clinic", value: "health", scoreWeight: 25 },
            { label: "Real estate", value: "real-estate", scoreWeight: 20 },
            { label: "Education / coaching", value: "education", scoreWeight: 20 },
            { label: "Manufacturing / logistics", value: "logistics", scoreWeight: 30 },
            { label: "Tech / SaaS", value: "tech", scoreWeight: 25 },
          ],
        },
      ],
    },
    {
      id: "step-2",
      title: "The workflow problem",
      subtitle: "Where are the bottlenecks?",
      fields: [
        {
          id: "broken_workflow",
          label: "Which workflow causes the most pain?",
          type: "select",
          required: true,
          options: [
            { label: "Lead capture to sales follow-up", value: "leads", scoreWeight: 25 },
            { label: "Onboarding new clients or employees", value: "onboarding", scoreWeight: 25 },
            { label: "Invoice creation and payment collection", value: "invoicing", scoreWeight: 25 },
            { label: "Data sync between tools", value: "sync", scoreWeight: 20 },
            { label: "Reporting and weekly summaries", value: "reporting", scoreWeight: 20 },
            { label: "Order fulfillment and operations", value: "fulfillment", scoreWeight: 25 },
          ],
        },
        {
          id: "pain_level",
          label: "How much is this costing you monthly (time + errors)?",
          type: "select",
          required: true,
          options: [
            { label: "Minor inconvenience", value: "minor", scoreWeight: 5 },
            { label: "Costs 5–10 hours/week of team time", value: "5-10hr", scoreWeight: 20 },
            { label: "Costs 10–30 hours/week", value: "10-30hr", scoreWeight: 35 },
            { label: "Is directly losing us clients or revenue", value: "losing-revenue", scoreWeight: 50 },
          ],
        },
      ],
    },
    {
      id: "step-3",
      title: "Tool ecosystem",
      subtitle: "How are you working today?",
      fields: [
        {
          id: "current_tools",
          label: "Which tools are involved in this workflow?",
          type: "multiselect",
          required: true,
          options: [
            { label: "Google Workspace / Gmail", value: "google", scoreWeight: 10 },
            { label: "Zoho / HubSpot / Salesforce", value: "crm", scoreWeight: 15 },
            { label: "WhatsApp / Telegram", value: "messaging", scoreWeight: 10 },
            { label: "Tally / QuickBooks / Razorpay", value: "finance", scoreWeight: 15 },
            { label: "Notion / Airtable / Trello", value: "pm", scoreWeight: 10 },
            { label: "Custom software / ERP", value: "custom", scoreWeight: 20 },
            { label: "Shopify / WooCommerce", value: "ecommerce", scoreWeight: 15 },
          ],
        },
        {
          id: "integration_complexity",
          label: "Do these tools have APIs or integration options?",
          type: "select",
          required: true,
          options: [
            { label: "Yes, most have Zapier or API", value: "yes", scoreWeight: 20 },
            { label: "Some do, some don't", value: "some", scoreWeight: 25 },
            { label: "No idea — need you to assess", value: "unsure", scoreWeight: 15 },
            { label: "Using custom / legacy software", value: "legacy", scoreWeight: 30 },
          ],
        },
      ],
    },
    {
      id: "step-4",
      title: "Budget",
      subtitle: "Financial plan.",
      fields: [
        {
          id: "budget",
          label: "Automation project budget?",
          type: "select",
          required: true,
          options: [
            { label: "Entry Level / Seed", value: "<25k", scoreWeight: 5 },
            { label: "Growth / Standard", value: "25k-60k", scoreWeight: 20 },
            { label: "Growth / Standard", value: "60k-150k", scoreWeight: 35 },
            { label: "Custom+", value: ">150k", scoreWeight: 45 },
          ],
        },
        {
          id: "timeline",
          label: "Timeline",
          type: "select",
          required: true,
          options: [
            { label: "This month — urgent", value: "month", scoreWeight: 30 },
            { label: "Next 4–6 weeks", value: "6weeks", scoreWeight: 20 },
            { label: "Next quarter", value: "quarter", scoreWeight: 10 },
          ],
        },
      ],
    },
  ],
};
