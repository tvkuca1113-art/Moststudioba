import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { EnglishFrame } from "@/components/english/EnglishFrame";
export default function NotFound() {
  return <EnglishFrame route={{ key: "home" }}><Section><Container><p className="text-sm text-slate">404 / Page not found</p><h1 className="mt-5 text-display">Let’s get you back on track.</h1><p className="mt-5 text-body text-slate">This page could not be found.</p><ButtonLink className="mt-7" href="/en">Back to MOST Studio</ButtonLink></Container></Section></EnglishFrame>;
}
