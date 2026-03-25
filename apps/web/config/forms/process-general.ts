import { FormConfig } from "@exvion/types";

export const processGeneralForm: FormConfig = {
  id: "process-general-form-v2",
  serviceId: "process-general",
  qualifyingThreshold: 40,
  disqualifyMessage: "We specialize in high-end technical architecture and global scaling. Your current budget or timeline suggests you might be better served by a smaller boutique agency.",
  successMessage: "Methodology Intake Complete. Our lead architect is reviewing your project logic. Expect a technical roadmap in your inbox within 24 hours.",
  steps: [
    {
      id: "step-1",
      title: "Technical Extraction",
      subtitle: "What are we architecting?",
      fields: [
        {
          id: "project_focus",
          label: "Primary Engineering Focus",
          type: "select",
          required: true,
          options: [
            { label: "SaaS Platform (Subscription/Multi-tenant)", value: "saas", scoreWeight: 20 },
            { label: "AI & Machine Learning Pipeline", value: "ai", scoreWeight: 25 },
            { label: "High-Traffic Web Systems", value: "web", scoreWeight: 15 },
            { label: "Technical Debt & Performance Audit", value: "audit", scoreWeight: 10 }
          ]
        },
        {
          id: "logic_description",
          label: "Core Business Logic / Bottleneck",
          type: "textarea",
          required: true,
          placeholder: "Describe the primary technical challenge we are solving...",
          minLength: 50
        }
      ]
    },
    {
      id: "step-2",
      title: "Scale & Timeline",
      subtitle: "Defining the deployment window.",
      fields: [
        {
          id: "launch_window",
          label: "Target Launch Deadline",
          type: "select",
          required: true,
          options: [
            { label: "Critical (< 1 month)", value: "critical", scoreWeight: 30 },
            { label: "Standard (3 months)", value: "standard", scoreWeight: 15 },
            { label: "Strategic / Long-term", value: "strategic", scoreWeight: 10 }
          ]
        },
        {
          id: "budget_allocation",
          label: "Allocated Architecture Budget",
          type: "select",
          required: true,
          options: [
            { label: "₹3L - ₹5L", value: "3-5l", scoreWeight: 20 },
            { label: "₹5L - ₹10L", value: "5-10l", scoreWeight: 40 },
            { label: "₹10L+ (Enterprise)", value: "10l+", scoreWeight: 60 }
          ]
        }
      ]
    },
    {
      id: "step-3",
      title: "Identity Transmission",
      subtitle: "Where should we send the roadmap?",
      fields: [
        { id: "name", label: "Full Name", type: "text", required: true },
        { id: "email", label: "Corporate Email", type: "email", required: true },
        { id: "phone", label: "WhatsApp / Signal", type: "phone", required: true }
      ]
    }
  ]
};
