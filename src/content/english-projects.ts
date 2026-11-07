import { clientProjects } from "@/content/client-projects";
import { demoProjects } from "@/content/projects";
import { mirjanaShots } from "@/content/client-shots";
import { shots, type Shot } from "@/content/shots";

export type EnglishProject = {
  slug: string;
  brand: string;
  category: string;
  kind: "client" | "concept";
  title: string;
  summary: string;
  brief: string;
  scope: string[];
  decisions: { title: string; body: string }[];
  desktop: Shot;
  mobile: Shot;
  liveUrl?: string;
  demoUrl?: string;
  color: string;
};

const mirjana = clientProjects.find(project => project.slug === "mirjana-massage")!;
const concept = (slug: string) => demoProjects.find(project => project.slug === slug)!;

/** English presentations of existing work. Sources retain names, URLs and identity. */
export const englishProjects: EnglishProject[] = [
  {
    slug: mirjana.slug,
    brand: mirjana.brand,
    category: "Massage & wellness · Munich, Germany",
    kind: "client",
    title: "A personal service. A personal website.",
    summary: "A calm, welcoming website that introduces Mirjana, explains her treatments and gives visitors a clear way to ask for an appointment.",
    brief: "Help a visitor understand who they will meet, compare treatments, duration and prices, and prepare an appointment inquiry. The website needed to feel as personal as the service.",
    scope: ["Website structure & German content", "Visual design", "Responsive development", "Appointment inquiry flow"],
    decisions: [
      { title: "Put the person behind the service first.", body: "Mirjana’s introduction gives visitors a sense of who will welcome them. Photography, quiet colors and generous spacing support the studio’s personal character." },
      { title: "Make the offer easy to compare.", body: "Treatments are grouped with their duration and price, so a visitor can understand the options before starting a conversation." },
      { title: "Make the next step explicit.", body: "The contact flow prepares an inquiry for WhatsApp or a phone call. Mirjana agrees and confirms the appointment personally; an inquiry is not an automatic booking." },
    ],
    desktop: mirjanaShots.desktop,
    mobile: mirjanaShots.mobile,
    liveUrl: mirjana.liveUrl,
    color: "wellness",
  },
  {
    slug: "stolarija-hrast",
    brand: concept("stolarija-hrast").brand,
    category: "Custom cabinetry & furniture",
    kind: "concept",
    title: "Let the craftsmanship do the talking.",
    summary: "An independent cabinetry concept built around materials, project detail and a furniture configurator.",
    brief: "Explore how a custom furniture business could help visitors compare finishes, understand the scope of a project and arrive at a more specific inquiry.",
    scope: ["Independent design concept", "Art direction & responsive layouts", "Material selection", "Interactive furniture configurator"],
    decisions: [
      { title: "Lead with the material.", body: "Large imagery, warm colors and restrained typography give the work room to speak. Finishes are named clearly and shown as samples." },
      { title: "Add context to the gallery.", body: "Each example explains the material, dimensions and scope. This turns an attractive image into something a visitor can use to describe their own project." },
      { title: "Turn inspiration into a starting brief.", body: "A demo configurator lets a visitor explore furniture type, finish, width and additional services, then download a project summary. No real order is placed." },
    ],
    desktop: shots["stolarija-hrast-bs-desktop"],
    mobile: shots["stolarija-hrast-bs-mobile"],
    demoUrl: "/demo/stolarija-hrast",
    color: "timber",
  },
  {
    slug: "ordinacija-lipa",
    brand: concept("ordinacija-lipa").brand,
    category: "Dental practice",
    kind: "concept",
    title: "A clearer path to the first appointment.",
    summary: "A dental website concept that makes treatment information approachable and lets visitors try a guided appointment flow.",
    brief: "Explore how a first-time patient could understand the offer, find a relevant service and see what the next step involves, including on a small screen.",
    scope: ["Independent design concept", "Patient-focused content structure", "Responsive development", "Demo appointment selection"],
    decisions: [
      { title: "Start with the visitor’s question.", body: "A symptom selector uses everyday language to guide a visitor toward a service, rather than requiring knowledge of dental terminology." },
      { title: "Give useful details upfront.", body: "Service descriptions include duration and what to expect. A light palette and comfortable type sizes make the information easy to scan." },
      { title: "Keep the next step within reach.", body: "A mobile appointment bar stays available while browsing. The demo lets visitors select a service, date and time, but creates no real appointment." },
    ],
    desktop: shots["ordinacija-lipa-bs-desktop"],
    mobile: shots["ordinacija-lipa-bs-mobile"],
    demoUrl: "/demo/ordinacija-lipa",
    color: "dental",
  },
  {
    slug: "meridijan-savjetovanje",
    brand: concept("meridijan-savjetovanje").brand,
    category: "Business consulting",
    kind: "concept",
    title: "Make an abstract service feel concrete.",
    summary: "An editorial consulting concept with a short, interactive guide to a more focused first conversation.",
    brief: "Explore how a consulting website could help an owner recognize their situation, understand the areas of work and know what a first meeting might cover.",
    scope: ["Independent design concept", "Editorial design & content structure", "Responsive development", "Interactive conversation planner"],
    decisions: [
      { title: "Give the words room.", body: "An editorial rhythm, narrow text measures and fine rules create the feeling of considered advice. The layout follows the content rather than a repeated card grid." },
      { title: "Ask three useful questions.", body: "A short guide suggests an area of focus and a meeting agenda. It explains a possible conversation rather than presenting an assessment of a real business." },
      { title: "Show the process instead of invented proof.", body: "The concept explains what happens in a first meeting and lets visitors download a sample collaboration plan. There are no invented clients or growth statistics." },
    ],
    desktop: shots["meridijan-savjetovanje-bs-desktop"],
    mobile: shots["meridijan-savjetovanje-bs-mobile"],
    demoUrl: "/demo/meridijan-savjetovanje",
    color: "advisory",
  },
];

export const getEnglishProject = (slug: string) => englishProjects.find(project => project.slug === slug);

/** Owner requested these live websites as examples, not as demo businesses. */
export const websiteExamples = [
 { brand: "DAL Workshop", domain: "dalworkshop.com", url: "https://dalworkshop.com/", language: "Bosnian", image: "/images/projects/examples/dal-desktop-20261107.webp", color: "timber", description: "A furniture website centered on made-to-measure tables, warm material photography and a guided product configurator." },
 { brand: "InnoSa Clean", domain: "innosaclean.de", url: "https://innosaclean.de/", language: "German", image: "/images/projects/examples/innosa-desktop-20261107.webp", color: "clean", description: "A Hamburg cleaning website with clear service pages, property-specific information and a focused quote inquiry flow." },
] as const;
