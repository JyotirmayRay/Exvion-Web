"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TechBackground } from "@/components/ui/TechBackground";
import { Metadata } from "next";

// ─── Contact Info Constants ────────────────────────────────────────────────
const CONTACT = {
  whatsapp: "+916372328646",
  whatsappDisplay: "+91 63723 28646",
  email: "hello@exvionglobal.com",
  company: "Exvion Global Private Limited",
  address: "Mancheswar, Bhubaneswar, Odisha",
  country: "India",
};

// ─── Types ─────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          serviceId: form.service || "general-inquiry",
          answers: [
            { questionId: "budget", value: form.budget },
            { questionId: "message", value: form.message },
          ],
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or reach us directly.");
    }
  };

  return (
    <>
      <TechBackground />
      <Navbar />
      <main className="relative min-h-screen">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-[1200px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(251,78,0,0.3)] bg-[rgba(251,78,0,0.08)] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FB4E00] animate-pulse" />
              <span className="text-sm font-medium text-[#FB4E00] tracking-wide uppercase">
                Let's Build Together
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Ready to{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #FB4E00, #FF8C42)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Accelerate?
              </span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Tell us what you're building and we'll get back to you within 24 hours with a
              technical breakdown and project estimate. No fluff. Just execution.
            </p>
          </div>
        </section>

        {/* ── Main Grid ────────────────────────────────────────── */}
        <section className="pb-24 px-6">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* LEFT: Contact Info Cards */}
            <div className="lg:col-span-2 flex flex-col gap-5">

              {/* Direct Contact */}
              <div
                className="rounded-2xl p-7 border"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(16px)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <h2 className="text-xl font-bold text-white mb-1">Direct Line</h2>
                <p className="text-sm text-white/50 mb-6">For urgent questions and fast responses</p>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}?text=Hi%20Exvion%2C%20I%27m%20interested%20in%20discussing%20a%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-green-500/30 hover:bg-green-500/05 transition-all duration-300 mb-3"
                  style={{ background: "rgba(34,197,94,0.06)", borderColor: "rgba(34,197,94,0.15)" }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(34,197,94,0.15)" }}
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-green-400">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-green-400/70 uppercase tracking-wide font-medium mb-0.5">WhatsApp</div>
                    <div className="text-white font-semibold text-base">{CONTACT.whatsappDisplay}</div>
                    <div className="text-white/40 text-xs mt-0.5">Replies within 1 hour</div>
                  </div>
                  <svg className="w-4 h-4 text-white/30 group-hover:text-green-400 transition-colors ml-auto flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300"
                  style={{
                    background: "rgba(251,78,0,0.06)",
                    borderColor: "rgba(251,78,0,0.15)",
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(251,78,0,0.15)" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#FB4E00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-[#FB4E00]/70 uppercase tracking-wide font-medium mb-0.5">Email</div>
                    <div className="text-white font-semibold text-base truncate">{CONTACT.email}</div>
                    <div className="text-white/40 text-xs mt-0.5">Replies within 24 hours</div>
                  </div>
                  <svg className="w-4 h-4 text-white/30 group-hover:text-[#FB4E00] transition-colors ml-auto flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Office Info */}
              <div
                className="rounded-2xl p-7 border"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(16px)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <h2 className="text-xl font-bold text-white mb-1">Our Office</h2>
                <p className="text-sm text-white/50 mb-6">Registered & operational in India</p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(251,78,0,0.12)" }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#FB4E00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-white/40 uppercase tracking-wide mb-1">Company</div>
                      <div className="text-white font-semibold text-sm leading-snug">{CONTACT.company}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(251,78,0,0.12)" }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#FB4E00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-white/40 uppercase tracking-wide mb-1">Branch Office</div>
                      <div className="text-white font-semibold text-sm leading-snug">
                        Mancheswar, Bhubaneswar
                        <br />
                        <span className="text-white/60 font-normal">Odisha, {CONTACT.country}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div
                className="rounded-2xl p-7 border"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(16px)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <h2 className="text-lg font-bold text-white mb-4">Working Hours</h2>
                <div className="space-y-2">
                  {[
                    { day: "Mon – Fri", time: "9:00 AM – 7:00 PM IST" },
                    { day: "Saturday", time: "10:00 AM – 4:00 PM IST" },
                    { day: "Sunday", time: "Emergency Support Only" },
                  ].map((row) => (
                    <div key={row.day} className="flex justify-between items-center text-sm py-2 border-b border-white/5 last:border-0">
                      <span className="text-white/60">{row.day}</span>
                      <span className="text-white font-medium">{row.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Contact Form */}
            <div className="lg:col-span-3">
              <div
                className="rounded-2xl p-8 md:p-10 border h-full"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(16px)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center h-full py-16 text-center gap-5">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(251,78,0,0.15)", border: "2px solid rgba(251,78,0,0.4)" }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-[#FB4E00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Message Received!</h3>
                      <p className="text-white/60 leading-relaxed max-w-sm mx-auto">
                        We'll review your project details and reach out within 24 hours. Check your inbox!
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus("idle")}
                      className="btn-primary mt-4"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-1">Send Us a Message</h2>
                      <p className="text-white/50 text-sm">Fill in your details and project requirements below.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Row 1: Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="name" className="text-sm font-medium text-white/70">
                            Full Name <span className="text-[#FB4E00]">*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="John Smith"
                            className="rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:ring-2 transition-all"
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              "--tw-ring-color": "rgba(251,78,0,0.5)",
                            } as React.CSSProperties}
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="email" className="text-sm font-medium text-white/70">
                            Email Address <span className="text-[#FB4E00]">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            placeholder="john@company.com"
                            className="rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:ring-2 transition-all"
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              "--tw-ring-color": "rgba(251,78,0,0.5)",
                            } as React.CSSProperties}
                          />
                        </div>
                      </div>

                      {/* Row 2: Phone + Service */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="phone" className="text-sm font-medium text-white/70">
                            Phone / WhatsApp
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+91 XXXXX XXXXX"
                            className="rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:ring-2 transition-all"
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              "--tw-ring-color": "rgba(251,78,0,0.5)",
                            } as React.CSSProperties}
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="service" className="text-sm font-medium text-white/70">
                            Service Interested In
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={form.service}
                            onChange={handleChange}
                            className="rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 transition-all appearance-none"
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              "--tw-ring-color": "rgba(251,78,0,0.5)",
                            } as React.CSSProperties}
                          >
                            <option value="" style={{ background: "#1A1A2E" }}>Select a service...</option>
                            <option value="ai-automation" style={{ background: "#1A1A2E" }}>AI Automation</option>
                            <option value="saas-development" style={{ background: "#1A1A2E" }}>Custom SaaS Development</option>
                            <option value="website-systems" style={{ background: "#1A1A2E" }}>Website Systems</option>
                            <option value="tech-consulting" style={{ background: "#1A1A2E" }}>Tech Consulting / Fractional CTO</option>
                            <option value="ai-chatbot" style={{ background: "#1A1A2E" }}>AI Chatbot Development</option>
                            <option value="white-label-saas" style={{ background: "#1A1A2E" }}>White-Label SaaS</option>
                            <option value="business-automation" style={{ background: "#1A1A2E" }}>Business Automation</option>
                            <option value="general-inquiry" style={{ background: "#1A1A2E" }}>General Inquiry</option>
                          </select>
                        </div>
                      </div>

                      {/* Budget */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-white/70">Estimated Budget</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {["< ₹50k", "₹50k–₹2L", "₹2L–₹5L", "₹5L+"].map((b) => (
                            <button
                              key={b}
                              type="button"
                              onClick={() => setForm((p) => ({ ...p, budget: b }))}
                              className="py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 text-center"
                              style={{
                                background: form.budget === b ? "rgba(251,78,0,0.2)" : "rgba(255,255,255,0.04)",
                                border: `1px solid ${form.budget === b ? "rgba(251,78,0,0.6)" : "rgba(255,255,255,0.08)"}`,
                                color: form.budget === b ? "#FB4E00" : "rgba(255,255,255,0.5)",
                              }}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Message */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="message" className="text-sm font-medium text-white/70">
                          Project Details <span className="text-[#FB4E00]">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Describe what you want to build, your timeline, any specific technical requirements..."
                          className="rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:ring-2 transition-all resize-none"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            "--tw-ring-color": "rgba(251,78,0,0.5)",
                          } as React.CSSProperties}
                        />
                      </div>

                      {/* Error */}
                      {status === "error" && (
                        <div
                          className="rounded-xl px-4 py-3 text-sm text-red-300"
                          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}
                        >
                          {errorMsg}
                        </div>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full py-4 rounded-xl font-semibold text-base text-white flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{
                          background: "linear-gradient(135deg, #FB4E00, #FF8C42)",
                          boxShadow: "0 0 30px rgba(251,78,0,0.3)",
                        }}
                      >
                        {status === "loading" ? (
                          <>
                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Project Brief
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </>
                        )}
                      </button>

                      <p className="text-center text-xs text-white/30 mt-2">
                        By submitting, you agree to our privacy policy. We never share your data.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* ── Quick-Action Strip ────────────────────────────────────────── */}
        <section className="pb-24 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div
              className="rounded-2xl p-8 border flex flex-col sm:flex-row items-center justify-between gap-6"
              style={{
                background: "linear-gradient(135deg, rgba(251,78,0,0.1), rgba(255,140,66,0.05))",
                borderColor: "rgba(251,78,0,0.25)",
              }}
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Prefer a quick chat instead?</h3>
                <p className="text-white/60 text-sm">
                  Message us directly on WhatsApp — we typically reply within the hour.
                </p>
              </div>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=Hi%20Exvion%2C%20I%27m%20interested%20in%20discussing%20a%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-white whitespace-nowrap transition-all duration-300 hover:scale-105 flex-shrink-0"
                style={{ background: "#25D366", boxShadow: "0 0 20px rgba(37,211,102,0.35)" }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
