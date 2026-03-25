import { FormConfig } from "@exvion/types";

export const maintenanceForm: FormConfig = {
  id: "maintenance-form",
  serviceId: "maintenance",
  qualifyingThreshold: 50,
  disqualifyMessage: "",
  successMessage: "Maintenance plan request received. We'll audit your platform and send a plan recommendation within 24 hours.",
  steps: [
    {
      id: "step-1",
      title: "Your platform",
      subtitle: "What are we maintaining?",
      fields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "phone", required: true },
        {
          id: "platform_type",
          label: "What platform needs maintenance?",
          type: "select",
          required: true,
          options: [
            { label: "Custom-built SaaS / web app", value: "saas", scoreWeight: 30 },
            { label: "WordPress + WooCommerce site", value: "woo", scoreWeight: 25 },
            { label: "PHP script / self-hosted software", value: "php", scoreWeight: 25 },
            { label: "Multiple platforms", value: "multiple", scoreWeight: 35 },
            { label: "Mobile app (iOS/Android)", value: "mobile", scoreWeight: 20 },
          ],
        },
        { id: "platform_url", label: "Platform URL", type: "url", required: false },
      ],
    },
    {
      id: "step-2",
      title: "Current situation",
      subtitle: "How is it running right now?",
      fields: [
        {
          id: "last_updated",
          label: "When was this platform last properly maintained?",
          type: "select",
          required: true,
          options: [
            { label: "Never or don't know", value: "never", scoreWeight: 35 },
            { label: "More than 6 months ago", value: ">6mo", scoreWeight: 30 },
            { label: "3–6 months ago", value: "3-6mo", scoreWeight: 20 },
            { label: "Within 3 months", value: "<3mo", scoreWeight: 10 },
          ],
        },
        {
          id: "current_issues",
          label: "What issues are you currently experiencing?",
          type: "multiselect",
          required: false,
          options: [
            { label: "Slow performance", value: "slow", scoreWeight: 10 },
            { label: "Occasional bugs or errors", value: "bugs", scoreWeight: 15 },
            { label: "Security concerns", value: "security", scoreWeight: 20 },
            { label: "Outdated plugins or dependencies", value: "outdated", scoreWeight: 15 },
            { label: "No monitoring in place", value: "unmonitored", scoreWeight: 15 },
            { label: "Everything is fine, just want coverage", value: "fine", scoreWeight: 5 },
          ],
        },
      ],
    },
    {
      id: "step-3",
      title: "Team and coverage",
      subtitle: "Who is currently looking after this?",
      fields: [
        {
          id: "has_developer",
          label: "Do you currently have a developer looking after this?",
          type: "radio",
          required: true,
          options: [
            { label: "No, no one watches it", value: "no", scoreWeight: 30 },
            { label: "Occasionally I do it myself", value: "myself", scoreWeight: 20 },
            { label: "Freelancer on call", value: "freelancer", scoreWeight: 15 },
            { label: "In-house team but overloaded", value: "in-house", scoreWeight: 10 },
          ],
        },
        {
          id: "monthly_traffic",
          label: "Approximate monthly visitors or users?",
          type: "select",
          required: false,
          options: [
            { label: "Under 1,000", value: "<1k", scoreWeight: 5 },
            { label: "1,000–10,000", value: "1k-10k", scoreWeight: 15 },
            { label: "10,000–50,000", value: "10k-50k", scoreWeight: 25 },
            { label: "50,000+", value: ">50k", scoreWeight: 35 },
          ],
        },
      ],
    },
    {
      id: "step-4",
      title: "Plan budget",
      subtitle: "Select your expected coverage tier.",
      fields: [
        {
          id: "budget",
          label: "Monthly maintenance budget?",
          type: "select",
          required: true,
          options: [
            { label: "Entry Level / Seed/mo", value: "<5k", scoreWeight: 5 },
            { label: "Growth / Standard/mo", value: "5k-15k", scoreWeight: 20 },
            { label: "Growth / Standard/mo", value: "15k-30k", scoreWeight: 35 },
            { label: "Custom+/mo", value: ">30k", scoreWeight: 45 },
          ],
        },
      ],
    },
  ],
};
