import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TechBackground } from "@/components/ui/TechBackground";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Exvion Global",
  description:
    "Privacy Policy for Exvion Global Private Limited. Learn how we collect, use, and protect your personal information.",
};

const EFFECTIVE_DATE = "25 March 2025";
const COMPANY = {
  name: "Exvion Global Private Limited",
  cin: "U46512OD2024PTC047475",
  email: "hello@exvionglobal.com",
  whatsapp: "+91 6372328646",
  address: "Mancheswar, Bhubaneswar, Odisha, India",
};

const SECTIONS = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "1.1 Information You Provide",
        text: "When you engage with our services, submit a project inquiry, schedule a consultation, or contact us directly, we may collect: your full name, email address, phone number, company name, project requirements and descriptions, and any other information you choose to share.",
      },
      {
        subtitle: "1.2 Information Collected Automatically",
        text: "When you browse our website, we may automatically collect technical information such as your IP address, browser type and version, operating system, referring URLs, pages visited, time spent on pages, and device identifiers. This data is collected via cookies and similar tracking technologies to help us improve website performance and user experience.",
      },
      {
        subtitle: "1.3 Lead Qualification Data",
        text: "When you fill out our multi-step service inquiry forms, we collect information about your project budget, technical requirements, organizational size, and other business-specific details necessary to assess how best to serve your needs.",
      },
    ],
  },
  {
    id: "how-we-use",
    title: "2. How We Use Your Information",
    content: [
      {
        subtitle: null,
        text: "We use the information collected for the following purposes:",
      },
    ],
    bullets: [
      "To respond to your inquiries and project requirements within 24 hours",
      "To schedule and conduct strategy and discovery calls",
      "To send you relevant project proposals, estimates, and service recommendations",
      "To onboard you as a client and deliver contracted services",
      "To send transactional emails such as meeting confirmations and booking reminders",
      "To improve our website performance, forms, and user experience",
      "To comply with applicable legal and regulatory obligations",
      "To protect against fraudulent, unauthorized, or illegal activity",
    ],
  },
  {
    id: "data-sharing",
    title: "3. Data Sharing & Disclosure",
    content: [
      {
        subtitle: "3.1 We Do Not Sell Your Data",
        text: "Exvion Global does not sell, rent, trade, or otherwise transfer your personal information to third parties for commercial purposes. Your data belongs to you.",
      },
      {
        subtitle: "3.2 Service Providers",
        text: "We may share your information with trusted third-party service providers who assist us in operating our platform and delivering services. These include email delivery services (Resend), calendar and scheduling tools (Google Calendar API), cloud infrastructure providers (Vercel, AWS), and database services. All such providers are contractually bound to maintain the confidentiality and security of your data.",
      },
      {
        subtitle: "3.3 Legal Requirements",
        text: "We may disclose your information if required to do so by applicable law, court order, or governmental authority, or if we believe such disclosure is necessary to protect the rights, property, or safety of Exvion Global, our clients, or the public.",
      },
    ],
  },
  {
    id: "data-retention",
    title: "4. Data Retention",
    content: [
      {
        subtitle: null,
        text: "We retain your personal information for as long as is reasonably necessary to fulfil the purposes outlined in this Privacy Policy, maintain our business records, comply with applicable legal obligations, and resolve any disputes. When your data is no longer required, we securely delete or anonymize it in accordance with our internal data lifecycle policies. Lead and inquiry data that does not result in a contracted project is retained for a maximum of 12 months.",
      },
    ],
  },
  {
    id: "cookies",
    title: "5. Cookies & Tracking Technologies",
    content: [
      {
        subtitle: null,
        text: "Our website uses cookies and similar technologies to enhance your browsing experience. These include essential cookies required for the website to function, analytics cookies that help us understand how visitors interact with our site, and preference cookies that remember your settings.",
      },
      {
        subtitle: null,
        text: "You may disable cookies through your browser settings; however, some features of our website may not function correctly as a result. By continuing to use our website, you consent to our use of cookies in accordance with this policy.",
      },
    ],
  },
  {
    id: "data-security",
    title: "6. Data Security",
    content: [
      {
        subtitle: null,
        text: "We implement industry-standard technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These include HTTPS encryption for all data in transit, encrypted database storage, strict access controls, regular security assessments, and secure API authentication.",
      },
      {
        subtitle: null,
        text: "While we take every reasonable precaution, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security but commit to notifying you promptly in the event of a data breach that affects your personal information.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "7. Your Rights",
    content: [
      {
        subtitle: null,
        text: "You have the following rights with respect to your personal information:",
      },
    ],
    bullets: [
      "Right to Access: Request a copy of the personal data we hold about you",
      "Right to Rectification: Request correction of inaccurate or incomplete data",
      "Right to Erasure: Request deletion of your personal data, subject to legal retention obligations",
      "Right to Restriction: Request that we limit the processing of your data",
      "Right to Portability: Request your data in a structured, machine-readable format",
      "Right to Object: Object to the processing of your data for direct marketing purposes",
      "Right to Withdraw Consent: Withdraw any previously given consent at any time",
    ],
  },
  {
    id: "third-party",
    title: "8. Third-Party Links",
    content: [
      {
        subtitle: null,
        text: "Our website may contain links to third-party websites, tools, or services. We are not responsible for the privacy practices or content of those external sites. We encourage you to review the privacy policy of any third-party site you visit through links from our platform.",
      },
    ],
  },
  {
    id: "children",
    title: "9. Children's Privacy",
    content: [
      {
        subtitle: null,
        text: "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you become aware that a minor has submitted personal data to us without parental consent, please contact us immediately and we will take steps to remove that information.",
      },
    ],
  },
  {
    id: "changes",
    title: "10. Changes to This Policy",
    content: [
      {
        subtitle: null,
        text: "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will update the effective date at the top of this page and, where appropriate, notify you via email or a prominent notice on our website. Your continued use of our services after such changes constitutes your acceptance of the updated policy.",
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <TechBackground />
      <Navbar />
      <main className="relative min-h-screen">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="pt-32 pb-14 px-6">
          <div className="max-w-[860px] mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(251,78,0,0.3)] bg-[rgba(251,78,0,0.08)] mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#FB4E00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm font-medium text-[#FB4E00] tracking-wide uppercase">Legal</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-white/50 text-base">
              Effective Date:{" "}
              <span className="text-white/70 font-medium">{EFFECTIVE_DATE}</span>
              {" "}·{" "}
              <span className="text-white/70 font-medium">{COMPANY.name}</span>
            </p>
            <p className="mt-6 text-white/60 leading-relaxed max-w-2xl">
              At Exvion Global, we take the privacy of our clients, visitors, and partners
              seriously. This policy explains what data we collect, how we use it, and the
              choices you have. We are committed to full transparency — no tracking you without
              purpose, no selling your information, ever.
            </p>
          </div>
        </section>

        {/* ── Table of Contents ─────────────────────────────── */}
        <section className="pb-12 px-6">
          <div className="max-w-[860px] mx-auto">
            <div
              className="rounded-2xl p-6 border"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.07)",
              }}
            >
              <h2 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">
                Contents
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="text-sm text-white/50 hover:text-[#FB4E00] transition-colors py-1 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#FB4E00]/40 group-hover:bg-[#FB4E00] transition-colors flex-shrink-0" />
                    {s.title}
                  </a>
                ))}
                <a
                  href="#contact"
                  className="text-sm text-white/50 hover:text-[#FB4E00] transition-colors py-1 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#FB4E00]/40 group-hover:bg-[#FB4E00] transition-colors flex-shrink-0" />
                  11. Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Policy Sections ───────────────────────────────── */}
        <section className="pb-16 px-6">
          <div className="max-w-[860px] mx-auto space-y-10">
            {SECTIONS.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="rounded-2xl p-8 border scroll-mt-24"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(255,255,255,0.07)",
                }}
              >
                <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
                  <span
                    className="w-1 h-6 rounded-full flex-shrink-0"
                    style={{ background: "linear-gradient(to bottom, #FB4E00, #FF8C42)" }}
                  />
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((block, i) => (
                    <div key={i}>
                      {block.subtitle && (
                        <h3 className="text-base font-semibold text-white/90 mb-2">
                          {block.subtitle}
                        </h3>
                      )}
                      <p className="text-white/55 leading-relaxed text-sm">{block.text}</p>
                    </div>
                  ))}
                  {section.bullets && (
                    <ul className="space-y-2 mt-3">
                      {section.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/55 text-sm">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{ background: "#FB4E00" }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}

            {/* Contact Section */}
            <div
              id="contact"
              className="rounded-2xl p-8 border scroll-mt-24"
              style={{
                background: "linear-gradient(135deg, rgba(251,78,0,0.08), rgba(255,140,66,0.04))",
                borderColor: "rgba(251,78,0,0.2)",
              }}
            >
              <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
                <span
                  className="w-1 h-6 rounded-full flex-shrink-0"
                  style={{ background: "linear-gradient(to bottom, #FB4E00, #FF8C42)" }}
                />
                11. Contact Us
              </h2>
              <p className="text-white/55 text-sm leading-relaxed mb-6">
                If you have any questions, concerns, or requests regarding this Privacy Policy or
                the handling of your personal data, please reach out through any of the following channels:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(251,78,0,0.12)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#FB4E00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{COMPANY.name}</div>
                    <div className="text-white/40 text-xs">CIN: {COMPANY.cin}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(251,78,0,0.12)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#FB4E00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-white/60 text-sm">{COMPANY.address}</span>
                </div>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-4 group">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(251,78,0,0.12)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#FB4E00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-white/60 group-hover:text-[#FB4E00] transition-colors text-sm">{COMPANY.email}</span>
                </a>
                <a
                  href={`https://wa.me/${COMPANY.whatsapp.replace(/\s+/g, "").replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(34,197,94,0.12)" }}>
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-green-400">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <span className="text-white/60 group-hover:text-green-400 transition-colors text-sm">{COMPANY.whatsapp}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer Note ─────────────────────────────────────── */}
        <section className="pb-20 px-6">
          <div className="max-w-[860px] mx-auto">
            <p className="text-center text-white/25 text-xs leading-relaxed">
              This Privacy Policy was last updated on {EFFECTIVE_DATE}. Any disputes arising from this policy shall be 
              governed by the laws of India. {COMPANY.name} reserves the right to amend this policy at any time.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
