"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Icon } from "@exvion/ui";
import { LeadFormEngine } from "@/components/forms/LeadFormEngine";
import { processGeneralForm } from "@/config/forms/process-general";

const METHODOLOGY = [
  {
    id: "step-1",
    index: "01",
    title: "Getting to know your idea",
    subtitle: "Discovery & Planning",
    desc: "We don't just jump into coding. First, we sit down with you to truly understand your vision, your business, and exactly what we need to build to make it a reality.",
    icon: "strategy",
    tags: ["Idea Mapping", "User Needs", "Clear Goals"]
  },
  {
    id: "step-2",
    index: "02",
    title: "Planning the foundation",
    subtitle: "Blueprint & Design",
    desc: "Before building a house, you need a blueprint. We map out exactly how your app will look and how the systems will connect so it runs perfectly from day one.",
    icon: "chart",
    tags: ["Wireframing", "System Architecture", "Visual Design"]
  },
  {
    id: "step-3",
    index: "03",
    title: "Bringing it to life",
    subtitle: "Active Development",
    desc: "This is where the magic happens. Our team writes the actual code, turning the designs and blueprints into a living, breathing application.",
    icon: "feature-dev",
    tags: ["Frontend Magic", "Backend Logic", "Database Setup"]
  },
  {
    id: "step-4",
    index: "04",
    title: "Checking every detail",
    subtitle: "Quality Assurance",
    desc: "We test every single click, button, and feature. We try to break things on purpose to make absolutely sure they never break for your users.",
    icon: "check",
    tags: ["Bug Squashing", "Speed Testing", "Security Checks"]
  },
  {
    id: "step-5",
    index: "05",
    title: "Launching to the world",
    subtitle: "Go-Live & Deployment",
    desc: "It’s time to go live. We handle all the complicated server setups to make sure your app launches smoothly and can handle your first wave of users without a hiccup.",
    icon: "mvp",
    tags: ["Server Setup", "Domain Linking", "Smooth Launch"]
  },
  {
    id: "step-6",
    index: "06",
    title: "Always by your side",
    subtitle: "Continuous Support",
    desc: "We don’t just launch and leave. We stay right by your side to monitor the app, fix anything that pops up, and help you add new features as you grow.",
    icon: "support",
    tags: ["24/7 Monitoring", "Quick Fixes", "Future Updates"]
  }
];

const HowWeWork = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track overall section scroll for the central glowing line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="process" ref={containerRef} className="py-24 md:py-32 relative overflow-hidden bg-brand-dark">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-primary/5 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-24 text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-brand-primary font-mono text-sm tracking-widest uppercase">How We Work</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight"
          >
            A simple process for <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-orange-400">
              complex ideas.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-secondary max-w-2xl text-lg md:text-xl leading-relaxed"
          >
            We've taken the headache out of software development. No confusing jargon, just a clear, step-by-step path from your idea to a launched product.
          </motion.p>
        </div>

        {/* Central Scroll Line Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Default Background Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
          
          {/* Active Glowing Scroll Line */}
          <motion.div 
            className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2  origin-top"
            style={{ 
              scaleY: lineHeight,
              background: "linear-gradient(to bottom, transparent, #FB4E00, #FB4E00)",
              boxShadow: "0 0 20px #FB4E00"
            }}
          />

          {/* Steps */}
          <div className="relative z-10 flex flex-col gap-12 md:gap-32 pb-32">
            {METHODOLOGY.map((step, i) => (
              <TimelineCard key={step.id} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* The Intake Portal */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center glass rounded-[2.5rem] p-8 lg:p-16 border border-white/10 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-primary/20 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 lg:pr-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                <span className="text-white/60 text-xs font-bold uppercase tracking-wider">Ready to start?</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Let's talk about <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-orange-400">
                  your project.
                </span>
              </h3>
              <p className="text-text-secondary text-lg mb-8">
                Fill out this quick form so we can understand what you're looking for. We'll get back to you within 24 hours with a plan.
              </p>
              
              <div className="space-y-4">
                {["Free initial consultation", "Clear pricing layout", "No technical knowledge required"].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm font-medium text-white/70">
                    <div className="w-6 h-6 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary shadow-[0_0_10px_rgba(251,78,0,0.2)]">
                      <Icon name="check" size={12} />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 w-full max-w-md mx-auto lg:max-w-none">
              <div className="bg-[#12141A]/90 backdrop-blur-2xl rounded-3xl p-1 border border-white/10 overflow-hidden shadow-2xl">
                 <LeadFormEngine 
                   config={processGeneralForm} 
                   serviceTitle="Project Inquiry" 
                   accentColor="#FB4E00" 
                 />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TimelineCard = ({ step, index }: { step: any, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track the scroll of THIS SPECIFIC card to trigger its glow and animation
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 90%", "center center"]
  });

  const isEven = index % 2 === 0;

  // High-creative cinematic scroll mapping
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  // Dramatic horizontal distance
  const xOffset = isEven ? -300 : 300;
  const x = useTransform(scrollYProgress, [0, 1], [isMobile ? 100 : xOffset, 0]);
  
  // Add a vertical lift as it comes closer
  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);
  
  // Icon glow effect
  const iconBg = useTransform(scrollYProgress, [0, 1], ["rgba(255,255,255,0.05)", "rgba(251,78,0,0.2)"]);
  const iconBorder = useTransform(scrollYProgress, [0, 1], ["rgba(255,255,255,0.1)", "rgba(251,78,0,0.5)"]);
  const iconColor = useTransform(scrollYProgress, [0, 1], ["rgba(255,255,255,0.4)", "rgba(251,78,0,1)"]);
  const iconGlow = useTransform(scrollYProgress, [0, 1], ["0px 0px 0px rgba(251,78,0,0)", "0px 0px 30px rgba(251,78,0,0.4)"]);

  return (
    <div 
      ref={cardRef} 
      className={`relative flex items-center justify-between w-full flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Center timeline dot (Icon) */}
      <motion.div 
        className="absolute left-[28px] md:left-1/2 top-0 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 w-14 h-14 rounded-2xl flex items-center justify-center z-20 shadow-xl backdrop-blur-md"
        style={{
          background: iconBg,
          borderColor: iconBorder,
          borderWidth: 1,
          color: iconColor,
          boxShadow: iconGlow
        }}
      >
        <Icon name={step.icon} size={24} />
      </motion.div>

      {/* Empty space for the other side of the timeline on desktop */}
      <div className="hidden md:block md:w-[45%]" />

      {/* Content Card */}
      <motion.div 
        style={{ opacity, scale, x, y }}
        className="w-full md:w-[45%] pl-24 md:pl-0 pt-2 md:pt-0"
      >
        <div className="glass p-8 md:p-10 rounded-[2rem] border border-white/10 hover:border-brand-primary/30 transition-all duration-500 relative overflow-hidden group">
          
          {/* Subtle hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl font-black text-white/10">
                {step.index}
              </span>
              <p className="text-sm font-bold text-brand-primary uppercase tracking-widest">{step.subtitle}</p>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{step.title}</h3>
            <p className="text-text-secondary text-base leading-relaxed mb-8">
              {step.desc}
            </p>

            <div className="flex flex-wrap gap-2">
              {step.tags.map((tag: string) => (
                <span key={tag} className="text-xs font-medium text-white/60 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default HowWeWork;
