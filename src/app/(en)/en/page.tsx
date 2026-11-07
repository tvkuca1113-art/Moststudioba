import { EnglishHome } from "@/components/english/EnglishHome";
import { englishMetadata, englishTitle, englishDescription } from "@/lib/english-seo";
export const metadata = englishMetadata({ key: "home" }, englishTitle, englishDescription);
export default function Page() { return <EnglishHome />; }
