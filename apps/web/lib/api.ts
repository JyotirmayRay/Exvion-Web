export const getApiBaseUrl = (): string => {
  // If running on the server in a Vercel Function with service binding
  if (typeof window === "undefined" && process.env.API_URL) {
    const internalUrl = process.env.API_URL.replace(/\/+$/, "");
    return internalUrl.endsWith("/api") ? internalUrl : `${internalUrl}/api`;
  }

  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!envUrl) {
    if (typeof window !== "undefined") {
      const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";
      if (!isLocalhost) {
        return "/api";
      }
    }
    return "http://localhost:3001/api";
  }
  const cleanUrl = envUrl.replace(/\/+$/, "");
  return cleanUrl.endsWith("/api") ? cleanUrl : `${cleanUrl}/api`;
};

export interface SubmitLeadPayload {
  name: string;
  email: string;
  phone?: string;
  serviceType?: string;
  serviceId?: string;
  projectType?: string;
  stage?: string;
  budget?: string;
  timeline?: string;
  description?: string;
  company?: string;
  source?: string;
  score?: number;
  features?: string;
  answers?: Array<{
    question?: string;
    answer?: string;
    query?: string;
    value?: string;
    questionId?: string;
  }>;
}

export const submitLead = async (payload: SubmitLeadPayload) => {
  const serviceType = payload.serviceType || payload.serviceId || "General Inquiry";

  const formattedAnswers = payload.answers?.map((a) => ({
    question: a.question || a.query || a.questionId || "Detail",
    answer: String(a.answer ?? a.value ?? ""),
  }));

  const body = {
    name: payload.name || "Anonymous",
    email: payload.email,
    phone: payload.phone || "Not provided",
    serviceType,
    ...(payload.projectType ? { projectType: payload.projectType } : {}),
    ...(payload.stage ? { stage: payload.stage } : {}),
    ...(payload.budget ? { budget: payload.budget } : {}),
    ...(payload.timeline ? { timeline: payload.timeline } : {}),
    ...(payload.description ? { description: payload.description } : {}),
    ...(payload.company ? { company: payload.company } : {}),
    ...(payload.source ? { source: payload.source } : {}),
    ...(payload.score !== undefined ? { score: payload.score } : {}),
    ...(payload.features ? { features: payload.features } : {}),
    ...(formattedAnswers && formattedAnswers.length > 0 ? { answers: formattedAnswers } : {}),
  };

  const response = await fetch(`${getApiBaseUrl()}/leads/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to submit inquiry");
  }

  return response.json();
};

export const fetchAvailableSlots = async (date: Date) => {
  const response = await fetch(
    `${getApiBaseUrl()}/bookings/available?date=${encodeURIComponent(date.toISOString())}`
  );
  if (!response.ok) {
    throw new Error("Failed to load available slots");
  }
  return response.json();
};

export const createBooking = async (payload: {
  leadId: string;
  startTime: string;
  startTimeEnd: string;
  notes?: string;
}) => {
  const response = await fetch(`${getApiBaseUrl()}/bookings/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Booking failed");
  }

  return response.json();
};
