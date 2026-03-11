"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

// Routes where Lenis smooth scroll should be disabled
// (they use their own fixed-layout scroll)
const SMOOTH_SCROLL_EXCLUDED = ["/dashboard", "/fraud-map"];

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isExcluded = SMOOTH_SCROLL_EXCLUDED.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  useEffect(() => {
    if (isExcluded) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isExcluded, pathname]);

  return <>{children}</>;
};
