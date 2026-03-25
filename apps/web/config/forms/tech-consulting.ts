import { FormConfig } from "@exvion/types";

export const techConsultingForm: FormConfig = {
  id: "tech-consulting-form",
  serviceId: "tech-consulting",
  qualifyingThreshold: 60,
  disqualifyMessage: "",
  successMessage: "Consulting request confirmed. A senior technical architect will review your details and reach out within 24 hours.",
  steps: [
    {
      id: "step-1",
      title: "Your company",
      subtitle: "Tell us about your organization.",
      fields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "phone", required: true },
        {
          id: "company_stage",
          label: "What stage is your company in?",
          type: "select",
          required: true,
          options: [
            { label: "Pre-seed / Bootstrapped", value: "startup", scoreWeight: 10 },
            { label: "Seed / Series A (Scaling)", value: "scaling", scoreWeight: 30 },
            { label: "Established Enterprise", value: "enterprise", scoreWeight: 40 },
            { label: "Agency looking for technical partner", value: "agency", scoreWeight: 20 },
          ],
        },
      ],
    },
    {
      id: "step-2",
      title: "The technical challenge",
      subtitle: "Why do you need architectural guidance?",
      fields: [
        {
          id: "core_challenge",
          label: "What is the primary technical bottleneck right now?",
          sublabel: "e.g., App keeps crashing, developers are too slow, need to migrate to AWS...",
          type: "textarea",
          required: true,
          placeholder: "Currently, our biggest technical issue is...",
          minLength: 40,
        },
        {
          id: "current_stack",
          label: "What is your current or planned tech stack? (If known)",
          type: "multiselect",
          required: false,
          options: [
            { label: "Next.js / React / Node.js", value: "js", scoreWeight: 10 },
            { label: "Python / Django / FastApi", value: "python", scoreWeight: 10 },
            { label: "PHP / Laravel / WordPress", value: "php", scoreWeight: 10 },
            { label: "AWS / Google Cloud / Azure", value: "cloud", scoreWeight: 10 },
            { label: "No preference / Not sure yet", value: "unsure", scoreWeight: 10 },
          ],
        },
      ],
    },
    {
      id: "step-3",
      title: "Advisory structure",
      subtitle: "How can we best support your team?",
      fields: [
        {
          id: "engagement_type",
          label: "What type of engagement are you looking for?",
          type: "select",
          required: true,
          options: [
            { label: "One-off Technical Audit / Blueprint", value: "audit", scoreWeight: 20 },
            { label: "Fractional CTO (Ongoing monthly advisory)", value: "fractional", scoreWeight: 40 },
            { label: "Project Rescue (Fixing a broken build)", value: "rescue", scoreWeight: 35 },
            { label: "Just need a quick consultation call", value: "call", scoreWeight: 5 },
          ],
        },
        {
          id: "budget",
          label: "What is your allocated budget for this advisory?",
          type: "select",
          required: true,
          disqualifyIf: { field: "budget", values: ["<50k"], message: "Strategic architecture consulting starts at a higher baseline. Please explore our smaller packages." },
          options: [
            { label: "< ₹50,000", value: "<50k", scoreWeight: 0 },
            { label: "₹50k - ₹1.5L", value: "50k-150k", scoreWeight: 20 },
            { label: "₹1.5L - ₹3L", value: "150k-300k", scoreWeight: 35 },
            { label: "₹3L+", value: ">300k", scoreWeight: 50 },
          ],
        },
      ],
    },
  ],
};
