import { FormConfig } from "@exvion/types";

export const membershipPlatformForm: FormConfig = {
  id: "membership-platform-form",
  serviceId: "membership-platform",
  qualifyingThreshold: 60,
  disqualifyMessage: "",
  successMessage: "Membership platform request received. We'll send a platform architecture and monetization plan within 24 hours.",
  steps: [
    {
      id: "step-1",
      title: "Your membership concept",
      subtitle: "What are we building?",
      fields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "phone", required: true },
        {
          id: "membership_type",
          label: "What kind of membership are you building?",
          type: "select",
          required: true,
          options: [
            { label: "Premium content and courses", value: "content", scoreWeight: 25 },
            { label: "Private community access", value: "community", scoreWeight: 25 },
            { label: "Software / tools access tiers", value: "software", scoreWeight: 30 },
            { label: "Professional association membership", value: "association", scoreWeight: 25 },
            { label: "Coaching or consulting program", value: "coaching", scoreWeight: 30 },
          ],
        },
        {
          id: "existing_audience",
          label: "Do you already have an audience?",
          type: "select",
          required: true,
          options: [
            { label: "Yes — active email list or community", value: "yes-active", scoreWeight: 35 },
            { label: "Some following — social or blog", value: "yes-some", scoreWeight: 25 },
            { label: "Building from scratch", value: "scratch", scoreWeight: 10 },
          ],
        },
      ],
    },
    {
      id: "step-2",
      title: "Revenue model",
      subtitle: "How are you going to monetize?",
      fields: [
        {
          id: "pricing_model",
          label: "How will you charge members?",
          type: "select",
          required: true,
          options: [
            { label: "Monthly recurring subscription", value: "monthly", scoreWeight: 30 },
            { label: "Annual subscription (discounted)", value: "annual", scoreWeight: 35 },
            { label: "Lifetime access one-time fee", value: "lifetime", scoreWeight: 20 },
            { label: "Multiple tiers (free + paid)", value: "tiers", scoreWeight: 35 },
            { label: "Not sure — need recommendations", value: "recommendations", scoreWeight: 10 },
          ],
        },
        {
          id: "expected_members_year1",
          label: "How many paying members do you expect in year one?",
          type: "select",
          required: true,
          options: [
            { label: "Under 100 members", value: "<100", scoreWeight: 15 },
            { label: "100–500 members", value: "100-500", scoreWeight: 25 },
            { label: "500–2,000 members", value: "500-2k", scoreWeight: 35 },
            { label: "2,000+ members", value: ">2k", scoreWeight: 45 },
          ],
        },
      ],
    },
    {
      id: "step-3",
      title: "Content and platform",
      subtitle: "What is going to be inside?",
      fields: [
        {
          id: "content_types",
          label: "What content or value will members access?",
          type: "multiselect",
          required: true,
          options: [
            { label: "Video courses or lessons", value: "video", scoreWeight: 15 },
            { label: "Downloadable resources", value: "downloads", scoreWeight: 10 },
            { label: "Live webinars or calls", value: "live", scoreWeight: 15 },
            { label: "Community forum", value: "forum", scoreWeight: 15 },
            { label: "Private newsletter", value: "newsletter", scoreWeight: 10 },
            { label: "1:1 or group coaching access", value: "coaching", scoreWeight: 20 },
            { label: "Software or tool access", value: "software", scoreWeight: 20 },
          ],
        },
        {
          id: "platform_preference",
          label: "Platform preference?",
          type: "select",
          required: true,
          options: [
            { label: "WordPress-based (recommended for content)", value: "wp", scoreWeight: 15 },
            { label: "Custom-built from scratch", value: "custom", scoreWeight: 30 },
            { label: "Need recommendation", value: "recommend", scoreWeight: 15 },
          ],
        },
      ],
    },
    {
      id: "step-4",
      title: "Investment",
      subtitle: "Final details to prepare your plan.",
      fields: [
        {
          id: "budget",
          label: "Platform build budget?",
          type: "select",
          required: true,
          options: [
            { label: "Entry Level / Seed", value: "<30k", scoreWeight: 5 },
            { label: "Growth / Standard", value: "30k-70k", scoreWeight: 20 },
            { label: "Growth / Standard", value: "70k-150k", scoreWeight: 35 },
            { label: "Custom+", value: ">150k", scoreWeight: 45 },
          ],
        },
        {
          id: "launch_timeline",
          label: "Launch timeline",
          type: "select",
          required: true,
          options: [
            { label: "Under 4 weeks", value: "<4weeks", scoreWeight: 30 },
            { label: "1–2 months", value: "1-2mo", scoreWeight: 20 },
            { label: "2–3 months", value: "2-3mo", scoreWeight: 10 },
          ],
        },
      ],
    },
  ],
};
