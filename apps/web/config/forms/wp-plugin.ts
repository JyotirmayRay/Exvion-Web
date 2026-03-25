import { FormConfig } from "@exvion/types";

export const wpPluginForm: FormConfig = {
  id: "wp-plugin-form",
  serviceId: "wp-plugin",
  qualifyingThreshold: 55,
  disqualifyMessage: "",
  successMessage: "Plugin requirements received. We'll review and send a technical scope and quote within 24 hours.",
  steps: [
    {
      id: "step-1",
      title: "Your WordPress setup",
      subtitle: "Tell us about your current site.",
      fields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "phone", required: true },
        {
          id: "site_live",
          label: "Is your WordPress site currently live?",
          type: "radio",
          required: true,
          options: [
            { label: "Yes, fully live and running", value: "live", scoreWeight: 20 },
            { label: "Under development", value: "dev", scoreWeight: 15 },
            { label: "Not built yet", value: "not-built", scoreWeight: 10 },
          ],
        },
        {
          id: "site_url",
          label: "Site URL (if live)",
          type: "url",
          required: false,
          showIf: { field: "site_live", values: ["live"] },
        },
      ],
    },
    {
      id: "step-2",
      title: "The plugin you need",
      subtitle: "What functionality are we building?",
      fields: [
        {
          id: "plugin_type",
          label: "What kind of plugin do you need built?",
          type: "select",
          required: true,
          options: [
            { label: "WooCommerce customization", value: "woo", scoreWeight: 25 },
            { label: "Custom admin dashboard panel", value: "admin", scoreWeight: 20 },
            { label: "Membership and access control", value: "membership", scoreWeight: 25 },
            { label: "Custom form and data capture", value: "forms", scoreWeight: 20 },
            { label: "Payment gateway integration", value: "payments", scoreWeight: 25 },
            { label: "Third-party API integration", value: "api", scoreWeight: 20 },
            { label: "Something else entirely", value: "other", scoreWeight: 15 },
          ],
        },
        {
          id: "plugin_complexity",
          label: "How would you describe the complexity?",
          type: "select",
          required: true,
          options: [
            { label: "Simple — one focused feature", value: "simple", scoreWeight: 15 },
            { label: "Medium — a few connected features", value: "medium", scoreWeight: 25 },
            { label: "Complex — full system with database", value: "complex", scoreWeight: 35 },
          ],
        },
      ],
    },
    {
      id: "step-3",
      title: "Technical context",
      subtitle: "How does it fit together?",
      fields: [
        {
          id: "existing_plugins",
          label: "List any existing plugins that must work alongside this",
          type: "textarea",
          required: false,
          placeholder: "e.g. WooCommerce, WPML, Elementor...",
        },
        {
          id: "has_docs_or_spec",
          label: "Do you have a written spec or documentation?",
          type: "radio",
          required: true,
          options: [
            { label: "Yes, detailed specification ready", value: "yes", scoreWeight: 20 },
            { label: "Have rough notes / wireframes", value: "notes", scoreWeight: 10 },
            { label: "No, need help defining it", value: "no", scoreWeight: 5 },
          ],
        },
      ],
    },
    {
      id: "step-4",
      title: "Budget and delivery",
      subtitle: "Final details to prepare your quote.",
      fields: [
        {
          id: "budget",
          label: "What's your budget?",
          type: "select",
          required: true,
          options: [
            { label: "Entry Level / Seed", value: "<10k", scoreWeight: 5 },
            { label: "Growth / Standard", value: "10k-25k", scoreWeight: 20 },
            { label: "Growth / Standard", value: "25k-60k", scoreWeight: 30 },
            { label: "Custom+", value: ">60k", scoreWeight: 40 },
          ],
        },
        {
          id: "timeline",
          label: "Delivery timeline?",
          type: "select",
          required: true,
          options: [
            { label: "Urgent — under 1 week", value: "urgent", scoreWeight: 25 },
            { label: "1–2 weeks", value: "1-2-weeks", scoreWeight: 20 },
            { label: "2–4 weeks", value: "2-4-weeks", scoreWeight: 15 },
            { label: "Flexible", value: "flexible", scoreWeight: 10 },
          ],
        },
      ],
    },
  ],
};
