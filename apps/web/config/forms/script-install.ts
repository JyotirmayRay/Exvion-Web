import { FormConfig } from "@exvion/types";

export const scriptInstallForm: FormConfig = {
  id: "script-install-form",
  serviceId: "script-install",
  qualifyingThreshold: 40,
  disqualifyMessage: "",
  successMessage: "Script installation request received. We'll review requirements and send a quote within 12 hours.",
  steps: [
    {
      id: "step-1",
      title: "The script",
      subtitle: "What are we installing?",
      fields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "phone", required: true },
        {
          id: "script_type",
          label: "What type of script needs installing?",
          type: "select",
          required: true,
          options: [
            { label: "PHP script / web application", value: "php", scoreWeight: 20 },
            { label: "WordPress theme or plugin", value: "wp", scoreWeight: 20 },
            { label: "E-commerce script (OpenCart, Prestashop)", value: "ecommerce", scoreWeight: 25 },
            { label: "Membership or subscription script", value: "membership", scoreWeight: 25 },
            { label: "Marketplace or classified script", value: "marketplace", scoreWeight: 25 },
            { label: "Chat or support script", value: "chat", scoreWeight: 20 },
            { label: "Custom / Other", value: "other", scoreWeight: 15 },
          ],
        },
        {
          id: "script_name",
          label: "Script name or URL (if purchased)",
          type: "text",
          required: false,
          placeholder: "e.g. Perfex CRM, Selly, Codecanyon item...",
        },
      ],
    },
    {
      id: "step-2",
      title: "Hosting setup",
      subtitle: "Where is this going?",
      fields: [
        {
          id: "hosting_type",
          label: "What hosting environment are you using?",
          type: "select",
          required: true,
          options: [
            { label: "Shared hosting (cPanel)", value: "cpanel", scoreWeight: 15 },
            { label: "VPS (DigitalOcean, Vultr, AWS)", value: "vps", scoreWeight: 25 },
            { label: "Managed WordPress hosting", value: "managed-wp", scoreWeight: 15 },
            { label: "Don't have hosting yet", value: "none", scoreWeight: 20 },
            { label: "Not sure", value: "unsure", scoreWeight: 10 },
          ],
        },
        {
          id: "has_server_access",
          label: "Can you provide server/cPanel/SSH access?",
          type: "radio",
          required: true,
          options: [
            { label: "Yes — can provide full access", value: "full", scoreWeight: 25 },
            { label: "Partial access available", value: "partial", scoreWeight: 15 },
            { label: "Not sure what access I have", value: "unsure", scoreWeight: 10 },
          ],
        },
      ],
    },
    {
      id: "step-3",
      title: "Customization needed",
      subtitle: "Do you need modifications beyond the default install?",
      fields: [
        {
          id: "customization_level",
          label: "How much customization do you need beyond installation?",
          type: "select",
          required: true,
          options: [
            { label: "Just install and configure — no changes", value: "none", scoreWeight: 10 },
            { label: "Minor styling / branding changes", value: "minor", scoreWeight: 20 },
            { label: "Functional customizations needed", value: "functional", scoreWeight: 35 },
            { label: "Significant modifications required", value: "significant", scoreWeight: 45 },
          ],
        },
        {
          id: "customization_details",
          label: "Describe any specific customizations needed",
          type: "textarea",
          required: false,
          placeholder: "Any changes to default functionality, design, or features...",
          showIf: {
            field: "customization_level",
            values: [
              "functional",
              "significant"
            ]
          },
        },
      ],
    },
    {
      id: "step-4",
      title: "Budget and urgency",
      subtitle: "Final details to dispatch your quote.",
      fields: [
        {
          id: "budget",
          label: "Budget for this service?",
          type: "select",
          required: true,
          options: [
            { label: "Entry Level / Seed", value: "<3k", scoreWeight: 5 },
            { label: "Growth / Standard", value: "3k-10k", scoreWeight: 15 },
            { label: "Growth / Standard", value: "10k-30k", scoreWeight: 25 },
            { label: "Custom+", value: ">30k", scoreWeight: 35 },
          ],
        },
        {
          id: "urgency",
          label: "When do you need this done?",
          type: "select",
          required: true,
          options: [
            { label: "Today or tomorrow", value: "1-2days", scoreWeight: 30 },
            { label: "Within 3 days", value: "3days", scoreWeight: 25 },
            { label: "This week", value: "this-week", scoreWeight: 20 },
            { label: "Flexible", value: "flexible", scoreWeight: 10 },
          ],
        },
      ],
    },
  ],
};
