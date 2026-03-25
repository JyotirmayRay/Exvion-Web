"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@exvion/ui";
import { motion } from "framer-motion";

const tabs: { icon: IconName; label: string; href: string }[] = [
  { icon: "dashboard", label: "Home", href: "/dashboard" },
  { icon: "leads", label: "Leads", href: "/leads" },
  { icon: "fire", label: "Hot", href: "/leads?tier=high" },
  { icon: "pipeline", label: "Pipeline", href: "/pipeline" },
  { icon: "menu", label: "More", href: "/settings" },
];

export const MobileTabNav = () => {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass 
      border-t border-white/5 pb-[env(safe-area-inset-bottom)] px-2
      flex justify-around items-center h-[64px] box-content shadow-2xl">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href.split("?")[0];
        return (
          <Link key={tab.href} href={tab.href} className="relative flex flex-col items-center justify-center py-2 w-full">
            <motion.div
              animate={{
                scale: isActive ? 1.1 : 1,
                color: isActive ? "#F59E0B" : "#9CA3AF"
              }}
              className="flex flex-col items-center gap-1"
            >
              <Icon name={tab.icon} size={24} />
              <span className="text-[10px] font-medium tracking-tight">{tab.label}</span>
            </motion.div>
            {isActive && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute top-0 w-8 h-1 rounded-full bg-brand-primary"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};
