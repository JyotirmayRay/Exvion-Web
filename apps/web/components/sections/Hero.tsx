"use client";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { Icon } from "@exvion/ui";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FloatingCard } from "@/components/ui/FloatingCard";
import { HeroBackground } from "./HeroBackground";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

interface HeroProps {
  priority?: boolean;
}

const Hero = ({ priority = false }: HeroProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <HeroBackground />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-4rem)] py-20">
            <div className="flex flex-col gap-8">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={fadeInUp}>
                  <Badge variant="outline" className="px-4 py-2 text-brand-primary border-brand-primary/20 bg-brand-primary/5 flex items-center gap-2">
                    <Icon name="check" size={14} className="text-brand-primary" />
                    Engineering Excellence · Software &amp; AI
                  </Badge>
                </motion.div>
                
                <motion.h1 
                  variants={fadeInUp}
                  className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]"
                >
                  We Build <span className="gradient-text">Scalable</span> Digital Empires
                </motion.h1>

                <motion.p 
                  variants={fadeInUp}
                  className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed"
                >
                  From stealth-mode startups to enterprise giants, we engineer high-performance systems and AI solutions that dominate markets.
                </motion.p>

                <motion.div 
                  variants={fadeInUp}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  <Button
                    size="lg"
                    href="/contact"
                    className="btn-primary inline-flex items-center gap-2 px-8 font-bold"
                  >
                    Start Your Project
                  </Button>
                  <Button size="lg" variant="secondary" href="/portfolio" className="btn-secondary">
                    View Case Studies
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.8 }}
                className="flex items-center gap-6 pt-4 text-sm text-text-muted"
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-dark bg-brand-navy flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-brand-primary opacity-20" />
                    </div>
                  ))}
                </div>
                <p>Trusted by 50+ Global Enterprises</p>
              </motion.div>
            </div>

            {/* Right Side - Visual Dashboard */}
            <div className="relative hidden lg:flex lg:items-center lg:justify-center min-h-[400px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-full max-w-sm h-[420px]"
              >
                {/* Main Dashboard Mockup */}
                <div className="w-full h-full glass rounded-3xl p-6 shadow-glow relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-8">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="h-4 w-2/3 bg-white/10 rounded-full" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-brand-primary/10 rounded-2xl border border-brand-primary/20" />
                      <div className="h-20 bg-white/5 rounded-2xl border border-white/10" />
                    </div>
                    <div className="h-32 bg-white/5 rounded-2xl border border-white/10" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-transparent pointer-events-none" />
                </div>

                {/* Floating Cards */}
                <FloatingCard
                  icon={<Icon name="feature-dev" size={20} className="text-brand-primary" />}
                  title="SaaS Engine"
                  value="99.9% Uptime"
                  position="top-4 right-8"
                  delay={0.2}
                />
                <FloatingCard
                  icon={<Icon name="ai-workflow" size={20} className="text-brand-primary" />}
                  title="AI Workflow"
                  value="4.2x Faster"
                  position="top-28 -right-2"
                  delay={0.4}
                />
                <FloatingCard
                  icon={<Icon name="chart" size={20} className="text-brand-primary" />}
                  title="Conversion"
                  value="+240% Growth"
                  position="bottom-8 right-6"
                  delay={0.6}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default Hero;
