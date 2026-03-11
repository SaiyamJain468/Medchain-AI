import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ConditionalNavbar } from "@/components/layout/ConditionalNavbar";
import { Cursor } from "@/components/ui/Cursor";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

export const metadata: Metadata = {
  title: "MedChain AI | Cyberpunk Medical Terminal",
  description: "Next-gen pharmaceutical supply chain security powered by AI & Blockchain.",
};

export const viewport: Viewport = {
  themeColor: "#020202",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-[#39FF14] selection:text-[#020202] bg-[#020202]">
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
      </body>
    </html>
  );
}
