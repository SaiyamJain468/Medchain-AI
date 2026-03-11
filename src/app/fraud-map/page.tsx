import { Metadata } from "next";
import FraudMapClient from "./FraudMapClient";

export const metadata: Metadata = {
  title: "Fraud Intelligence Map",
  description: "Live geospatial threat intelligence. Tracking pharmaceutical fraud across global nodes.",
};

export default function Page() {
  return <FraudMapClient />;
}
