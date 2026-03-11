"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

// Routes where the global Navbar should NOT render (they have their own navigation)
const NAVBAR_EXCLUDED_ROUTES = ["/dashboard", "/fraud-map"];

export const ConditionalNavbar = () => {
  const pathname = usePathname();
  const isExcluded = NAVBAR_EXCLUDED_ROUTES.some((route) =>
    pathname === route || pathname.startsWith(route + "/")
  );
  if (isExcluded) return null;
  return <Navbar />;
};
