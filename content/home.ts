// ─── Hero ───────────────────────────────────────────────────────────────────
export type HeroContent = {
  badgeInner: string;
  badgeOuter: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  heroImageLight: string;
  heroImageDark: string;
  heroImageAlt: string;
};

// ... (other type exports remain unchanged)

// ─── Root ───────────────────────────────────────────────────────────────────
export type HomeContent = {
  hero: HeroContent;
  sponsors: SponsorsContent;
  benefits: BenefitsContent;
  features: FeaturesContent;
  services: ServicesContent;
  testimonials: TestimonialsContent;
  team: TeamContent;
  pricing: PricingContent;
  contact: ContactContent;
  faq: FaqContent;
  footer: FooterContent;
  navbar: NavbarContent;
};

// ─── Defaults ───────────────────────────────────────────────────────────────

export const defaultHomeContent: HomeContent = {
  // ── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    badgeInner: "Launch",
    badgeOuter: "JobPilot Job Board SaaS",
    titleBefore: "Power your hiring with ",
    titleHighlight: "JobPilot",
    titleAfter: ".",
    subtitle:
      "Post jobs, manage applicants, and hire smarter with AI. JobPilot brings effortless job listing, streamlined applicant management, and AI-powered candidate ranking for teams that want hiring to be simple and effective.",
    primaryCta: { label: "Start hiring with JobPilot", href: "#pricing" },
    secondaryCta: { label: "Explore how it works", href: "#features" },
    heroImageLight: "/hero-image-light.jpeg",
    heroImageDark: "/hero-image-dark.jpeg",
    heroImageAlt: "JobPilot dashboard preview",
  },

  // ── Sponsors ─────────────────────────────────────────────────────────────
  sponsors: {
    heading: "Trusted by modern teams",
    items: [
      { icon: "Crown", name: "Vercel" },
      { icon: "Vegan", name: "Stripe" },
      { icon: "Ghost", name: "OpenAI" },
      { icon: "Puzzle", name: "Postgres" },
      { icon: "Squirrel", name: "SendGrid" },
      { icon: "Drama", name: "AI-powered" },
      { icon: "Wallet", name: "Drizzle ORM" },
    ],
  },

  // ── Benefits ─────────────────────────────────────────────────────────────
  benefits: {
    eyebrow: "Why JobPilot",
    heading: "The ultimate hiring control center",
    description:
      "JobPilot puts your entire hiring flow in one modern dashboard. Save time, reduce effort, and discover better talent with AI at your side.",
    items: [
      {
        icon: "Blocks",
        title: "Effortless Job Listings",
        description: "Create, edit, and publish openings in seconds. Rich descriptions, locations, and custom fields ensure every role is clear.",
      },
      {
        icon: "LineChart",
        title: "All Applicants, Managed",
        description: "Track, search, and review applicants for every job—never let a great candidate slip through the cracks.",
      },
      {
        icon: "Sparkle",
        title: "AI Candidate Ranking",
        description: "Instantly see the best-fit candidates. Let AI score and explain why each applicant stands out, saving your team hours.",
      },
      {
        icon: "Wallet",
        title: "Secure & Multi-tenant",
        description: "All your company’s jobs and applicants, always private and partitioned. No data leakage, period.",
      },
    ],
  },

  // ── Features ─────────────────────────────────────────────────────────────
  features: {
    eyebrow: "Features",
    heading: "Everything you need for smarter hiring",
    subtitle:
      "JobPilot combines modern applicant tracking, AI-powered insights, and a seamless HR experience—no clunky tools, just results.",
    items: [
      { icon: "MousePointerClick", title: "Post Jobs Easily", description: "Create, edit, and archive job listings with all the details that matter." },
      { icon: "UserPlus", title: "Applicant Tracking", description: "Every application, resume, and action at a glance—manage with total clarity." },
      { icon: "Newspaper", title: "Resume Parsing", description: "Upload resumes and get structured candidate profiles, instantly extracted." },
      { icon: "Sparkle", title: "AI Candidate Ranking", description: "Rank and filter applicants with smart, explainable AI scoring and insights." },
      { icon: "Search", title: "Advanced Filtering", description: "Filter, search, and sort candidates by status, skills, or any custom field." },
      { icon: "ShieldCheck", title: "Secure Company Data", description: "All data is private, encrypted, and scoped to your company only." },
    ],
  },

  // ── Services ─────────────────────────────────────────────────────────────
  services: {
    eyebrow: "How JobPilot Works",
    heading: "A hiring flow you’ll love",
    subtitle:
      "Start in minutes, not months. Our streamlined workflow means you can focus on finding the best talent, not wrestling with tools.",
    items: [
      { title: "Create your job", description: "Publish new openings with full control—title, location, description, and requirements.", pro: false },
      { title: "Receive applications", description: "Applicants submit personal info, resumes, and cover letters via your branded portal.", pro: false },
      { title: "Parse resumes instantly", description: "Automatic extraction of candidate skills, education, and experience for every upload.", pro: false },
      { title: "AI ranks candidates", description: "JobPilot’s AI scores and explains applicant fit, surfacing top talent in seconds.", pro: true },
    ],
  },

  // ── Testimonials ─────────────────────────────────────────────────────────
  testimonials: {
    eyebrow: "Why choose JobPilot?",
    heading: "Real teams. Real hiring results.",
    reviews: [
      { image: "/demo-img.jpg", name: "Marie Curie", role: "Head of Talent, Acme Inc", comment: "JobPilot’s AI ranking helped us fill roles faster and focus on the people who truly fit.", rating: 5.0 },
      { image: "/demo-img.jpg", name: "Ethan Zhou", role: "HR, Growthly", comment: "Resume parsing saved my team hours. We caught details we'd have missed before.", rating: 4.8 },
      { image: "/demo-img.jpg", name: "Camila Nunez", role: "Recruiter, RocketHire", comment: "Simple, intuitive, and effective—the new standard for applicant tracking.", rating: 5.0 },
      { image: "/demo-img.jpg", name: "Luca Bianchi", role: "CTO, NovaTech", comment: "We trust JobPilot for all our hiring—secure, robust, and smart.", rating: 5.0 },
      { image: "/demo-img.jpg", name: "Evelyn Grant", role: "People Ops, Vanta", comment: "Switching to JobPilot made collaboration between hiring managers and HR a breeze.", rating: 4.9 },
    ],
  },

  // ── Team ─────────────────────────────────────────────────────────────────
  team: {
    eyebrow: "The Team",
    heading: "Meet the JobPilot crew",
    members: [
      {
        imageUrl: "/team1.jpg",
        firstName: "Chirag",
        lastName: "Dodiya",
        positions: ["Founder", "Product & Engineering"],
        socialNetworks: [
          { name: "LinkedIn", url: "https://linkedin.com/in/chiragdodiya" }
        ],
      },
      {
        imageUrl: "/team2.jpg",
        firstName: "Ava",
        lastName: "Patel",
        positions: ["Design Lead"],
        socialNetworks: [
          { name: "LinkedIn", url: "https://linkedin.com" },
        ],
      },
    ],
  },

  // ── Pricing ──────────────────────────────────────────────────────────────
  pricing: {
    eyebrow: "Pricing",
    heading: "Plans for every hiring phase",
    subtitle: "Get started for free. Flexible plans scale as your company grows.",
    priceSuffix: "/month",
    plans: [
      {
        title: "Starter",
        popular: false,
        price: 0,
        description: "Free forever for small teams starting out.",
        buttonText: "Try JobPilot Free",
        benefits: [
          "Up to 2 jobs",
          "10 applications per job",
          "AI candidate scoring",
          "Resume parsing",
          "Email support"
        ],
      },
      {
        title: "Growth",
        popular: true,
        price: 59,
        description: "For growing companies hiring regularly.",
        buttonText: "Start Growth Plan",
        benefits: [
          "Unlimited jobs",
          "Unlimited applications",
          "Advanced filters",
          "AI ranking explanations",
          "Priority support"
        ],
      },
      {
        title: "Enterprise",
        popular: false,
        price: 249,
        description: "For hiring at scale with advanced compliance.",
        buttonText: "Contact JobPilot",
        benefits: [
          "Custom integrations",
          "SSO/SAML",
          "Data export",
          "Dedicated manager",
          "SLAs & compliance"
        ],
      },
    ],
  },

  // ── Contact ──────────────────────────────────────────────────────────────
  contact: {
    eyebrow: "Contact",
    heading: "Get in touch with JobPilot",
    description:
      "Want a demo, pricing details, or have questions? Reach out—we're here to help.",
    mailtoAddress: "hi@chirag.co",
    info: {
      address: { label: "Offices", value: "Remote-first • Global" },
      phone: { label: "Call us", value: "" },
      email: { label: "Email", value: "hi@chirag.co" },
      hours: { label: "Hours", value: ["Monday - Friday", "9AM - 6PM UTC"] },
    },
    formSubjects: [
      "Demo Request",
      "Pricing Inquiry",
      "Applicant Data Security",
      "Resume Parsing Questions",
      "Enterprise Plan"
    ],
    formSubmitLabel: "Contact JobPilot",
  },

  // ── FAQ ──────────────────────────────────────────────────────────────────
  faq: {
    eyebrow: "FAQ",
    heading: "JobPilot Quick Answers",
    items: [
      { question: "Is JobPilot free to start with?", answer: "Yes. You can use the Starter plan at zero cost—no credit card required." },
      { question: "Can applicants apply directly to my jobs?", answer: "Yes. Each job listing gets a unique link for applicants to submit their info and resume." },
      { question: "Does JobPilot support resume parsing and AI ranking by default?", answer: "Yes, both are included in all plans from day one." },
      { question: "Can my team review, score, and filter applicants?", answer: "Absolutely. All applications are filterable and rankable in the dashboard." },
      { question: "Is my company’s data secure and isolated?", answer: "Always. Each company’s data is strictly partitioned and encrypted." },
    ],
  },

  // ── Footer ───────────────────────────────────────────────────────────────
  footer: {
    brandName: "JobPilot",
    columns: [
      {
        heading: "Contact",
        links: [
          { label: "hi@chirag.co", href: "mailto:hi@chirag.co" },
          { label: "LinkedIn", href: "https://linkedin.com/in/chiragdodiya" }
        ],
      },
      {
        heading: "Platform",
        links: [
          { label: "How it Works", href: "#services" },
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
        ],
      },
      {
        heading: "Support",
        links: [
          { label: "Contact", href: "#contact" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      {
        heading: "JobPilot",
        links: [
          { label: "About", href: "#" },
          { label: "Security", href: "#" },
        ],
      },
    ],
    copyright: "© 2026 JobPilot. All Rights Reserved.",
    attribution: { label: "Empowering Hiring Teams", href: "https://jobpilot.com" },
  },

  // ── Navbar ───────────────────────────────────────────────────────────────
  navbar: {
    brandName: "JobPilot",
    routes: [
      { href: "/#features", label: "Features" },
      { href: "/#services", label: "How it Works" },
      { href: "/#testimonials", label: "Testimonials" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/#faq", label: "FAQ" },
      { href: "/#contact", label: "Contact" }
    ],
    featureDropdownLabel: "Why JobPilot?",
    featureImage: { src: "/hero-image-light.jpeg", alt: "JobPilot dashboard preview" },
    features: [
      { title: "Job Listings & CRM", description: "Manage openings with all the context you need." },
      { title: "AI-Driven Applicant Scoring", description: "Best-fit candidates automatically ranked, so you never miss top talent." },
      { title: "Secure Applicant Data", description: "Security and privacy built-in, always." },
    ],
    signInLabel: "Sign in",
    signUpLabel: "Sign up",
    dashboardLabel: "Dashboard",
    githubLink: { href: "https://github.com", ariaLabel: "View on Github" },
  },
};

export function getHomeContent(): HomeContent {
  return defaultHomeContent;
}