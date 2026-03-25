"use client";
import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "new" | "qualified" | "contacted" | "closed" | "rejected" | "default" | "outline";
  className?: string;
}

const variantStyles = {
  new: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  qualified: "bg-green-500/15 text-green-400 border-green-500/20",
  contacted: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  closed: "bg-brand-primary/15 text-brand-primary border-brand-primary/20",
  rejected: "bg-red-500/15 text-red-400 border-red-500/20",
  outline: "bg-transparent border-white/10 text-text-secondary",
  default: "bg-white/5 text-text-secondary border-white/10",
};

export const Badge = ({ children, variant = "default", className = "" }: BadgeProps) => {
  return (
    <span className={`
      px-3 py-1 rounded-full text-xs font-medium border
      ${variantStyles[variant]}
      ${className}
    `}>
      {children}
    </span>
  );
};

export default Badge;
