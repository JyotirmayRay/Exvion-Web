import { FormConfig } from "@exvion/types";

export const aiChatbotForm: FormConfig = {
  id: "ai-chatbot-form",
  serviceId: "ai-chatbot",
  qualifyingThreshold: 60,
  disqualifyMessage: "",
  successMessage: "Chatbot project request received. We'll review your use case and send a training plan within 24 hours.",
  steps: [
    {
      id: "step-1",
      title: "Your business",
      subtitle: "Tell us about your organization.",
      fields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "phone", required: true },
        {
          id: "business_type",
          label: "What kind of business is this for?",
          type: "select",
          required: true,
          options: [
            { label: "E-commerce store", value: "ecommerce", scoreWeight: 20 },
            { label: "SaaS product", value: "saas", scoreWeight: 30 },
            { label: "Service business", value: "service", scoreWeight: 25 },
            { label: "Healthcare or legal", value: "medical-legal", scoreWeight: 20 },
            { label: "Internal team tool", value: "internal", scoreWeight: 20 },
            { label: "Other", value: "other", scoreWeight: 10 },
          ],
        },
      ],
    },
    {
      id: "step-2",
      title: "Chatbot purpose",
      subtitle: "What is the key goal of this bot?",
      fields: [
        {
          id: "primary_use",
          label: "What's the primary job of this chatbot?",
          type: "select",
          required: true,
          options: [
            { label: "Qualify and capture leads", value: "leads", scoreWeight: 35 },
            { label: "Answer customer support questions", value: "support", scoreWeight: 30 },
            { label: "Guide users through onboarding", value: "onboarding", scoreWeight: 30 },
            { label: "Sales assistant and product guidance", value: "sales", scoreWeight: 35 },
            { label: "Internal HR or knowledge base", value: "internal", scoreWeight: 20 },
          ],
        },
        {
          id: "monthly_inquiries",
          label: "How many inquiries or support tickets do you handle monthly?",
          type: "select",
          required: true,
          options: [
            { label: "Under 100", value: "<100", scoreWeight: 10 },
            { label: "100–500", value: "100-500", scoreWeight: 20 },
            { label: "500–2,000", value: "500-2k", scoreWeight: 30 },
            { label: "2,000+", value: ">2k", scoreWeight: 40 },
          ],
        },
      ],
    },
    {
      id: "step-3",
      title: "Data and deployment",
      subtitle: "How will the AI learn and deploy?",
      fields: [
        {
          id: "data_available",
          label: "What training data do you have available?",
          type: "multiselect",
          required: true,
          options: [
            { label: "Product documentation", value: "docs", scoreWeight: 15 },
            { label: "FAQ document", value: "faq", scoreWeight: 15 },
            { label: "Past customer conversations", value: "chats", scoreWeight: 25 },
            { label: "Knowledge base or wiki", value: "kb", scoreWeight: 20 },
            { label: "Nothing yet — need to create it", value: "none", scoreWeight: 5 },
          ],
        },
        {
          id: "deployment_channel",
          label: "Where should the chatbot be deployed?",
          type: "multiselect",
          required: true,
          options: [
            { label: "Website chat widget", value: "web", scoreWeight: 15 },
            { label: "WhatsApp", value: "whatsapp", scoreWeight: 20 },
            { label: "Telegram", value: "telegram", scoreWeight: 10 },
            { label: "Inside the SaaS product", value: "app", scoreWeight: 25 },
            { label: "Internal Slack/Teams bot", value: "slack-teams", scoreWeight: 15 },
          ],
        },
      ],
    },
    {
      id: "step-4",
      title: "Budget and go-live",
      subtitle: "Final details.",
      fields: [
        {
          id: "budget",
          label: "Budget for chatbot development?",
          type: "select",
          required: true,
          options: [
            { label: "Entry Level / Seed", value: "<20k", scoreWeight: 5 },
            { label: "Growth / Standard", value: "20k-45k", scoreWeight: 20 },
            { label: "Growth / Standard", value: "45k-100k", scoreWeight: 35 },
            { label: "Custom+", value: ">100k", scoreWeight: 50 },
          ],
        },
        {
          id: "go_live_date",
          label: "When do you need this live?",
          type: "select",
          required: true,
          options: [
            { label: "ASAP — within 2 weeks", value: "asap", scoreWeight: 30 },
            { label: "Within a month", value: "month", scoreWeight: 20 },
            { label: "1–3 months", value: "1-3mo", scoreWeight: 10 },
            { label: "No fixed date", value: "flexible", scoreWeight: 5 },
          ],
        },
      ],
    },
  ],
};
