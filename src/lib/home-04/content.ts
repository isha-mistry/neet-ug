export const HOME_04_METADATA = {
  title: "Professional Medical Counseling & Allotment Analytics",
  description:
    "Institutional-grade data analytics and strategic counseling to secure your MBBS seat in high-clinical-load government institutions.",
};

export const HERO_STATS = [
  { value: "15,000+", label: "Students Mentored" },
  { value: "99.4%", label: "Placement Accuracy" },
  { value: "32 States", label: "Network Coverage" },
] as const;

export const DOMICILE_OPTIONS = [
  "Maharashtra",
  "Gujarat",
  "Rajasthan",
  "Other/AIQ",
] as const;

export const LIFECYCLE_PHASES = [
  {
    step: "1",
    icon: "assignment",
    title: "Pre-NEET Strategy",
    body: "Profile building, quota documentation, and domicile strategy finalization based on projected ranks.",
    bullets: ["Domicile Optimization", "Category Validation"],
  },
  {
    step: "2",
    icon: "monitoring",
    title: "Post-Result Audit",
    body: "Clinical comparison of score vs rank vs inflation to define realistic institutional targets.",
    bullets: ["Rank-Trend Analysis", "Choice List Drafting"],
  },
  {
    step: "3",
    icon: "swap_horiz",
    title: "The Allotment Game",
    body: "Round-by-round seat upgrading, free-exit management, and bond penalty mitigation.",
    bullets: ["Live Choice Filling", "Upgrade Logic Execution"],
  },
  {
    step: "4",
    icon: "task_alt",
    title: "Mop-up & Finality",
    body: "Strategic entry into stray vacancy rounds for premier colleges with residual seats.",
    bullets: ["Stray Vacancy Recon", "Institution Admission"],
  },
] as const;

export const CHART_BARS = [
  { year: "2022", height: "40%", projected: false },
  { year: "2023", height: "55%", projected: false },
  { year: "2024", height: "75%", projected: false },
  { year: "2025*", height: "85%", projected: true },
] as const;

export const METHODOLOGY_ROWS = [
  {
    attribute: "Data Source",
    generic: "Third-party PDF archives",
    clinical: "Real-time API from State Portals",
  },
  {
    attribute: "Choice Filling",
    generic: "Static Rank Lists",
    clinical: "Clinical-Exposure & Stipend Mapping",
  },
  {
    attribute: "Expertise",
    generic: "Sales Consultants",
    clinical: "Retired Medical Dept. Officials",
  },
  {
    attribute: "Post-Allotment",
    generic: "Ends at Admission",
    clinical: "Bond Exit & PG Strategy Orientation",
  },
] as const;

export const EXPERT_PANEL = [
  {
    name: "Rajesh K. Mehta",
    role: "18+ Years Exp | Rajasthan Specialist",
    bio: "Former Admissions Head with deep insights into SMS Jaipur & RUHS state quota dynamics.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD1AWHJ0GhrU6eFPSisp8S2cfTPZ2ioMIdilgybHAQstEvb8RI7TNvp3omUVWi8uW4yxjIR_bF1NDAw97xhnVgqDAp-au8HxiUhDSk-pJgFMwhdfg6E6JXOVUG0qaMKXPEKsy-U-0rbrE7NAnTiRrfNoNP1Kq9JdKNXdGqI3cYkVKMceVPX8eH_3ME2PK5pno9_afIM2MQqlBfEuZuzZPNQwfB2W3FbXRSLFeYCmOPyoHL6bvmCDab-uxwU4_FuZX5pczMT9hjzOGw",
  },
  {
    name: "Dr. Sunita Deshmukh",
    role: "12+ Years Exp | MCC/AIQ Expert",
    bio: "Specializes in All India Quota upgrades and AIIMS/JIPMER institutional preferences.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAG-kuB0Q6pAcGryaGa7AcING-_bLw_3n1LCimM9dqVXUT7I70B2XBY9xmcd5VTVJZDPIispTh825CAV_yr3PqoVn6XeP9FcJWikDVII-dXoeoRzoFND7vVHBf_nhhWglW7MyNJ5Y6F9xKk8QWcUnFT4b_4mK8alBLczTWfXkq5XAnjiCRiSc-Nw108b6w74hmsw_drltQ2gZTJzcOrRXwxdpuRg8wQdJHJ-QCBi4g-zw4dZ7uPyg0bvXaXJiVNVXwhXu_qFVwpLkk",
  },
  {
    name: "Vikram S. Negi",
    role: "15+ Years Exp | Southern India Focus",
    bio: "Expert in Tamil Nadu & Karnataka state counseling and linguistic minority quotas.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDykrPA8LPUQjWl6l4HIER_9C6O9TAN5RqFRSAgMf_BkM-93uD85JsUJbDerhoOPGPK7rE8zg63bMJ8IUft6QXtPyuB-ZGQT5aD8A5voiK9oxO9Udrs-X6KG9QEIJrS_R1GSCW968am29fTTNUCGo33qKAZJ58ZOz4o4433PW3dwoZpMecpI9Jr4v3Ic-hf-eC-nFzZqd05qYS4hPU9mJ_RNahpz-MJJwvGLqB86cR9SXurU7xLuK8QRNeN1pb3egg_tipP-QMqGNs",
  },
] as const;

export const SUCCESS_REGISTRY = [
  {
    rank: "AIR 1,242",
    institute: "BJMC Ahmedabad",
    quota: "Gujarat Govt. Quota",
  },
  {
    rank: "AIR 8,450",
    institute: "GSMC (KEM) Mumbai",
    quota: "AIQ Category Upgrade",
  },
  {
    rank: "AIR 14,201",
    institute: "GMC Bhopal",
    quota: "MP State Counseling",
  },
  {
    rank: "AIR 32,500",
    institute: "KMC Manipal",
    quota: "Deemed Management",
  },
] as const;

export const STICKY_EXPERT_IMAGES = [
  EXPERT_PANEL[0].image,
  EXPERT_PANEL[1].image,
] as const;
