import { Metadata } from "next";
import MarketplaceClient from "./MarketplaceClient";

export const metadata: Metadata = {
  title: "Secure Marketplace",
  description: "Browse and order verified pharmaceutical products from blockchain-vetted retail nodes.",
};

export default function Page() {
  return <MarketplaceClient />;
}
