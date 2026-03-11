import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "verified" | "suspicious" | "neutral" | "investigating";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  className,
}) => {
  const variants = {
    verified: "border border-[#39FF14] text-[#39FF14]",
    suspicious: "bg-[#FF006E] text-[#020202]",
    investigating: "border border-[#FFAA00] text-[#FFAA00]",
    neutral: "border border-[#1A1A1A] text-[#333]",
  };

  return (
    <span className={`
      inline-flex items-center gap-1.5 px-2 py-0.5 text-[8px] font-mono uppercase tracking-[2px]
      ${variants[variant]}
      ${className || ""}
    `}>
      {variant === "verified" && <span className="w-1 h-1 bg-[#39FF14]" />}
      {variant === "suspicious" && <span className="w-1 h-1 bg-[#020202]" />}
      {children}
    </span>
  );
};

export const Tag: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  return (
    <span className={`
      inline-block bg-[#0D2B05] text-[#39FF14] text-[8px] 
      font-mono uppercase tracking-[2px] px-3 py-1 rounded-full
      ${className || ""}
    `}>
      {children}
    </span>
  );
};
