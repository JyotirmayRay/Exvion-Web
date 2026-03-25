import { FormConfig } from "@exvion/types";

export const apiIntegrationForm: FormConfig = {
  id: "api-integration-form",
  serviceId: "api-integration",
  qualifyingThreshold: 55,
  disqualifyMessage: "",
  successMessage: "API integration request confirmed. We'll send a technical assessment and timeline within 24 hours.",
  steps: [
    {
      id: "step-1",
      title: "Your project",
      subtitle: "What is the technical objective?",
      fields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "phone", required: true },
        {
          id: "integration_type",
          label: "What type of integration do you need?",
          type: "select",
          required: true,
          options: [
            { label: "Two existing platforms need to sync data", value: "sync", scoreWeight: 25 },
            { label: "Payment gateway integration", value: "payment", scoreWeight: 30 },
            { label: "Custom API development (build new API)", value: "custom-api", scoreWeight: 35 },
            { label: "Webhook setup and event handling", value: "webhooks", scoreWeight: 25 },
            { label: "Third-party service integration (SMS, email, maps)", value: "3rd-party", scoreWeight: 20 },
            { label: "ERP or enterprise system connection", value: "erp", scoreWeight: 35 },
          ],
        },
        {
          id: "platforms_involved",
          label: "Which specific platforms or APIs are involved?",
          type: "textarea",
          required: true,
          placeholder: "e.g. Razorpay, Zoho CRM, custom Node.js backend...",
          minLength: 20,
        },
      ],
    },
    {
      id: "step-2",
      title: "Technical context",
      subtitle: "How is the code currently configured?",
      fields: [
        {
          id: "existing_tech_stack",
          label: "What's your primary tech stack?",
          type: "select",
          required: true,
          options: [
            { label: "Node.js / Express / NestJS", value: "node", scoreWeight: 20 },
            { label: "PHP / Laravel / WordPress", value: "php", scoreWeight: 20 },
            { label: "Python / Django / FastAPI", value: "python", scoreWeight: 20 },
            { label: "React / Next.js frontend only", value: "frontend", scoreWeight: 15 },
            { label: "No backend yet — need one built", value: "no-backend", scoreWeight: 25 },
          ],
        },
        {
          id: "has_api_docs",
          label: "Do the APIs you need to connect have documentation?",
          type: "radio",
          required: true,
          options: [
            { label: "Yes — full API documentation available", value: "yes", scoreWeight: 20 },
            { label: "Partial documentation", value: "partial", scoreWeight: 15 },
            { label: "No documentation — custom/legacy system", value: "no", scoreWeight: 25 },
            { label: "Not sure", value: "unsure", scoreWeight: 10 },
          ],
        },
      ],
    },
    {
      id: "step-3",
      title: "Error handling requirements",
      subtitle: "How reliable does this need to be?",
      fields: [
        {
          id: "reliability_requirement",
          label: "How critical is this integration to your business?",
          type: "select",
          required: true,
          options: [
            { label: "Mission critical — must not fail", value: "critical", scoreWeight: 40 },
            { label: "Important but failure is recoverable", value: "important", scoreWeight: 25 },
            { label: "Nice to have — low priority", value: "low", scoreWeight: 5 },
          ],
        },
        {
          id: "error_handling_needed",
          label: "What reliability features do you need?",
          type: "multiselect",
          required: false,
          options: [
            { label: "Automatic retry on failure", value: "retry", scoreWeight: 15 },
            { label: "Error alerting and monitoring", value: "alerting", scoreWeight: 15 },
            { label: "Data validation before sync", value: "validation", scoreWeight: 15 },
            { label: "Audit log of all transactions", value: "audit", scoreWeight: 15 },
            { label: "Rate limiting and queue management", value: "queue", scoreWeight: 15 },
          ],
        },
      ],
    },
    {
      id: "step-4",
      title: "Budget and timeline",
      subtitle: "Investment limits.",
      fields: [
        {
          id: "budget",
          label: "Integration project budget?",
          type: "select",
          required: true,
          options: [
            { label: "Entry Level / Seed", value: "<10k", scoreWeight: 5 },
            { label: "Growth / Standard", value: "10k-30k", scoreWeight: 20 },
            { label: "Growth / Standard", value: "30k-75k", scoreWeight: 30 },
            { label: "Custom+", value: ">75k", scoreWeight: 40 },
          ],
        },
        {
          id: "go_live",
          label: "When does this need to be live?",
          type: "select",
          required: true,
          options: [
            { label: "This week — blocking other work", value: "this-week", scoreWeight: 35 },
            { label: "Within 2 weeks", value: "2weeks", scoreWeight: 25 },
            { label: "Within a month", value: "month", scoreWeight: 15 },
            { label: "Flexible", value: "flexible", scoreWeight: 5 },
          ],
        },
      ],
    },
  ],
};
