"use client";

import { useState, useEffect, useCallback } from "react";

const CHARS = "!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWxyz0123456789";

export const useScramble = (text: string, duration: number = 2000, delay: number = 0) => {
  const [displayValue, setDisplayValue] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const startScramble = useCallback(() => {
    setIsAnimating(true);
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayValue((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }

      iteration += 1 / 3;
    }, 30);
  }, [text]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      startScramble();
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, startScramble]);

  return { displayValue, isAnimating };
};
