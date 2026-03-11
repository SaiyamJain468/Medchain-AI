"use client";

import React from "react";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
}

// Omit motion-specific props from standard button props to avoid conflicts
type MotionButtonProps = React.ComponentProps<typeof motion.button>;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading,
  fullWidth,
  className,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-mono font-bold uppercase tracking-[2px] transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed clip-btn";
  
  const variants = {
    primary: "bg-[#39FF14] text-[#020202] hover:bg-[#39FF14]/90",
    secondary: "bg-[#060606] border border-[#1A1A1A] text-[#F2F2F2] hover:border-[#39FF14] hover:text-[#39FF14]",
    danger: "bg-[#FF006E] text-[#020202] hover:bg-[#FF006E]/90",
    ghost: "bg-transparent border border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14]/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-6 py-3 text-xs",
    lg: "px-10 py-5 text-sm",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? "w-full" : ""}
        ${className || ""}
      `}
      {...props as any}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-current animate-pulse" />
          VERIFYING...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
};
