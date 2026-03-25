"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TechBackground } from "@/components/ui/TechBackground";
import { motion } from "framer-motion";

// ─── Authentic Data (NDA-Style Case Studies) ──────────────────────────────
const PORTFOLIO = [
  {
    id: "cs-01",
    clientContext: "Premium Plant E-Commerce Scale-Up",
    category: "Headless E-Commerce Architecture",
    description: "A national nursery business handling massive volumes of seasonal inventory needed to escape a slow, bloated WooCommerce setup. They were losing 53% of mobile traffic to load times. We didn't tweak their theme; we ripped it out and built a headless Next.js architecture.",
    metrics: ["4,650+ Conversions", "320+ Active Products", "<0.8s Load Times"],
    tech: ["Next.js", "Stripe API", "Sanity CMS", "React"],
    color: "#10B981", // Emerald
  },
  {
    id: "cs-02",
    clientContext: "IT & Digital Solutions Makeover",
    category: "B2B Lead Generation Platform",
    description: "An established IT consultancy approached us with a generic, jargon-heavy website that wasn't converting. We stripped away the technical fluff and built a conversational funnel that asks real business questions ('What's your biggest challenge?'). No hype. Just facts.",
    metrics: ["435 Projects Completed", "350 Active Clients", "5 Industry Awards"],
    tech: ["Framer Motion", "TailwindCSS", "Next.js"],
    color: "#F59E0B", // Amber
  },
  {
    id: "cs-03",
    clientContext: "Done-for-You AI Automation Implementation",
    category: "Autonomous Systems Engineering",
    description: "A mid-sized firm was bleeding margin on manual triage and invoice processing. We didn't sell them a consultation; we delivered a working system. We bridged n8n, Zapier, and the OpenAI API to completely automate their intake and follow-up routing.",
    metrics: ["$40k/mo Margin Saved", "100% Automated Routing", "Zero Manual Data Entry"],
    tech: ["n8n", "OpenAI API", "Zapier", "Webhooks"],
    color: "#EF4444", // Red
  },
  {
    id: "cs-04",
    clientContext: "Professional Job Board Engine",
    category: "Two-Sided Marketplace SaaS",
    description: "A specialized recruitment startup needed a portal connecting tech talent directly with enterprises. We engineered a bi-directional platform featuring complex dual-dashboard logic, automated resume parsing, and vacancy management systems.",
    metrics: ["15k+ Daily Active Users", "Dual User Authentication", "Intelligent Matchmaking"],
    tech: ["React.js", "Node.js", "PostgreSQL", "AWS"],
    color: "#3B82F6", // Blue
  },
  {
    id: "cs-05",
    clientContext: "EduTech Campus Management SaaS",
    category: "EdTech Infrastructure",
    description: "A multi-campus school system was struggling with highly fragmented fee collection and parent communication. We built a unified SaaS dashboard allowing administration to collect fees online, fire automated WhatsApp reminders, and broadcast instantly.",
    metrics: ["120+ Campuses Onboarded", "Zero Payment Delays", "Automated WhatsApp API"],
    tech: ["React Native", "Express", "Twilio API"],
    color: "#8B5CF6", // Purple
  },
  {
    id: "cs-06",
    clientContext: "Boutique Real Estate Website",
    category: "Local Business Web Design",
    description: "A luxury real estate agency needed a fast, elegant website to showcase high-end properties. We built a beautiful, image-rich platform with integrated contact forms and a custom CMS for easy property updates.",
    metrics: ["Sub-second Load Times", "Seamless Mobile UI", "Custom CMS Integration"],
    tech: ["Next.js", "TailwindCSS", "Sanity"],
    color: "#14B8A6", // Teal
  },
  {
    id: "cs-07",
    clientContext: "Fitness Center Booking Portal",
    category: "Service Booking Web App",
    description: "A local premium gym was losing trial members due to a clunky booking experience. We designed a clean, mobile-first web app that lets members view schedules and book classes in exactly three clicks.",
    metrics: ["3-Click Booking", "100% Mobile Optimized", "Integrated Payments"],
    tech: ["React", "Express.js", "Stripe"],
    color: "#06B6D4", // Cyan
  },
  {
    id: "cs-08",
    clientContext: "Corporate Law Firm Presence",
    category: "Corporate Branding & Web",
    description: "An established legal practice required a distinguished online presence to attract corporate clients. We delivered a highly professional, lightning-fast website optimized for local SEO and direct consultation bookings.",
    metrics: ["Top Local SEO Ranking", "Professional Aesthetics", "Direct Consultation Flow"],
    tech: ["Next.js", "Framer Motion", "Vercel"],
    color: "#F97316", // Orange
  }
];

// ─── Animation Variants ────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

// ─── Main Component ────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [form, setForm] = useState({ name: "", email: "", budget: "", details: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
          serviceId: "portfolio-inquiry",
          answers: [
            { query: "Budget", value: form.budget },
            { query: "Project Details", value: form.details }
          ]
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      setForm({ name: "", email: "", budget: "", details: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <TechBackground />
      <Navbar />
      <main className="relative min-h-screen pb-32">
        
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="pt-32 pb-24 px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-[1000px] mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(251,78,0,0.3)] bg-[rgba(251,78,0,0.08)] mb-8">
              <span className="w-2 h-2 rounded-full bg-[#FB4E00] animate-pulse" />
              <span className="text-sm font-medium text-[#FB4E00] tracking-wide uppercase">
                Ship Work That Matters
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-8">
              Our Track Record of{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #FB4E00, #FF8C42)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Execution.
              </span>
            </h1>
            <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed border-l-2 pl-6" style={{ borderColor: "#FB4E00" }}>
              We don't build generic templates. We architect high-performance SaaS platforms, autonomous AI workflows, and enterprise engineering systems that scale under load. 
              <strong> Real problems. Brutal execution. Pure metrics.</strong>
            </p>
          </motion.div>
        </section>

        {/* ── Authentic Portfolio Stack ───────────────────────── */}
        <section className="px-6 pb-32">
          <div className="max-w-[1200px] mx-auto space-y-12 md:space-y-24">
            {PORTFOLIO.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative flex flex-col lg:flex-row gap-8 lg:gap-16 items-center"
              >
                {/* Visual / Numeric Block */}
                <div className="w-full lg:w-5/12">
                  <div 
                    className="relative w-full aspect-[4/3] rounded-3xl border overflow-hidden group flex flex-col justify-end p-8 transition-transform duration-700 hover:scale-[1.02]"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      borderColor: "rgba(255,255,255,0.05)",
                      boxShadow: `0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`,
                    }}
                  >
                    {/* Faded Background Graphics */}
                    <div 
                      className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
                      style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 2px, transparent 0)", backgroundSize: "32px 32px" }} 
                    />
                    
                    <svg className="absolute -right-16 -top-16 w-80 h-80 opacity-[0.04] group-hover:opacity-[0.08] transition-all duration-700 group-hover:scale-110 pointer-events-none z-0" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                      <path fill={project.color} d="M54.5,-61.7C67.8,-51.2,73.8,-30.9,74.9,-12.3C76,6.3,72.2,23.3,61.9,37C51.6,50.7,34.8,61,16.2,66.6C-2.4,72.2,-22.8,73.1,-39.9,64.7C-57,56.3,-70.8,38.6,-77.1,18.4C-83.4,-1.8,-82.2,-24.5,-71.4,-41.8C-60.6,-59.1,-40.2,-71.1,-21.2,-74C-2.2,-76.9,15.3,-70.7,30.4,-63.9C45.5,-57.1,54.5,-61.7,54.5,-61.7Z" transform="translate(100 100)" />
                    </svg>

                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,20,30,0.9)] via-[rgba(20,20,30,0.4)] to-transparent pointer-events-none z-0" />

                    {/* Glowing Accent */}
                    <div 
                      className="absolute -top-32 -left-32 w-64 h-64 rounded-full blur-[80px] opacity-[0.15] group-hover:opacity-30 transition-opacity duration-700 z-0"
                      style={{ background: project.color }}
                    />
                    
                    <div className="relative z-10">
                      <div className="text-sm font-mono tracking-widest uppercase mb-4 opacity-50 flex items-center gap-2" style={{ color: project.color }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.color }} />
                        Case Study 0{index + 1}
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-8">
                        {project.clientContext}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map(t => (
                          <span key={t} className="px-3 py-1.5 rounded-lg text-xs font-mono border" style={{ background: "rgba(0,0,0,0.5)", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text / Data Block */}
                <div className="w-full lg:w-7/12 py-4">
                  <div className="text-xs font-semibold uppercase tracking-widest mb-4 opacity-60 text-white">
                    {project.category}
                  </div>
                  <p className="text-lg text-white/60 leading-relaxed mb-8">
                    {project.description}
                  </p>
                  
                  {/* Brutal Metrics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
                    {project.metrics.map((m, i) => (
                      <div key={i}>
                        <div className="text-2xl font-bold text-white mb-2" style={{ color: project.color }}>
                          {m.split(' ')[0]}
                        </div>
                        <div className="text-sm text-white/40 uppercase tracking-wide font-medium">
                          {m.substring(m.indexOf(' ') + 1)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Active Lead Capture Block ──────────────────────── */}
        <section className="px-6 max-w-[1000px] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[2.5rem] p-10 md:p-16 border relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(251,78,0,0.05) 0%, rgba(26,26,46,0.8) 100%)",
              borderColor: "rgba(251,78,0,0.2)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
            }}
          >
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[100px] opacity-20 pointer-events-none"
              style={{ background: "#FB4E00" }}
            />
            
            <div className="text-center mb-12 relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Seen enough? Let's talk logic.</h2>
              <p className="text-lg text-white/50 max-w-xl mx-auto">Skip the generic agency pitches. Drop your tech stack and requirements below, and an architect will contact you within 24 hours.</p>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: "rgba(34,197,94,0.1)", border: "2px solid rgba(34,197,94,0.3)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">Brief Received</h3>
                  <p className="text-white/50 text-lg">Our engineering lead will review your requirements and email you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input
                      type="text"
                      required
                      placeholder="Full Name / Company"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl text-white outline-none focus:ring-2 transition-all text-base"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", "--tw-ring-color": "rgba(251,78,0,0.5)" } as React.CSSProperties}
                    />
                    <input
                      type="email"
                      required
                      placeholder="Work Email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl text-white outline-none focus:ring-2 transition-all text-base"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", "--tw-ring-color": "rgba(251,78,0,0.5)" } as React.CSSProperties}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["< ₹50k", "₹50k-₹2L", "₹2L-₹5L", "₹5L+"].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setForm({ ...form, budget: b })}
                        className="py-3 px-4 rounded-2xl text-sm font-medium transition-all duration-300 text-center"
                        style={{
                          background: form.budget === b ? "rgba(251,78,0,0.15)" : "rgba(255,255,255,0.02)",
                          border: `1px solid ${form.budget === b ? "rgba(251,78,0,0.5)" : "rgba(255,255,255,0.06)"}`,
                          color: form.budget === b ? "#FB4E00" : "rgba(255,255,255,0.4)",
                        }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>

                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your architecture requirements, data flows, and scale..."
                    value={form.details}
                    onChange={(e) => setForm({ ...form, details: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl text-white outline-none focus:ring-2 transition-all resize-none text-base"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", "--tw-ring-color": "rgba(251,78,0,0.5)" } as React.CSSProperties}
                  />

                  {status === "error" && (
                    <p className="text-red-400 text-sm py-3 px-4 rounded-xl font-medium" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                      Failed to submit. Please ensure your API is running.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading" || !form.budget}
                    className="w-full py-5 rounded-2xl font-bold text-white mt-4 transition-all duration-300 disabled:opacity-50 text-lg flex items-center justify-center gap-3 group"
                    style={{
                      background: "linear-gradient(135deg, #FB4E00, #FF8C42)",
                      boxShadow: "0 10px 30px rgba(251,78,0,0.25)",
                    }}
                  >
                    {status === "loading" ? "Routing Data..." : "Request Technical Estimate"}
                    {status !== "loading" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
