"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import TechBackground from "@/components/ui/TechBackground";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";

// Lazy load sections for performance
const TrustStrip = dynamic(() => import("@/components/sections/TrustStrip"), { ssr: true });
const Services = dynamic(() => import("@/components/sections/Services"), { ssr: true });
const HowWeWork = dynamic(() => import("@/components/sections/HowWeWork"), { ssr: true });
const PortfolioPreview = dynamic(() => import("@/components/sections/PortfolioPreview"), { ssr: true });
const WhyExvion = dynamic(() => import("@/components/sections/WhyExvion"), { ssr: true });
const CTASection = dynamic(() => import("@/components/sections/CTASection"), { ssr: true });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: true });

export default function Home() {
  return (
    <main className="bg-brand-dark min-h-screen">
      <TechBackground />
      <Navbar />
      
      <Hero priority />
      
      <Suspense fallback={<div className="h-20" />}>
        <TrustStrip />
      </Suspense>

      <Suspense fallback={<div className="h-[600px] bg-brand-navy/20 animate-pulse m-12 rounded-3xl" />}>
        <section className="py-24 md:py-28">
          <div className="max-w-[1200px] mx-auto px-6">
            <Services />
          </div>
        </section>
      </Suspense>

      <Suspense fallback={<div className="h-[600px] bg-brand-navy/20 animate-pulse m-12 rounded-3xl" />}>
        <HowWeWork />
      </Suspense>

      <Suspense fallback={<div className="h-[600px] bg-brand-navy/20 animate-pulse m-12 rounded-3xl" />}>
        <section className="py-24 md:py-28">
          <div className="max-w-[1200px] mx-auto px-6">
            <PortfolioPreview />
          </div>
        </section>
      </Suspense>

      <Suspense fallback={<div className="h-[600px] bg-brand-navy/20 animate-pulse m-12 rounded-3xl" />}>
        <section className="py-24 md:py-28">
          <div className="max-w-[1200px] mx-auto px-6">
            <WhyExvion />
          </div>
        </section>
      </Suspense>

      <Suspense fallback={<div className="h-[400px] bg-brand-navy/20 animate-pulse m-12 rounded-3xl" />}>
        <CTASection />
      </Suspense>

      <Suspense fallback={<div className="h-[300px] bg-brand-navy/20 animate-pulse" />}>
        <Footer />
      </Suspense>
    </main>
  );
}
