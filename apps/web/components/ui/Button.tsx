import { motion, useAnimationControls } from "framer-motion";
import { ReactNode, useEffect } from "react";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
  glow?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  icon,
  disabled,
  className = "",
  href,
  glow = true,
}: ButtonProps) => {
  const controls = useAnimationControls();
  const isPrimary = variant === "primary";

  useEffect(() => {
    if (disabled || !isPrimary || !glow) return;
    
    const interval = setInterval(async () => {
      await controls.start({
        scale: [1, 1.03, 1],
        transition: { duration: 0.4, ease: "easeInOut" }
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [disabled, isPrimary, glow, controls]);

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-[15px]",
    lg: "px-8 py-4 text-base",
  };

  const variants = {
    primary: "btn-primary relative overflow-hidden",
    secondary: "btn-secondary relative overflow-hidden",
    ghost: "text-text-secondary hover:text-white transition-colors relative",
  };

  const buttonProps = {
    animate: controls,
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.96 },
    onClick,
    disabled,
    className: `
      ${variants[variant]} 
      ${sizes[size]} 
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      ${className}
      rounded-xl font-bold inline-flex items-center justify-center gap-2 transition-all border
    `.trim()
  };

  const content = (
    <>
      {/* External Glow Ring for Primary */}
      {isPrimary && glow && !disabled && (
        <motion.div 
          className="absolute -inset-[2px] rounded-xl opacity-40 z-[-1]"
          style={{ background: 'var(--brand-primary)' }}
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Shimmer Effect */}
      {isPrimary && glow && !disabled && (
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)",
            backgroundSize: "200% 100%"
          }}
          animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
        />
      )}

      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} legacyBehavior passHref>
        <motion.a {...buttonProps}>
          {content}
        </motion.a>
      </Link>
    );
  }

  return (
    <motion.button {...buttonProps}>
      {content}
    </motion.button>
  );
};

