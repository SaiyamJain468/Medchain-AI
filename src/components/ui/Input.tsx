"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="font-mono text-[9px] text-[#444] uppercase tracking-[2px]">
          {label}
        </label>
      )}
      <input
        className={`
          bg-[#060606] 
          border border-[#0E0E0E] 
          px-4 py-3 
          text-[#F2F2F2] 
          font-mono text-sm 
          placeholder:text-[#1A1A1A]
          focus:outline-none 
          focus:border-[#39FF14] 
          transition-colors
          ${error ? "border-[#FF006E]" : ""}
          ${className || ""}
        `}
        {...props}
      />
      {error && (
        <span className="font-mono text-[10px] text-[#FF006E] animate-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
};

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string }> = ({ label, error, className, children, ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="font-mono text-[9px] text-[#444] uppercase tracking-[2px]">
          {label}
        </label>
      )}
      <select
        className={`
          bg-[#060606] 
          border border-[#0E0E0E] 
          px-4 py-3 
          text-[#F2F2F2] 
          font-mono text-sm 
          focus:outline-none 
          focus:border-[#39FF14] 
          transition-colors
          appearance-none
          cursor-pointer
          ${error ? "border-[#FF006E]" : ""}
          ${className || ""}
        `}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};
