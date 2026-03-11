"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export const Cursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [label, setLabel] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const ringY = useSpring(mouseY, { damping: 20, stiffness: 150 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverLabel = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      const isClickable = target.closest("button, a, [role='button'], input, select, textarea");

      if (hoverLabel) {
        setLabel(hoverLabel);
        setIsHovered(true);
      } else if (isClickable) {
        setLabel("CLICK");
        setIsHovered(true);
      } else {
        setIsHovered(false);
        setLabel("");
      }
    };

    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);
    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    document.documentElement.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.removeEventListener("mouseenter", handleEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* DOT */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#39FF14] mix-blend-screen"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovered ? 2.5 : 1,
          opacity: 1,
        }}
        transition={{ duration: 0.08 }}
      />

      {/* RING */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-[#39FF14]/40"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovered ? 1.6 : 1,
          borderColor: isHovered ? "#FF006E" : "rgba(57,255,20,0.4)",
          rotate: isHovered ? 45 : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* LABEL */}
      <AnimatePresence>
        {label && (
          <motion.span
            key={label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 font-mono text-[9px] text-[#39FF14] tracking-[2px] whitespace-nowrap leading-none pointer-events-none"
            style={{
              x: mouseX,
              y: mouseY,
              translateX: "12px",
              translateY: "-18px",
            }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};
