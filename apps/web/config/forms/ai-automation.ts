import { FormConfig } from "@exvion/types";

export const aiAutomationForm: FormConfig = {
  id: "ai-automation-form",
  serviceId: "ai-automation",
  qualifyingThreshold: 65,
  disqualifyMessage: "",
  successMessage: "AI Automation request confirmed. Our lead AI architect will review your current operations and get in touch within 24 hours.",
  steps: [
    {
      id: "step-1",
      title: "Your operations",
      subtitle: "Tell us about the processes you want to automate.",
      fields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "phone", required: true },
        {
          id: "company_size",
          label: "What is your current company size?",
          type: "select",
          required: true,
          options: [
            { label: "1-10 Employees", value: "micro", scoreWeight: 10 },
            { label: "11-50 Employees", value: "small", scoreWeight: 25 },
            { label: "51-200 Employees", value: "medium", scoreWeight: 35 },
            { label: "201+ Employees", value: "enterprise", scoreWeight: 40 },
          ],
        },
      ],
    },
    {
      id: "step-2",
      title: "Current bottlenecks",
      subtitle: "Where are you losing the most time?",
      fields: [
        {
          id: "bottleneck_description",
          label: "Describe the manual processes taking up the most time",
          sublabel: "e.g., Data entry, manual routing, customer support triage...",
          type: "textarea",
          required: true,
          placeholder: "Currently, our team spends 20 hours a week doing...",
          minLength: 40,
        },
        {
          id: "software_stack",
          label: "What core software do you currently use?",
          type: "multiselect",
          required: true,
          options: [
            { label: "HubSpot / Salesforce", value: "crm", scoreWeight: 15 },
            { label: "Google Workspace / Office 365", value: "workspace", scoreWeight: 10 },
            { label: "Zendesk / Intercom", value: "support", scoreWeight: 15 },
            { label: "Custom Internal Database", value: "custom_db", scoreWeight: 15 },
            { label: "Slack / Teams", value: "chat", scoreWeight: 10 },
            { label: "Stripe / Quickbooks", value: "finance", scoreWeight: 10 },
          ],
        },
      ],
    },
    {
      id: "step-3",
      title: "Investment & goals",
      subtitle: "Planning for the deployment.",
      fields: [
        {
          id: "budget",
          label: "What is your allocated budget for this AI integration?",
          type: "select",
          required: true,
          disqualifyIf: { field: "budget", values: ["<50k"], message: "Custom AI infrastructure requires a higher baseline. Please consider our consulting packages." },
          options: [
            { label: "< ₹50,000", value: "<50k", scoreWeight: 0 },
            { label: "₹50k - ₹1.5L", value: "50k-150k", scoreWeight: 20 },
            { label: "₹1.5L - ₹3L", value: "150k-300k", scoreWeight: 35 },
            { label: "₹3L+", value: ">300k", scoreWeight: 50 },
          ],
        },
        {
          id: "timeline",
          label: "When do you want this automation live?",
          type: "select",
          required: true,
          options: [
            { label: "Immediately (Urgent bottleneck)", value: "rush", scoreWeight: 30 },
            { label: "1-2 months", value: "1-2mo", scoreWeight: 25 },
            { label: "3-6 months", value: "3-6mo", scoreWeight: 15 },
            { label: "Just exploring options", value: "exploring", scoreWeight: 5 },
          ],
        },
      ],
    },
  ],
};
