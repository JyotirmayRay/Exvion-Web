import { FormConfig } from "@exvion/types";

export const websiteSystemsForm: FormConfig = {
  id: "website-systems-form",
  serviceId: "website-systems",
  qualifyingThreshold: 60,
  disqualifyMessage: "",
  successMessage: "Website inquiry confirmed. Our technical lead will review your requirements and reach out within 24 hours to discuss the architecture.",
  steps: [
    {
      id: "step-1",
      title: "Your web presence",
      subtitle: "Tell us about your current or planned website.",
      fields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "phone", required: true },
        {
          id: "current_website",
          label: "Current Website URL (if any)",
          type: "text",
          required: false,
          placeholder: "https://yourdomain.com",
        },
      ],
    },
    {
      id: "step-2",
      title: "Core objectives",
      subtitle: "What is driving this web project?",
      fields: [
        {
          id: "primary_goal",
          label: "What is the primary goal for this website?",
          type: "select",
          required: true,
          options: [
            { label: "Complete brand overhaul & redesign", value: "rebrand", scoreWeight: 20 },
            { label: "Drastically improve load speed & core web vitals", value: "speed", scoreWeight: 35 },
            { label: "Dominate technical SEO and organic search", value: "seo", scoreWeight: 30 },
            { label: "Migrate away from bloated WordPress/Wix", value: "migrate", scoreWeight: 25 },
          ],
        },
        {
          id: "required_features",
          label: "What features are absolutely necessary?",
          type: "multiselect",
          required: true,
          options: [
            { label: "Headless CMS (Sanity, Strapi, etc.)", value: "cms", scoreWeight: 15 },
            { label: "Complex Animations & 3D (WebGL/Framer)", value: "animation", scoreWeight: 15 },
            { label: "Multi-language / Localization support", value: "i18n", scoreWeight: 10 },
            { label: "Custom API Integrations (CRM, ERP)", value: "api", scoreWeight: 15 },
            { label: "Aggressive SEO Optimization", value: "seo", scoreWeight: 10 },
          ],
        },
      ],
    },
    {
      id: "step-3",
      title: "Scope & Timeline",
      subtitle: "Planning the build.",
      fields: [
        {
          id: "budget",
          label: "What is your budget for this web system?",
          type: "select",
          required: true,
          disqualifyIf: { field: "budget", values: ["<25k"], message: "Custom React/Next.js engineering requires a higher baseline budget. We recommend template solutions for this range." },
          options: [
            { label: "< ₹25,000", value: "<25k", scoreWeight: 0 },
            { label: "₹25k - ₹75k", value: "25k-75k", scoreWeight: 20 },
            { label: "₹75k - ₹2L", value: "75k-200k", scoreWeight: 35 },
            { label: "₹2L+", value: ">200k", scoreWeight: 50 },
          ],
        },
        {
          id: "timeline",
          label: "When do you need the new site live?",
          type: "select",
          required: true,
          options: [
            { label: "ASAP (Rushing)", value: "rush", scoreWeight: 30 },
            { label: "1-2 months", value: "1-2mo", scoreWeight: 25 },
            { label: "2-4 months", value: "2-4mo", scoreWeight: 15 },
            { label: "Flexible", value: "flexible", scoreWeight: 5 },
          ],
        },
      ],
    },
  ],
};
