"use client";

import React from "react";
import { Icon } from "@exvion/ui";
import { useAuth } from "@/hooks/useAuth";

export const MobileHeader = () => {
  const { user } = useAuth();

  return (
    <header className="md:hidden sticky top-0 z-40 glass border-b border-white/5 
      px-5 h-14 flex items-center justify-between pt-[env(safe-area-inset-top)] box-content">
      <div className="flex items-center">
        <img 
          src="/logo.webp" 
          alt="Exvion" 
          className="h-8 w-auto" 
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="text-text-muted hover:text-white transition-colors relative">
          <Icon name="notification" size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-brand-primary border-2 border-[#0A0A0F]" />
        </button>
        <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center 
          text-brand-primary text-xs font-bold border border-brand-primary/30">
          {user?.name?.[0]?.toUpperCase() || "A"}
        </div>
      </div>
    </header>
  );
};
