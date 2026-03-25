import { FormConfig } from "@exvion/types";

export const featureDevForm: FormConfig = {
  id: "feature-dev-form",
  serviceId: "feature-dev",
  qualifyingThreshold: 70,
  disqualifyMessage: "",
  successMessage: "Retainer request received. We'll review your product and send a custom sprint proposal within 24 hours.",
  steps: [
    {
      id: "step-1",
      title: "Your product",
      subtitle: "Tell us about what you're building.",
      fields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "phone", required: true },
        {
          id: "product_stage",
          label: "Where is your product right now?",
          type: "select",
          required: true,
          options: [
            { label: "Live with paying users", value: "live-paying", scoreWeight: 40 },
            { label: "Live but pre-revenue", value: "live-free", scoreWeight: 25 },
            { label: "In development", value: "dev", scoreWeight: 15 },
            { label: "Just launched", value: "launched", scoreWeight: 30 },
          ],
        },
        { id: "product_url", label: "Product URL", type: "url", required: false },
      ],
    },
    {
      id: "step-2",
      title: "Development situation",
      subtitle: "How is your engineering handled right now?",
      fields: [
        {
          id: "current_dev_team",
          label: "Current development setup?",
          type: "select",
          required: true,
          options: [
            { label: "No developer at all", value: "none", scoreWeight: 30 },
            { label: "Using freelancers inconsistently", value: "freelancers", scoreWeight: 35 },
            { label: "Have one developer, need more capacity", value: "one-dev", scoreWeight: 25 },
            { label: "Have a team, need specific expertise", value: "team", scoreWeight: 20 },
          ],
        },
        {
          id: "features_ready",
          label: "Do you have a defined feature backlog or roadmap?",
          type: "select",
          required: true,
          options: [
            { label: "Yes, fully documented roadmap", value: "roadmap", scoreWeight: 35 },
            { label: "List of features but not prioritized", value: "list", scoreWeight: 20 },
            { label: "General ideas, need help defining", value: "ideas", scoreWeight: 10 },
          ],
        },
      ],
    },
    {
      id: "step-3",
      title: "Retainer expectations",
      subtitle: "What do you expect out of this engagement?",
      fields: [
        {
          id: "tech_stack",
          label: "What is your current tech stack?",
          type: "multiselect",
          required: true,
          options: [
            { label: "Next.js / React", value: "react", scoreWeight: 15 },
            { label: "Node.js / NestJS", value: "node", scoreWeight: 15 },
            { label: "WordPress / PHP", value: "wp", scoreWeight: 15 },
            { label: "React Native", value: "rn", scoreWeight: 15 },
            { label: "Python / Django / FastAPI", value: "python", scoreWeight: 15 },
            { label: "Vue.js", value: "vue", scoreWeight: 10 },
            { label: "Other / Unsure", value: "other", scoreWeight: 5 },
          ],
        },
        {
          id: "monthly_output_expectation",
          label: "What output do you expect monthly?",
          type: "select",
          required: true,
          options: [
            { label: "1–2 small features", value: "small", scoreWeight: 15 },
            { label: "2–4 medium features", value: "medium", scoreWeight: 25 },
            { label: "Continuous sprint delivery", value: "sprint", scoreWeight: 35 },
            { label: "Not sure — need recommendation", value: "recommendation", scoreWeight: 10 },
          ],
        },
      ],
    },
    {
      id: "step-4",
      title: "Budget and commitment",
      subtitle: "Finalizing the retainer details.",
      fields: [
        {
          id: "budget",
          label: "Monthly retainer budget?",
          type: "select",
          required: true,
          disqualifyIf: { field: "budget", values: ["<15k"], message: "Our retainers based on custom scope/mo. Let's discuss a scoped project instead." },
          options: [
            { label: "Entry Level / Seed/mo", value: "<15k", scoreWeight: 5 },
            { label: "Growth / Standard/mo", value: "15k-35k", scoreWeight: 20 },
            { label: "Growth / Standard/mo", value: "35k-75k", scoreWeight: 35 },
            { label: "Custom+/mo", value: ">75k", scoreWeight: 50 },
          ],
        },
        {
          id: "commitment_length",
          label: "Minimum commitment you're comfortable with?",
          type: "select",
          required: true,
          options: [
            { label: "Month-to-month", value: "1mo", scoreWeight: 15 },
            { label: "3 months", value: "3mo", scoreWeight: 25 },
            { label: "6 months", value: "6mo", scoreWeight: 35 },
            { label: "12 months", value: "12mo", scoreWeight: 45 },
          ],
        },
      ],
    },
  ],
};
