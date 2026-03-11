import { Metadata } from "next";
import ScanClient from "./ScanClient";

export const metadata: Metadata = {
  title: "Secure Scan",
  description: "Verify your pharmaceutical products in real-time with AI neural verification and blockchain history.",
};

export default function Page() {
  return <ScanClient />;
}
