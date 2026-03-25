import { FormConfig } from "@exvion/types";

export const startupLandingForm: FormConfig = {
  id: "startup-landing-form",
  serviceId: "startup-landing",
  qualifyingThreshold: 55,
  disqualifyMessage: "",
  successMessage: "Landing page request received. We'll send a conversion strategy and design proposal within 24 hours.",
  steps: [
    {
      id: "step-1",
      title: "Your startup",
      subtitle: "Where are you currently at?",
      fields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "phone", required: true },
        {
          id: "startup_stage",
          label: "What stage is your startup at?",
          type: "select",
          required: true,
          options: [
            { label: "Pre-launch — building anticipation", value: "pre-launch", scoreWeight: 25 },
            { label: "Just launched — need immediate traction", value: "launched", scoreWeight: 35 },
            { label: "Running paid ads — need better conversions", value: "ads", scoreWeight: 40 },
            { label: "Relaunching or repositioning", value: "relaunch", scoreWeight: 30 },
          ],
        },
        {
          id: "has_existing_site",
          label: "Do you have an existing website?",
          type: "radio",
          required: true,
          options: [
            { label: "No — building from scratch", value: "no", scoreWeight: 20 },
            { label: "Yes — replacing it", value: "replacing", scoreWeight: 25 },
            { label: "Yes — adding a dedicated landing page", value: "adding", scoreWeight: 30 },
          ],
        },
      ],
    },
    {
      id: "step-2",
      title: "Traffic and conversion",
      subtitle: "What is your marketing plan?",
      fields: [
        {
          id: "traffic_source",
          label: "Where will you be driving traffic from?",
          type: "multiselect",
          required: true,
          options: [
            { label: "Google Ads", value: "google", scoreWeight: 25 },
            { label: "Meta / Instagram Ads", value: "meta", scoreWeight: 25 },
            { label: "Organic / SEO", value: "seo", scoreWeight: 15 },
            { label: "LinkedIn", value: "linkedin", scoreWeight: 20 },
            { label: "Email campaigns", value: "email", scoreWeight: 15 },
            { label: "Product Hunt / communities", value: "ph", scoreWeight: 15 },
            { label: "Not started — planning traffic", value: "planning", scoreWeight: 10 },
          ],
        },
        {
          id: "conversion_goal",
          label: "What's the ONE action you want visitors to take?",
          type: "select",
          required: true,
          options: [
            { label: "Book a demo or call", value: "demo", scoreWeight: 30 },
            { label: "Sign up for a free trial", value: "trial", scoreWeight: 30 },
            { label: "Join a waitlist", value: "waitlist", scoreWeight: 25 },
            { label: "Buy now / direct purchase", value: "buy", scoreWeight: 35 },
            { label: "Download a lead magnet", value: "lead-magnet", scoreWeight: 20 },
          ],
        },
      ],
    },
    {
      id: "step-3",
      title: "Content readiness",
      subtitle: "Do you have the assets ready?",
      fields: [
        {
          id: "has_copy",
          label: "Do you have copy or messaging ready?",
          type: "radio",
          required: true,
          options: [
            { label: "Yes — full copy ready", value: "ready", scoreWeight: 25 },
            { label: "Rough notes and key points", value: "notes", scoreWeight: 15 },
            { label: "Nothing — need full copywriting", value: "none", scoreWeight: 10 },
          ],
        },
        {
          id: "has_brand",
          label: "Do you have a brand identity (logo, colors)?",
          type: "radio",
          required: true,
          options: [
            { label: "Yes — full brand guidelines", value: "full", scoreWeight: 20 },
            { label: "Logo only", value: "logo", scoreWeight: 15 },
            { label: "Nothing yet — need branding too", value: "none", scoreWeight: 10 },
          ],
        },
      ],
    },
    {
      id: "step-4",
      title: "Budget and deadline",
      subtitle: "Finalizing your request.",
      fields: [
        {
          id: "budget",
          label: "Landing page budget?",
          type: "select",
          required: true,
          options: [
            { label: "Entry Level / Seed", value: "<10k", scoreWeight: 5 },
            { label: "Growth / Standard", value: "10k-25k", scoreWeight: 20 },
            { label: "Growth / Standard", value: "25k-50k", scoreWeight: 30 },
            { label: "Custom+", value: ">50k", scoreWeight: 40 },
          ],
        },
        {
          id: "deadline",
          label: "When do you need this live?",
          type: "select",
          required: true,
          options: [
            { label: "Under 7 days", value: "<7days", scoreWeight: 35 },
            { label: "1–2 weeks", value: "1-2weeks", scoreWeight: 25 },
            { label: "2–4 weeks", value: "2-4weeks", scoreWeight: 15 },
            { label: "No rush", value: "flexible", scoreWeight: 5 },
          ],
        },
      ],
    },
  ],
};
