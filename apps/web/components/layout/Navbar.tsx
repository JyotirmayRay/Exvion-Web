"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Icon } from "@exvion/ui";
import { Button } from "@/components/ui/Button";
import { services } from "@/config/services";
import { MegamenuPreview } from "./MegamenuPreview";
import { ServiceConfig } from "@exvion/types";

const CATEGORY_MAP: Record<string, string> = {
  ai: "AI & Automation",
  automation: "AI & Automation",
  saas: "SaaS Platforms",
  development: "Product Development",
  wordpress: "WordPress & Web",
  consulting: "Strategy & Advisory",
  maintenance: "Support & Care"
};

const NAV_LINKS = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Portfolio", href: "/portfolio", icon: "chart" },
  { label: "Company", href: "/company", icon: "feature-dev" },
  { label: "Contact", href: "/contact", icon: "strategy" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [quickForm, setQuickForm] = useState({ name: "", email: "", msg: "" });
  const [formSent, setFormSent] = useState(false);
  const [hoveredService, setHoveredService] = useState<ServiceConfig | null>(services.find(s => s.featured) || null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const close = () => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setContactOpen(false);
  };

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: quickForm.name,
          email: quickForm.email,
          serviceId: "mobile-quick-contact",
          answers: [{ query: "Message", value: quickForm.msg }],
        }),
      });
      setFormSent(true);
    } catch { setFormSent(true); }
  };

  const groupedServices = services.reduce((acc, s) => {
    const cat = CATEGORY_MAP[s.category] || s.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {} as Record<string, typeof services>);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}
      style={{ overflow: "visible" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 relative">
        <div className={`glass rounded-2xl px-6 py-3 flex items-center justify-between transition-all ${scrolled ? "shadow-glass backdrop-blur-xl border-white/10" : "bg-transparent border-transparent"}`}>

          {/* Logo */}
          <Link href="/" className="flex items-center group" onClick={close}>
            <img src="/logo.webp" alt="Exvion" className="h-10 w-auto group-hover:scale-110 transition-transform" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <div
              className="py-2"
              onMouseEnter={() => setActiveDropdown("solutions")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-text-secondary hover:text-white font-medium transition-colors flex items-center gap-1.5 focus:outline-none">
                Solutions
                <Icon name="chevron-down" size={16} className={`transition-transform duration-300 ${activeDropdown === "solutions" ? "rotate-180" : ""}`} />
              </button>
            </div>
            <Link href="/#process" className="text-text-secondary hover:text-white font-medium transition-colors">Process</Link>
            <Link href="/portfolio" className="text-text-secondary hover:text-white font-medium transition-colors">Portfolio</Link>
            <Link href="/company" className="text-text-secondary hover:text-white font-medium transition-colors">Company</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button href="/contact" size="sm" className="hidden md:flex rounded-xl px-6">Start Project</Button>
            <button
              className="lg:hidden text-white z-[200] relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-white/5 active:scale-90 transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </motion.svg>
                ) : (
                  <motion.svg key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Centered Solutions Megamenu Overlay */}
          <AnimatePresence>
            {activeDropdown === "solutions" && (
              <div 
                className="fixed top-24 left-1/2 -translate-x-1/2 z-[110]"
                onMouseEnter={() => setActiveDropdown("solutions")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <div className="glass rounded-[32px] p-2 w-[1100px] shadow-[0_60px_150px_rgba(0,0,0,0.9)] border border-white/20 overflow-hidden">
                  <div className="flex bg-[#050508]/95 backdrop-blur-3xl rounded-[28px] overflow-hidden min-h-[500px] max-h-[600px]">
                    {/* Left Side: Services Grid */}
                    <div className="flex-[2] p-8 pr-6 border-r border-white/10 relative overflow-hidden flex flex-col">
                      {/* Subtle Internal Glow */}
                      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/10 blur-[130px] pointer-events-none" />
                      
                      <div className="grid grid-cols-3 gap-x-8 gap-y-8 relative z-10 flex-1">
                        {Object.entries(groupedServices).map(([cat, items], idx) => (
                          <motion.div 
                            key={cat} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex flex-col gap-4"
                          >
                            <div className="flex items-center justify-between pb-3 border-b border-white/10">
                              <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-primary drop-shadow-[0_0_10px_rgba(251,78,0,0.4)]">{cat}</h4>
                              <span className="text-[9px] font-mono text-white/40 font-bold">{items.length} units</span>
                            </div>
                            <div className="flex flex-col gap-3.5">
                              {items.slice(0, 4).map((service) => (
                                <Link 
                                  key={service.id} 
                                  href={`/services/${service.slug}`} 
                                  className="group/item flex flex-col items-start relative pl-1"
                                  onMouseEnter={() => setHoveredService(service)}
                                >
                                  {/* Hover Indicator */}
                                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-brand-primary group-hover/item:h-3/4 transition-all duration-300 rounded-full" />
                                  
                                  <span className="text-[13px] font-bold text-white group-hover/item:text-brand-primary transition-all flex items-center gap-3">
                                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover/item:bg-brand-primary/20 group-hover/item:border-brand-primary/40 transition-all">
                                      <Icon name={service.iconId as any} size={14} className="text-white group-hover/item:text-brand-primary" />
                                    </div>
                                    {service.shortTitle}
                                  </span>
                                  <span className="text-[10px] text-white/40 font-bold line-clamp-1 pl-10 group-hover/item:text-white/70 transition-colors uppercase tracking-tight">{service.tagline}</span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                           <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Exvion Neural Network Active</p>
                        </div>
                        <Link href="/services" className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-black text-white hover:bg-brand-primary hover:border-brand-primary hover:shadow-[0_0_20px_rgba(251,78,0,0.3)] transition-all flex items-center gap-2 group/all">
                          LAUNCH FULL CATALOG <Icon name="arrow-right" size={12} className="group-hover/all:translate-x-1 transition-transform" />
                        </Link>
                      </motion.div>
                    </div>

                    {/* Right Side: Visual Preview */}
                    <div className="flex-1 p-2 bg-gradient-to-b from-white/[0.05] to-transparent relative overflow-hidden">
                       <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
                       <MegamenuPreview activeService={hoveredService} />
                    </div>
                  </div>
                </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ─── Premium Mobile Menu Overlay ─────────────────────────── */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="fixed inset-0 z-[90] flex flex-col overflow-hidden"
            style={{ background: "rgba(8, 8, 14, 0.98)", backdropFilter: "blur(24px)" }}
          >
            {/* Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-[120px] opacity-25 pointer-events-none"
              style={{ background: "radial-gradient(ellipse, #FB4E00 0%, transparent 70%)" }} />
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none"
              style={{ background: "#FB4E00" }} />

            {/* ── Top Bar with logo + X close ────────────────────────── */}
            <div className="relative z-[100] flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
              <Link href="/" onClick={close}>
                <img src="/logo.webp" alt="Exvion" className="h-9 w-auto" />
              </Link>
              <button
                onClick={close}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#FB4E00]/20 hover:border-[#FB4E00]/40 active:scale-90 transition-all font-bold"
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* ── Scrollable Content ──────────────────────────────────── */}
            <div className="relative z-10 flex-1 overflow-y-auto px-4 py-4 space-y-1.5 pb-40">

              {/* Main Nav Links — row-icon style */}
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.28 }}
                >
                  <Link
                    href={link.href}
                    onClick={close}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-white/5 active:bg-white/10 group transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-[#FB4E00] group-hover:bg-[#FB4E00]/10 group-hover:border-[#FB4E00]/30 transition-all shrink-0">
                      <Icon name={link.icon as any} size={18} />
                    </div>
                    <span className="text-xl font-bold text-white/80 group-hover:text-white transition-colors flex-1">{link.label}</span>
                    <Icon name="arrow-right" size={16} className="text-white/20 group-hover:text-white/50 group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.div>
              ))}

              {/* ── Services Accordion ───────────────────────────────── */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.26 }}>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-white/5 active:bg-white/10 transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-all ${servicesOpen ? "bg-[#FB4E00]/20 border-[#FB4E00]/40 text-[#FB4E00]" : "bg-white/5 border-white/10 text-white/50"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  </div>
                  <span className={`text-xl font-bold flex-1 text-left transition-colors ${servicesOpen ? "text-white" : "text-white/80"}`}>Services</span>
                  <motion.svg
                    animate={{ rotate: servicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/40"
                    xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mx-2 mt-1 mb-1 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 space-y-4">
                        {Object.entries(groupedServices).map(([cat, items]) => (
                          <div key={cat}>
                            <p className="text-[9px] font-black uppercase tracking-[0.15em] text-[#FB4E00] mb-2 px-2">{cat}</p>
                            <div className="space-y-0.5">
                              {items.map((s) => (
                                <Link
                                  key={s.id}
                                  href={`/services/${s.slug}`}
                                  onClick={close}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 active:bg-white/10 group/s transition-all"
                                >
                                  <Icon name={s.iconId as any} size={14} className="text-white/30 group-hover/s:text-[#FB4E00] transition-colors shrink-0" />
                                  <span className="text-sm font-semibold text-white/70 group-hover/s:text-white transition-colors">{s.shortTitle}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                        <Link
                          href="/services"
                          onClick={close}
                          className="flex items-center justify-center gap-2 w-full py-3 mt-2 rounded-xl border border-[#FB4E00]/30 bg-[#FB4E00]/10 text-[#FB4E00] text-sm font-bold hover:bg-[#FB4E00]/20 transition-all"
                        >
                          View All Services
                          <Icon name="arrow-right" size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* ── Quick Contact Accordion ──────────────────────────── */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.32 }}>
                <button
                  onClick={() => setContactOpen(!contactOpen)}
                  className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-white/5 active:bg-white/10 transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-all ${contactOpen ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" : "bg-white/5 border-white/10 text-white/50"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <span className={`text-xl font-bold flex-1 text-left transition-colors ${contactOpen ? "text-white" : "text-white/80"}`}>Quick Message</span>
                  <motion.svg
                    animate={{ rotate: contactOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/40"
                    xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {contactOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mx-2 mt-1 mb-1 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
                        {formSent ? (
                          <div className="flex flex-col items-center py-6 gap-3">
                            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                            <p className="text-white font-bold text-lg">Message Received!</p>
                            <p className="text-white/50 text-sm text-center">We'll get back to you within 24 hours.</p>
                          </div>
                        ) : (
                          <form onSubmit={handleQuickSubmit} className="space-y-3">
                            <input
                              type="text" required placeholder="Your Name"
                              value={quickForm.name}
                              onChange={e => setQuickForm({ ...quickForm, name: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none bg-white/5 border border-white/10 focus:border-[#FB4E00]/50 placeholder-white/30 transition-all"
                            />
                            <input
                              type="email" required placeholder="Email Address"
                              value={quickForm.email}
                              onChange={e => setQuickForm({ ...quickForm, email: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none bg-white/5 border border-white/10 focus:border-[#FB4E00]/50 placeholder-white/30 transition-all"
                            />
                            <textarea
                              required rows={3} placeholder="Brief message or idea..."
                              value={quickForm.msg}
                              onChange={e => setQuickForm({ ...quickForm, msg: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none bg-white/5 border border-white/10 focus:border-[#FB4E00]/50 placeholder-white/30 transition-all resize-none"
                            />
                            <button
                              type="submit"
                              className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
                              style={{ background: "linear-gradient(135deg, #FB4E00, #FF8C42)", boxShadow: "0 8px 24px rgba(251,78,0,0.25)" }}
                            >
                              Send Message
                              <Icon name="arrow-right" size={16} />
                            </button>
                          </form>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Contact strip */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="px-4 pt-1">
                <div className="flex flex-wrap items-center gap-4 py-3 px-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <a href="mailto:hello@exvionglobal.com" className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    hello@exvionglobal.com
                  </a>
                  <div className="w-px h-4 bg-white/10" />
                  <a href="https://wa.me/916372328646" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-white/40 hover:text-emerald-400 transition-colors">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413A11.815 11.815 0 0 0 12.05 0z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </motion.div>

            </div>

            {/* ── Pinned Bottom CTA ───────────────────────────────── */}
            <div
              className="relative z-10 px-4 pb-8 pt-4 border-t border-white/[0.06]"
              style={{ background: "linear-gradient(to top, rgba(8,8,14,1) 60%, transparent)" }}
            >
              <Button
                href="/contact"
                onClick={close}
                className="w-full h-14 justify-center rounded-2xl text-base font-bold shadow-glow flex items-center gap-2"
              >
                Start a Project
                <Icon name="arrow-right" size={18} />
              </Button>
              <p className="text-center text-white/25 text-[10px] mt-3 font-mono tracking-wide">CIN: U46512OD2024PTC047475</p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
