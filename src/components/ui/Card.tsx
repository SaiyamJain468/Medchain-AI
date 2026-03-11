"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent" | "danger";
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = "", 
  variant = "default" 
}) => {
  const borderColors = {
    default: "border-[#0E0E0E]",
    accent: "border-[#39FF14]",
    danger: "border-[#FF006E]",
  };

  const accentColors = {
    default: "border-l-[#1A1A1A]",
    accent: "border-l-[#39FF14]",
    danger: "border-l-[#FF006E]",
  };

  return (
    <div className={`
      bg-[#040404] 
      border ${borderColors[variant]} 
      border-l-2 ${accentColors[variant]}
      clip-card 
      p-6 
      relative 
      group
      transition-all 
      duration-300
      hover:bg-[#060606]
      ${className}
    `}>
      {children}
    </div>
  );
};

export const StatCard: React.FC<{
  label: string;
  value: string | number;
  trend?: string;
  icon?: React.ReactNode;
  variant?: "default" | "accent" | "danger";
  className?: string;
}> = ({ label, value, trend, icon, variant = "default", className }) => {
  const valueColors = {
    default: "text-[#F2F2F2]",
    accent: "text-[#39FF14]",
    danger: "text-[#FF006E]",
  };

  return (
    <Card variant={variant} className={`flex flex-col gap-1 ${className || ""}`}>
      <div className="flex justify-between items-start mb-2">
        <span className="font-mono text-[8px] tracking-[2px] text-[#444] uppercase">
          {label}
        </span>
        {icon && <div className="text-[#333]">{icon}</div>}
      </div>
      <div className={`text-5xl font-bebas ${valueColors[variant]}`}>
        {value}
      </div>
      {trend && (
        <div className={`font-mono text-[9px] mt-2 ${trend.includes('↑') ? 'text-[#39FF14]' : 'text-[#FF006E]'}`}>
          {trend}
        </div>
      )}
    </Card>
  );
};
