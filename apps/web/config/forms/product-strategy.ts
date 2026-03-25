import { FormConfig } from "@exvion/types";

export const productStrategyForm: FormConfig = {
  id: "product-strategy-form",
  serviceId: "product-strategy",
  qualifyingThreshold: 65,
  disqualifyMessage: "",
  successMessage: "Strategy consultation request confirmed. We'll prepare a pre-session brief and reach out within 24 hours.",
  steps: [
    {
      id: "step-1",
      title: "About you and your product",
      subtitle: "Help us understand your context.",
      fields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "phone", required: true },
        {
          id: "founder_type",
          label: "How would you describe yourself?",
          type: "select",
          required: true,
          options: [
            { label: "Technical founder, weak on business strategy", value: "tech", scoreWeight: 30 },
            { label: "Business founder, weak on product decisions", value: "biz", scoreWeight: 30 },
            { label: "Both — just need external perspective", value: "both", scoreWeight: 35 },
            { label: "Not a founder — product/growth manager", value: "pm", scoreWeight: 20 },
          ],
        },
        {
          id: "product_stage",
          label: "Where is your SaaS right now?",
          type: "select",
          required: true,
          options: [
            { label: "Idea stage — nothing built yet", value: "idea", scoreWeight: 15 },
            { label: "MVP live, finding product-market fit", value: "mvp", scoreWeight: 35 },
            { label: "Has users, growth is stuck", value: "stuck", scoreWeight: 40 },
            { label: "Scaling, need strategic direction", value: "scaling", scoreWeight: 35 },
          ],
        },
      ],
    },
    {
      id: "step-2",
      title: "Your core challenge",
      subtitle: "What is holding you back right now?",
      fields: [
        {
          id: "primary_problem",
          label: "What's the biggest strategic problem you're facing?",
          type: "select",
          required: true,
          options: [
            { label: "Don't know which features to prioritize", value: "features", scoreWeight: 30 },
            { label: "Pricing and monetization isn't working", value: "pricing", scoreWeight: 35 },
            { label: "Can't articulate what makes us different", value: "positioning", scoreWeight: 30 },
            { label: "Users sign up but don't convert to paid", value: "conversion", scoreWeight: 35 },
            { label: "Growing but don't know the right direction", value: "direction", scoreWeight: 30 },
          ],
        },
        {
          id: "has_metrics",
          label: "Do you have product usage or revenue metrics available?",
          type: "radio",
          required: true,
          options: [
            { label: "Yes, detailed analytics and data", value: "yes", scoreWeight: 25 },
            { label: "Basic metrics only", value: "basic", scoreWeight: 15 },
            { label: "No data currently", value: "no", scoreWeight: 5 },
          ],
        },
      ],
    },
    {
      id: "step-3",
      title: "Engagement type",
      subtitle: "How can we help you?",
      fields: [
        {
          id: "desired_output",
          label: "What do you want to walk away with?",
          type: "select",
          required: true,
          options: [
            { label: "A clear prioritized roadmap", value: "roadmap", scoreWeight: 25 },
            { label: "Validated monetization model", value: "monetization", scoreWeight: 30 },
            { label: "Competitive positioning strategy", value: "positioning", scoreWeight: 25 },
            { label: "All of the above", value: "all", scoreWeight: 40 },
          ],
        },
        {
          id: "engagement_preference",
          label: "How do you prefer to work?",
          type: "select",
          required: true,
          options: [
            { label: "Intensive 1–2 day workshop", value: "workshop", scoreWeight: 30 },
            { label: "Structured sessions over 2 weeks", value: "sessions", scoreWeight: 25 },
            { label: "Ongoing monthly advisory", value: "advisory", scoreWeight: 35 },
            { label: "Async delivery — docs and frameworks", value: "async", scoreWeight: 15 },
          ],
        },
      ],
    },
    {
      id: "step-4",
      title: "Investment",
      subtitle: "Final details on your budget.",
      fields: [
        {
          id: "budget",
          label: "Strategy consulting budget?",
          type: "select",
          required: true,
          options: [
            { label: "Entry Level / Seed", value: "<15k", scoreWeight: 5 },
            { label: "Growth / Standard", value: "15k-30k", scoreWeight: 20 },
            { label: "Growth / Standard", value: "30k-75k", scoreWeight: 35 },
            { label: "Custom+", value: ">75k", scoreWeight: 45 },
          ],
        },
        {
          id: "urgency",
          label: "How urgent is this for you?",
          type: "select",
          required: true,
          options: [
            { label: "Critical — need clarity this week", value: "critical", scoreWeight: 30 },
            { label: "Important — this month", value: "important", scoreWeight: 20 },
            { label: "Planning ahead", value: "planning", scoreWeight: 10 },
          ],
        },
      ],
    },
  ],
};
