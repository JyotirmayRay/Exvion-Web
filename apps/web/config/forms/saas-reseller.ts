import { FormConfig } from "@exvion/types";

export const saasResellerForm: FormConfig = {
  id: "saas-reseller-form",
  serviceId: "saas-reseller",
  qualifyingThreshold: 65,
  disqualifyMessage: "",
  successMessage: "Reseller setup request confirmed. We'll prepare a platform recommendation and infrastructure plan within 24 hours.",
  steps: [
    {
      id: "step-1",
      title: "Your reseller business",
      subtitle: "Tell us about your organization.",
      fields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "phone", required: true },
        {
          id: "current_business",
          label: "What's your current business model?",
          type: "select",
          required: true,
          options: [
            { label: "Digital agency — adding SaaS revenue", value: "agency", scoreWeight: 35 },
            { label: "Freelancer moving to productized service", value: "freelancer", scoreWeight: 25 },
            { label: "Entrepreneur starting a SaaS reseller", value: "entrepreneur", scoreWeight: 30 },
            { label: "Already reselling, need better infrastructure", value: "existing", scoreWeight: 40 },
          ],
        },
        {
          id: "already_reselling",
          label: "Are you currently reselling any SaaS product?",
          type: "radio",
          required: true,
          options: [
            { label: "Yes — want to scale it properly", value: "yes", scoreWeight: 40 },
            { label: "No — starting fresh", value: "no", scoreWeight: 20 },
          ],
        },
      ],
    },
    {
      id: "step-2",
      title: "Client pipeline",
      subtitle: "How many users do you expect?",
      fields: [
        {
          id: "potential_clients",
          label: "How many potential clients do you have ready?",
          type: "select",
          required: true,
          options: [
            { label: "None yet — building pipeline", value: "0", scoreWeight: 10 },
            { label: "5–20 warm prospects", value: "5-20", scoreWeight: 25 },
            { label: "20–50 clients ready to sign up", value: "20-50", scoreWeight: 40 },
            { label: "50+ clients in pipeline", value: "50+", scoreWeight: 50 },
          ],
        },
        {
          id: "client_type",
          label: "Who are your target reseller clients?",
          type: "select",
          required: true,
          options: [
            { label: "Small business owners", value: "smb", scoreWeight: 20 },
            { label: "Other agencies or freelancers", value: "agencies", scoreWeight: 25 },
            { label: "Enterprise teams", value: "enterprise", scoreWeight: 35 },
            { label: "Mixed audience", value: "mixed", scoreWeight: 25 },
          ],
        },
      ],
    },
    {
      id: "step-3",
      title: "Infrastructure needs",
      subtitle: "What technical features will your reseller portal need?",
      fields: [
        {
          id: "required_features",
          label: "Which reseller features do you need?",
          type: "multiselect",
          required: true,
          options: [
            { label: "Sub-account provisioning per client", value: "subaccounts", scoreWeight: 20 },
            { label: "Branded client login portal", value: "portal", scoreWeight: 20 },
            { label: "Automated billing and invoicing", value: "billing", scoreWeight: 25 },
            { label: "Reseller analytics dashboard", value: "analytics", scoreWeight: 20 },
            { label: "White-labeled client support portal", value: "support", scoreWeight: 15 },
            { label: "Custom domain per client", value: "custom-domain", scoreWeight: 20 },
            { label: "Usage limits per client tier", value: "limits", scoreWeight: 20 },
          ],
        },
        {
          id: "saas_to_resell",
          label: "Do you have a specific SaaS to resell or need recommendations?",
          type: "select",
          required: true,
          options: [
            { label: "Yes — have a specific platform", value: "yes", scoreWeight: 25 },
            { label: "Need recommendations from you", value: "recommendations", scoreWeight: 20 },
            { label: "Want to evaluate options together", value: "evaluate", scoreWeight: 20 },
          ],
        },
      ],
    },
    {
      id: "step-4",
      title: "Investment",
      subtitle: "Final deployment details.",
      fields: [
        {
          id: "budget",
          label: "Infrastructure setup budget?",
          type: "select",
          required: true,
          options: [
            { label: "Entry Level / Seed", value: "<30k", scoreWeight: 5 },
            { label: "Growth / Standard", value: "30k-75k", scoreWeight: 20 },
            { label: "Growth / Standard", value: "75k-150k", scoreWeight: 35 },
            { label: "Custom+", value: ">150k", scoreWeight: 50 },
          ],
        },
        {
          id: "go_live",
          label: "When do you want to start acquiring reseller clients?",
          type: "select",
          required: true,
          options: [
            { label: "This month", value: "this-month", scoreWeight: 35 },
            { label: "Next month", value: "next-month", scoreWeight: 25 },
            { label: "Next quarter", value: "next-quarter", scoreWeight: 10 },
          ],
        },
      ],
    },
  ],
};
