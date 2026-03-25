import { FormConfig } from "@exvion/types";

export const mvpBuildForm: FormConfig = {
  id: "mvp-build-form",
  serviceId: "mvp-build",
  qualifyingThreshold: 65,
  disqualifyMessage: "",
  successMessage: "MVP project request confirmed. We'll send a scope recommendation and timeline estimate within 24 hours.",
  steps: [
    {
      id: "step-1",
      title: "About your idea",
      subtitle: "Where are we starting from?",
      fields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "phone", required: true },
        {
          id: "idea_stage",
          label: "How developed is your idea right now?",
          type: "select",
          required: true,
          options: [
            { label: "Fully validated with potential users", value: "validated", scoreWeight: 40 },
            { label: "Researched but not yet validated", value: "researched", scoreWeight: 25 },
            { label: "Strong gut feeling, minimal research", value: "gut", scoreWeight: 10 },
            { label: "Have mockups or wireframes ready", value: "mockups", scoreWeight: 35 },
          ],
        },
        {
          id: "has_existing_product",
          label: "Is there anything built already?",
          type: "radio",
          required: true,
          options: [
            { label: "Starting from zero", value: "zero", scoreWeight: 20 },
            { label: "Have wireframes / designs", value: "designs", scoreWeight: 30 },
            { label: "Have a prototype, need proper build", value: "prototype", scoreWeight: 35 },
          ],
        },
      ],
    },
    {
      id: "step-2",
      title: "MVP scope",
      subtitle: "What are the core requirements?",
      fields: [
        {
          id: "product_type",
          label: "What type of product is this?",
          type: "select",
          required: true,
          options: [
            { label: "Web application", value: "web", scoreWeight: 25 },
            { label: "Mobile-first web app", value: "mobile-web", scoreWeight: 25 },
            { label: "B2B internal tool", value: "b2b", scoreWeight: 30 },
            { label: "Consumer product", value: "b2c", scoreWeight: 20 },
            { label: "Marketplace", value: "marketplace", scoreWeight: 25 },
            { label: "SaaS platform", value: "saas", scoreWeight: 30 },
          ],
        },
        {
          id: "core_feature",
          label: "Describe the ONE core feature that makes your MVP valuable",
          sublabel: "Just the single most important feature — what problem does it solve?",
          type: "textarea",
          required: true,
          placeholder: "The core thing users will use every day...",
          minLength: 40,
        },
        {
          id: "target_users",
          label: "Who is your target user?",
          type: "text",
          required: true,
          placeholder: "e.g. Freelancers managing multiple clients",
        },
      ],
    },
    {
      id: "step-3",
      title: "Technical context",
      subtitle: "Your technical background and plans.",
      fields: [
        {
          id: "technical_background",
          label: "Are you a technical founder?",
          type: "select",
          required: true,
          options: [
            { label: "Yes — can review code and architecture", value: "yes", scoreWeight: 20 },
            { label: "Somewhat — understand the basics", value: "somewhat", scoreWeight: 15 },
            { label: "No — fully non-technical", value: "no", scoreWeight: 20 },
            { label: "Have a CTO or technical co-founder", value: "cto", scoreWeight: 25 },
          ],
        },
        {
          id: "post_mvp_plan",
          label: "What happens after MVP launches?",
          type: "select",
          required: true,
          options: [
            { label: "Raise funding based on traction", value: "fund", scoreWeight: 35 },
            { label: "Self-fund and grow organically", value: "bootstrapped", scoreWeight: 25 },
            { label: "Sell the product or service directly", value: "sales", scoreWeight: 20 },
            { label: "Not sure yet", value: "unsure", scoreWeight: 10 },
          ],
        },
      ],
    },
    {
      id: "step-4",
      title: "Investment",
      subtitle: "Final details to prepare your estimate.",
      fields: [
        {
          id: "budget",
          label: "MVP development budget?",
          type: "select",
          required: true,
          disqualifyIf: { field: "budget", values: ["<40k"], message: "MVP projects based on custom scope. We can discuss a smaller scoped version." },
          options: [
            { label: "Entry Level / Seed", value: "<40k", scoreWeight: 5 },
            { label: "Growth / Standard", value: "40k-80k", scoreWeight: 20 },
            { label: "Growth / Standard", value: "80k-200k", scoreWeight: 35 },
            { label: "Custom+", value: ">200k", scoreWeight: 45 },
          ],
        },
        {
          id: "launch_deadline",
          label: "Do you have a launch deadline?",
          type: "select",
          required: true,
          options: [
            { label: "Hard deadline — date locked in", value: "hard", scoreWeight: 30 },
            { label: "Soft target — within 2 months", value: "soft", scoreWeight: 20 },
            { label: "Flexible — quality over speed", value: "flexible", scoreWeight: 10 },
          ],
        },
      ],
    },
  ],
};
