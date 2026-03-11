import { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Command Central",
  description: "Real-time analytics, node monitoring, and threat detection for your pharmaceutical supply chain.",
};

export default function Page() {
  return <DashboardClient />;
}
