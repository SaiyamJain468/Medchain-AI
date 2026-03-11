import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ConditionalNavbar } from "@/components/layout/ConditionalNavbar";
import { Cursor } from "@/components/ui/Cursor";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

export const metadata: Metadata = {
  title: {
    default: "MedChain AI | Cyberpunk Medical Terminal",
    template: "%s | MedChain AI"
  },
  description: "Next-gen pharmaceutical supply chain security powered by AI & Blockchain. Immutable verification for a safer world.",
  keywords: ["blockchain", "pharma", "AI", "supply chain", "medicine security", "cyberpunk"],
  authors: [{ name: "MedChain Portal" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "MedChain AI | Cyberpunk Medical Terminal",
    description: "Next-gen pharmaceutical supply chain security.",
    url: "https://medchain-ai.vercel.app",
    siteName: "MedChain AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MedChain AI",
    description: "Securing the world's medicine supply chain.",
  }
};

export const viewport: Viewport = {
  themeColor: "#020202",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

import { AuthProvider } from "@/components/layout/AuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-[#39FF14] selection:text-[#020202] bg-[#020202] overflow-x-hidden">
        <AuthProvider>
          <SmoothScroll>
            {/* DESIGN SYSTEM OVERLAYS */}
            <div className="noise-overlay" />
            <div className="scanlines" />
            <div className="grid-bg" />
            
            {/* CUSTOM CURSOR */}
            <Cursor />

            {/* Navbar only renders on non-dashboard/fraud-map routes */}
            <ConditionalNavbar />

            {children}
            
            <Toaster 
              position="bottom-right"
              toastOptions={{
                style: {
                  background: '#060606',
                  color: '#F2F2F2',
                  border: '1px solid #39FF14',
                  borderRadius: '0',
                  fontFamily: 'Share Tech Mono, monospace',
                  fontSize: '12px',
                },
              }}
            />
          </SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  );
}
