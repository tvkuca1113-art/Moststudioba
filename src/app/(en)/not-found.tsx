import { Arrow } from "@/components/english/Arrow";
import Link from "next/link";
import { EnglishFrame } from "@/components/english/EnglishFrame";
export default function NotFound() {
  return <EnglishFrame route={{ key: "home" }}><section className="en-section en-wrap"><p className="en-kicker">404 / Page not found</p><h1 className="en-section-title">Let’s get you back on track.</h1><p>This page could not be found.</p><Link className="en-button" href="/en">Back to MOST Studio <Arrow /></Link></section></EnglishFrame>;
}
