"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  icon,
  disabled,
  className = "",
}: ButtonProps) => {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-[15px]",
    lg: "px-8 py-4 text-base",
  };

  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "text-text-secondary hover:text-white transition-colors",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
        rounded-xl font-semibold inline-flex items-center gap-2 transition-all
      `}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
};
