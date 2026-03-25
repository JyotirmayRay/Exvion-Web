import { FormConfig } from "@exvion/types";

export const customCrmForm: FormConfig = {
  id: "custom-crm-form",
  serviceId: "custom-crm",
  qualifyingThreshold: 65,
  disqualifyMessage: "",
  successMessage: "Custom CRM request received. We'll map your sales process and send a build proposal within 24 hours.",
  steps: [
    {
      id: "step-1",
      title: "Your sales operation",
      subtitle: "Tell us about your team size and tools.",
      fields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "phone", required: true },
        {
          id: "sales_team_size",
          label: "How many people use or will use the CRM?",
          type: "select",
          required: true,
          options: [
            { label: "Just me", value: "1", scoreWeight: 15 },
            { label: "2–5 people", value: "2-5", scoreWeight: 25 },
            { label: "6–20 people", value: "6-20", scoreWeight: 35 },
            { label: "20+ people", value: ">20", scoreWeight: 40 },
          ],
        },
        {
          id: "current_crm",
          label: "What are you using to manage leads/clients now?",
          type: "select",
          required: true,
          options: [
            { label: "Spreadsheet (Excel/Sheets)", value: "spreadsheet", scoreWeight: 30 },
            { label: "Off-the-shelf CRM (HubSpot, Zoho)", value: "commercial", scoreWeight: 35 },
            { label: "WhatsApp / email manually", value: "manual", scoreWeight: 25 },
            { label: "Nothing structured", value: "none", scoreWeight: 20 },
          ],
        },
      ],
    },
    {
      id: "step-2",
      title: "Sales process",
      subtitle: "How do your sales flow?",
      fields: [
        {
          id: "pipeline_stages",
          label: "Describe your sales pipeline stages",
          sublabel: "e.g. Lead → Called → Quoted → Negotiation → Closed",
          type: "textarea",
          required: true,
          placeholder: "List your stages in order...",
          minLength: 20,
        },
        {
          id: "biggest_crm_pain",
          label: "Biggest problem with your current setup?",
          type: "select",
          required: true,
          options: [
            { label: "Can't track where leads are in the pipeline", value: "tracking", scoreWeight: 25 },
            { label: "No follow-up reminders or task automation", value: "automation", scoreWeight: 30 },
            { label: "Reporting takes too long to generate", value: "reporting", scoreWeight: 25 },
            { label: "Team not using it — too complicated", value: "adoption", scoreWeight: 30 },
            { label: "Missing our specific industry features", value: "features", scoreWeight: 35 },
          ],
        },
      ],
    },
    {
      id: "step-3",
      title: "Custom requirements",
      subtitle: "What special features do you need?",
      fields: [
        {
          id: "custom_features",
          label: "Which features are must-haves for you?",
          type: "multiselect",
          required: true,
          options: [
            { label: "Custom pipeline stages", value: "stages", scoreWeight: 15 },
            { label: "Automated follow-up tasks", value: "tasks", scoreWeight: 20 },
            { label: "Lead scoring system", value: "scoring", scoreWeight: 20 },
            { label: "WhatsApp / email integration", value: "integration", scoreWeight: 20 },
            { label: "Invoice and proposal generation", value: "invoicing", scoreWeight: 20 },
            { label: "Mobile app access", value: "mobile", scoreWeight: 15 },
            { label: "Team performance analytics", value: "analytics", scoreWeight: 20 },
            { label: "Client portal", value: "portal", scoreWeight: 20 },
          ],
        },
        {
          id: "data_migration",
          label: "Do you need existing data migrated?",
          type: "radio",
          required: true,
          options: [
            { label: "Yes — significant data to migrate", value: "significant", scoreWeight: 20 },
            { label: "Small amount to migrate", value: "small", scoreWeight: 10 },
            { label: "Starting fresh — no migration", value: "none", scoreWeight: 5 },
          ],
        },
      ],
    },
    {
      id: "step-4",
      title: "Investment",
      subtitle: "Preparing your CRM blueprint.",
      fields: [
        {
          id: "budget",
          label: "CRM build budget?",
          type: "select",
          required: true,
          options: [
            { label: "Entry Level / Seed", value: "<40k", scoreWeight: 5 },
            { label: "Growth / Standard", value: "40k-90k", scoreWeight: 20 },
            { label: "Growth / Standard", value: "90k-200k", scoreWeight: 35 },
            { label: "Custom+", value: ">200k", scoreWeight: 45 },
          ],
        },
        {
          id: "timeline",
          label: "Timeline",
          type: "select",
          required: true,
          options: [
            { label: "ASAP — under 4 weeks", value: "<4weeks", scoreWeight: 30 },
            { label: "4–8 weeks", value: "4-8weeks", scoreWeight: 20 },
            { label: "2–3 months", value: "2-3mo", scoreWeight: 10 },
          ],
        },
      ],
    },
  ],
};
