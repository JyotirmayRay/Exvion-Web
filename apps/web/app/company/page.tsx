"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TechBackground } from "@/components/ui/TechBackground";

// ─── Constants ─────────────────────────────────────────────────────────────
const COMPANY = {
  name: "Exvion Global Private Limited",
  cin: "U46512OD2024PTC047475",
  incorporated: "2024",
  whatsapp: "+916372328646",
  whatsappDisplay: "+91 63723 28646",
  email: "hello@exvionglobal.com",
  address: "Mancheswar, Bhubaneswar, Odisha, India",
};

const STATS = [
  { value: "2024", label: "Year Founded" },
  { value: "20+", label: "Projects Shipped" },
  { value: "3", label: "Countries Served" },
  { value: "100%", label: "Client Retention Rate" },
];

const VALUES = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Speed Without Compromise",
    desc: "We move fast because markets don't wait. But speed without quality is just noise. Every line of code we ship is optimized, tested, and built to last.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    title: "Architecture Over Templates",
    desc: "We refuse to sell commodity solutions. Every system we build is custom-engineered for your specific business logic, traffic patterns, and long-term growth curve.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "AI-First Thinking",
    desc: "We don't bolt AI on as an afterthought. We architect every product with intelligent automation at the core — because the businesses that survive the next decade will be the ones who automated the last one.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Radical Transparency",
    desc: "No hidden fees. No vague timelines. No overpromising. You'll always know exactly what we're building, when it ships, and what it costs. Our reputation is built on honesty.",
  },
];

const SERVICES_PREVIEW = [
  { label: "Custom SaaS Development", color: "#F43F5E" },
  { label: "End-to-End AI Automation", color: "#6366F1" },
  { label: "High-Performance Websites", color: "#3B82F6" },
  { label: "Technical CTO Consulting", color: "#10B981" },
  { label: "AI Chatbot Development", color: "#FB4E00" },
  { label: "Business Process Automation", color: "#F59E0B" },
];

// ─── Main Component ────────────────────────────────────────────────────────
export default function CompanyPage() {
  return (
    <>
      <TechBackground />
      <Navbar />
      <main className="relative min-h-screen">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="pt-32 pb-20 px-6 text-center">
          <div className="max-w-[900px] mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(251,78,0,0.3)] bg-[rgba(251,78,0,0.08)] mb-8">
              <span className="w-2 h-2 rounded-full bg-[#FB4E00] animate-pulse" />
              <span className="text-sm font-medium text-[#FB4E00] tracking-wide uppercase">
                About Exvion Global
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              We Build{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #FB4E00, #FF8C42)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Software
              </span>
              <br />
              That{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #FB4E00, #FF8C42)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Scales.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Exvion Global is a technology company at the intersection of custom software development,
              artificial intelligence, and business automation. We exist to give ambitious companies
              the technical infrastructure to outpace their market.
            </p>
          </div>
        </section>

        {/* ── Stats Strip ────────────────────────────────────── */}
        <section className="pb-20 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-0 rounded-2xl overflow-hidden border"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center py-10 px-6 text-center"
                  style={{
                    background: i % 2 === 0 ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                    borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}
                >
                  <div
                    className="text-4xl md:text-5xl font-bold mb-2"
                    style={{
                      background: "linear-gradient(135deg, #FB4E00, #FF8C42)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Our Story ─────────────────────────────────────── */}
        <section className="pb-24 px-6">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-semibold text-[#FB4E00] uppercase tracking-widest mb-4">
                Our Story
              </div>
              <h2 className="text-4xl font-bold text-white leading-tight mb-6">
                Built From a Frustration with Mediocre Software
              </h2>
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  Exvion Global was incorporated in 2024 in Bhubaneswar, Odisha, with a singular
                  conviction: that most software agencies fail their clients not because of a lack of
                  intention, but because of a lack of engineering discipline.
                </p>
                <p>
                  We saw founders paying lakhs for bloated WordPress builds that crashed under load.
                  We saw enterprises spending crores on ERP systems that no one actually used.
                  We saw startups with brilliant ideas get held back by developers who prioritized
                  speed of delivery over quality of architecture.
                </p>
                <p>
                  So we built Exvion to do it differently. We are a team of architects and engineers
                  who bet on statically generated React, AI-native design, and ruthless testing
                  standards to build software that doesn't just work at launch — it works at scale.
                </p>
              </div>
            </div>

            {/* Right: glowing visual block */}
            <div className="relative">
              <div
                className="rounded-2xl p-8 border relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(251,78,0,0.2)",
                }}
              >
                {/* Glow */}
                <div
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
                  style={{ background: "radial-gradient(circle, #FB4E00, transparent)" }}
                />
                <div className="text-xs text-white/30 font-mono mb-6 uppercase tracking-widest">
                  // What we build
                </div>
                <div className="flex flex-wrap gap-3">
                  {SERVICES_PREVIEW.map((s) => (
                    <span
                      key={s.label}
                      className="px-4 py-2 rounded-full text-sm font-medium"
                      style={{
                        background: `${s.color}1A`,
                        border: `1px solid ${s.color}40`,
                        color: s.color,
                      }}
                    >
                      {s.label}
                    </span>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/6">
                  <div className="flex items-center gap-3 text-sm text-white/40">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    All services shipped in-house. No outsourcing.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Mission ───────────────────────────────────────── */}
        <section className="pb-24 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div
              className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(251,78,0,0.1) 0%, rgba(26,26,46,0.6) 100%)",
                border: "1px solid rgba(251,78,0,0.2)",
              }}
            >
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 50%, #FB4E00, transparent 50%),
                    radial-gradient(circle at 80% 50%, #6366F1, transparent 50%)`,
                }}
              />
              <div className="relative">
                <div className="text-xs font-semibold text-[#FB4E00] uppercase tracking-widest mb-6">
                  Our Mission
                </div>
                <blockquote className="text-3xl md:text-4xl font-bold text-white leading-snug max-w-4xl mx-auto">
                  "To democratize access to world-class software engineering and AI infrastructure
                  for every ambitious founder and enterprise — not just the ones in Silicon Valley."
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ── Core Values ───────────────────────────────────── */}
        <section className="pb-24 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-14">
              <div className="text-xs font-semibold text-[#FB4E00] uppercase tracking-widest mb-4">
                Engineering Principles
              </div>
              <h2 className="text-4xl font-bold text-white">What We Stand For</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {VALUES.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl p-8 border group hover:border-[rgba(251,78,0,0.3)] transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-[#FB4E00] group-hover:scale-110 transition-transform duration-300"
                    style={{ background: "rgba(251,78,0,0.12)" }}
                  >
                    {v.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{v.title}</h3>
                  <p className="text-white/55 leading-relaxed text-sm">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Legal Registration ────────────────────────────── */}
        <section className="pb-24 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-semibold text-[#FB4E00] uppercase tracking-widest mb-4">
                Corporate Information
              </div>
              <h2 className="text-3xl font-bold text-white">Registered & Compliant</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* CIN */}
              <div
                className="rounded-2xl p-7 border col-span-1"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                  Corporate Identity Number
                </div>
                <div
                  className="text-xl font-bold font-mono tracking-widest mb-1"
                  style={{
                    background: "linear-gradient(135deg, #FB4E00, #FF8C42)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {COMPANY.cin}
                </div>
                <div className="text-white/40 text-xs mt-2">
                  Registered with MCA, Government of India
                </div>
              </div>

              {/* Company Name */}
              <div
                className="rounded-2xl p-7 border"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                  Legal Name
                </div>
                <div className="text-lg font-bold text-white leading-snug mb-1">
                  {COMPANY.name}
                </div>
                <div className="text-white/40 text-xs mt-2">
                  Private Limited Company · Incorporated {COMPANY.incorporated}
                </div>
              </div>

              {/* Address */}
              <div
                className="rounded-2xl p-7 border"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                  Branch Office
                </div>
                <div className="text-lg font-bold text-white leading-snug mb-1">
                  Mancheswar, Bhubaneswar
                </div>
                <div className="text-white/50 text-sm">Odisha, India</div>
                <div className="text-white/40 text-xs mt-2">
                  Serving clients globally
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact CTA ───────────────────────────────────── */}
        <section className="pb-24 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div
              className="rounded-3xl p-10 md:p-14 border relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(251,78,0,0.2)",
              }}
            >
              <div
                className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ background: "radial-gradient(circle, #FB4E00, transparent)" }}
              />
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-3">
                    Let's Build Something Remarkable
                  </h2>
                  <p className="text-white/55 max-w-lg leading-relaxed">
                    Whether you have a fully scoped project or just an early idea — reach out.
                    Our engineers are ready to design a technical plan within 24 hours.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <a
                      href="/contact"
                      className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:scale-105"
                      style={{
                        background: "linear-gradient(135deg, #FB4E00, #FF8C42)",
                        boxShadow: "0 0 30px rgba(251,78,0,0.3)",
                      }}
                    >
                      Start a Project
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                    <a
                      href={`https://wa.me/${COMPANY.whatsapp}?text=Hi%20Exvion%2C%20I%20saw%20your%20company%20page%20and%20want%20to%20discuss%20a%20project.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:scale-105"
                      style={{ background: "#25D366", boxShadow: "0 0 20px rgba(37,211,102,0.3)" }}
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      {COMPANY.whatsappDisplay}
                    </a>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all hover:scale-105"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {COMPANY.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
