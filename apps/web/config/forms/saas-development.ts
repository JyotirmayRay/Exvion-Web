import { FormConfig } from "@exvion/types";

export const saasDevelopmentForm: FormConfig = {
  id: "saas-development-form",
  serviceId: "saas-development",
  qualifyingThreshold: 60,
  disqualifyMessage: "",
  successMessage: "SaaS Development request confirmed. Our lead architect will review your project and get in touch within 24 hours.",
  steps: [
    {
      id: "step-1",
      title: "Your vision",
      subtitle: "Tell us about the SaaS you want to build.",
      fields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "phone", required: true },
        {
          id: "project_status",
          label: "What stage is your project in?",
          type: "select",
          required: true,
          options: [
            { label: "Idea phase", value: "idea", scoreWeight: 10 },
            { label: "Validated concept / MVP planned", value: "validated", scoreWeight: 30 },
            { label: "Existing product needing a rebuild", value: "rebuild", scoreWeight: 40 },
            { label: "Scaling an existing MVP", value: "scaling", scoreWeight: 35 },
          ],
        },
      ],
    },
    {
      id: "step-2",
      title: "Core infrastructure",
      subtitle: "What are the most critical requirements?",
      fields: [
        {
          id: "description",
          label: "Describe the core functionality of your platform",
          sublabel: "What is the primary problem it solves for users?",
          type: "textarea",
          required: true,
          placeholder: "The platform will allow users to...",
          minLength: 40,
        },
        {
          id: "complexity",
          label: "Which complex features does it require?",
          type: "multiselect",
          required: true,
          options: [
            { label: "Subscription billing (Stripe)", value: "billing", scoreWeight: 10 },
            { label: "AI integrations / LLMs", value: "ai", scoreWeight: 15 },
            { label: "Complex role-based permissions", value: "rbac", scoreWeight: 10 },
            { label: "Third-party APIs / Webhooks", value: "api", scoreWeight: 10 },
            { label: "Real-time data / WebSockets", value: "realtime", scoreWeight: 10 },
            { label: "High-volume data processing", value: "data", scoreWeight: 10 },
          ],
        },
      ],
    },
    {
      id: "step-3",
      title: "Timeline & scale",
      subtitle: "Planning for the build.",
      fields: [
        {
          id: "budget",
          label: "What is your budget explicitly allocated for development?",
          type: "select",
          required: true,
          disqualifyIf: { field: "budget", values: ["<50k"], message: "Custom SaaS infrastructure starts at a higher baseline. Please look at our smaller consulting packages first." },
          options: [
            { label: "< ₹50,000", value: "<50k", scoreWeight: 0 },
            { label: "₹50k - ₹1.5L", value: "50k-150k", scoreWeight: 20 },
            { label: "₹1.5L - ₹3L", value: "150k-300k", scoreWeight: 35 },
            { label: "₹3L+", value: ">300k", scoreWeight: 50 },
          ],
        },
        {
          id: "timeline",
          label: "When do you need the platform launched?",
          type: "select",
          required: true,
          options: [
            { label: "ASAP (Currently rushing)", value: "rush", scoreWeight: 30 },
            { label: "1-3 months", value: "1-3mo", scoreWeight: 25 },
            { label: "3-6 months", value: "3-6mo", scoreWeight: 15 },
            { label: "No fixed target", value: "flexible", scoreWeight: 5 },
          ],
        },
      ],
    },
  ],
};
