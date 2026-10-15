export type Project = {
  num: string;
  slug: string;
  title: string;
  role: string;
  company?: string;
  tags: string[];
  metric: string;
  /** Omit for internal work with no public link — the card renders non-clickable. */
  url?: string;
  image: string;
  /** Grid span treatment for the asymmetric layout */
  span: "wide" | "tall" | "standard";
  note?: string;
};

export const projects: Project[] = [
  {
    num: "01",
    slug: "hancock-teleops",
    title: "Hancock Hospital",
    role: "Simulation Research · Experience Design & Development",
    company: "Arrive AI",
    tags: ["Teleoperation", "Simulation", "Healthcare"],
    // Placeholder copy — replace with a verified impact line.
    metric: "Teleoperation screen design & simulation environment for hospital delivery",
    image: "/work/hancock-teleops.jpg",
    span: "wide",
    note: "Teleoperation & UX research",
  },
  {
    num: "02",
    slug: "simon-group",
    title: "The Simon Group",
    role: "Simulation Research · Experience Design & Development",
    company: "Arrive AI",
    tags: ["UX Research", "Experience Design", "In progress"],
    // Placeholder copy — replace with a verified impact line.
    metric: "Current work — designing the operator experience",
    image: "/work/simon-group.jpg",
    span: "standard",
    note: "In progress",
  },
  {
    num: "03",
    slug: "tatlub",
    title: "Tatlub.com",
    role: "UI/UX Designer (intern → full-time)",
    company: "Nuance Digital Solutions · remote",
    tags: ["Mobile", "Research", "0→1"],
    metric: "Conceptualized & designed for 3,000+ B2B and B2C users",
    url: "https://www.behance.net/gallery/210835343/Tatlubcom-A-User-Friendly-Mobile-Application",
    image: "/work/tatlub.jpg",
    span: "wide",
  },
  {
    num: "04",
    slug: "senior-care",
    title: "Senior Citizen Home Care",
    role: "UX Designer",
    tags: ["App", "Research", "Healthcare"],
    metric: "Companion case study to Careify — a linked pair",
    url: "https://www.behance.net/gallery/158027697/Application-design-for-a-Senior-Citizen-Nursing-Home",
    image: "/work/senior-care.jpg",
    span: "standard",
    note: "Paired with Careify",
  },
  {
    num: "05",
    slug: "careify",
    title: "Careify",
    role: "Research + Product",
    tags: ["Mobile", "AI", "Healthcare"],
    metric: "User interviews & tests improved research data collection by 30%",
    url: "https://www.behance.net/gallery/158028381/Careify-A-Health-Care-Monitoring-Application",
    image: "/work/careify.jpg",
    span: "standard",
    note: "AI-integrated product for senior health & safety",
  },
  {
    num: "06",
    slug: "101-group",
    title: "101 Group",
    role: "UI Designer",
    company: "Nexa · Dubai",
    tags: ["Web", "Client"],
    metric: "Corporate web design for an investment company",
    url: "https://www.behance.net/gallery/174713661/101-Group-Investment-Company-Web-Design",
    image: "/work/101-group.jpg",
    span: "standard",
  },
  {
    num: "07",
    slug: "meryal",
    title: "Meryal Waterpark",
    role: "UI Designer",
    tags: ["Web", "Landing"],
    metric: "Homepage design for Qatar's largest waterpark",
    url: "https://www.behance.net/gallery/158038889/Waterpark-Website-UI",
    image: "/work/meryal.jpg",
    span: "standard",
  },
];

export const marqueeItems = [
  "Real-time systems",
  "AI tooling",
  "Autonomous delivery",
  "Healthcare UX",
  "Design systems",
  "User research",
  "Prototyping",
  "Accessibility",
  "Information architecture",
];
