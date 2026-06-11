export const HOME_01_METADATA = {
  title: "Professional NEET Counseling 2026",
  description:
    "Expert MBBS admission guidance for NEET 2026. Data-driven counseling for ACPUGMEC, RUHS, DMAT, and CET Cell.",
};

export const STATE_COVERAGE = [
  {
    code: "GJ",
    authority: "ACPUGMEC",
    seats: "6,400+",
    colleges: "38+ Medical Colleges",
    borderClass: "border-primary",
    codeClass: "text-primary",
    badgeClass: "bg-primary-container/10 text-primary",
  },
  {
    code: "RJ",
    authority: "RUHS",
    seats: "4,850+",
    colleges: "32+ Medical Colleges",
    borderClass: "border-secondary",
    codeClass: "text-secondary",
    badgeClass: "bg-secondary-container/10 text-secondary",
  },
  {
    code: "MP",
    authority: "DMAT",
    seats: "4,200+",
    colleges: "26+ Medical Colleges",
    borderClass: "border-tertiary",
    codeClass: "text-tertiary",
    badgeClass: "bg-tertiary-container/10 text-tertiary",
  },
  {
    code: "MH",
    authority: "CET Cell",
    seats: "9,800+",
    colleges: "62+ Medical Colleges",
    borderClass: "border-surface-tint",
    codeClass: "text-surface-tint",
    badgeClass: "bg-surface-container-high text-surface-tint",
  },
] as const;

export const PROBLEM_CARDS = [
  {
    icon: "warning",
    title: "Information Overload",
    body: "Conflicting data from hundreds of PDFs makes it impossible to compare college bonds, stipends, and real-time cutoff trends.",
  },
  {
    icon: "edit_off",
    title: "Wrong Choice Filling",
    body: "A single mistake in your preference list order can land you in a college with higher fees or unfavorable rural service bonds.",
  },
  {
    icon: "event_busy",
    title: "Missing Deadlines",
    body: "Round-specific registration windows and document verification dates vary by state. Missing one means losing your seat eligibility.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: "1",
    title: "Enter Your Score",
    body: "We start with your actual NEET marks and specific category data.",
  },
  {
    step: "2",
    title: "Understand Options",
    body: "Get a data-backed list of possible colleges based on 5 years of cutoffs.",
  },
  {
    step: "3",
    title: "Build Choice List",
    body: "Experts help you rank colleges to maximize clinical exposure and budget.",
  },
  {
    step: "4",
    title: "Round Guidance",
    body: "Real-time alerts for upgrades and seat allotments until the final round.",
  },
] as const;

export const FREE_TOOLS = [
  {
    icon: "analytics",
    title: "Cutoff Analyser",
    body: "Deep dive into category-wise closing ranks for previous rounds.",
    href: "/cutoff-analyser",
  },
  {
    icon: "school",
    title: "College Predictor",
    body: "Get a personalized list of likely MBBS seats for your rank.",
    href: "/college-predictor",
  },
  {
    icon: "bar_chart_4_bars",
    title: "Rank Predictor",
    body: "Translate your expected score into a projected All India Rank.",
    href: "/rank-predictor",
  },
  {
    icon: "calendar_month",
    title: "Round Tracker",
    body: "Stay updated on registration, merit lists, and result dates.",
    href: "/cutoff-analyser",
  },
] as const;

export const STATE_HUBS = [
  {
    code: "GJ",
    codeClass: "text-primary",
    title: "Gujarat Counseling",
    authority: "ACPUGMEC Authority",
    stats: [
      { value: "6,400+", label: "MBBS Seats" },
      { value: "2,100 Gov", label: "Govt/SFI Split" },
      { value: "₹25K - ₹18L", label: "Fee Range (Annual)" },
      { value: "1 Year", label: "Rural Bond" },
    ],
    ctaLabel: "Download GJ PDF Guide",
    ctaClass: "border-primary text-primary hover:bg-primary/5",
    href: "/mbbs-in-india/gujarat",
  },
  {
    code: "MH",
    codeClass: "text-surface-tint",
    title: "Maharashtra Counseling",
    authority: "State CET Cell",
    stats: [
      { value: "9,800+", label: "MBBS Seats" },
      { value: "4,800 Gov", label: "Govt/Private Split" },
      { value: "₹1.2L - ₹24L", label: "Fee Range (Annual)" },
      { value: "1 Year + ₹10L", label: "Bond Penalty" },
    ],
    ctaLabel: "Download MH PDF Guide",
    ctaClass: "border-surface-tint text-surface-tint hover:bg-surface-tint/5",
    href: "/mbbs-in-india/maharashtra",
  },
] as const;

export const PRICING_PLANS = [
  {
    name: "Starter Plan",
    subtitle: "Self-service digital toolkit",
    price: "₹2,499",
    period: "/session",
    featured: false,
    features: [
      "State Cutoff PDFs",
      "College Comparison Tool",
      "Choice Filling Demo Video",
    ],
    cta: "Select Plan",
    primary: false,
  },
  {
    name: "Expert Guidance",
    subtitle: "End-to-end 1:1 counseling",
    price: "₹14,999",
    period: "/full year",
    featured: true,
    features: [
      "Personal Choice Filling",
      "24/7 WhatsApp Support",
      "Documentation Assistance",
      "Refund Support",
    ],
    cta: "Enroll Now",
    primary: true,
  },
  {
    name: "Premium Concierge",
    subtitle: "For Management/NRI Quota",
    price: "₹34,999",
    period: "/full year",
    featured: false,
    features: [
      "Multi-State Strategy",
      "Deemed University Focus",
      "Offline Document Prep",
    ],
    cta: "Contact Sales",
    primary: false,
  },
] as const;

export const CREDIBILITY_STATS = [
  { value: "12,500+", label: "Students Counseled" },
  { value: "99.4%", label: "Success Rate" },
  { value: "18", label: "Years of Experience" },
  { value: "100%", label: "Privacy Guaranteed" },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "I was confused between MP and GJ colleges. MedSeat's data on bond service and clinical load helped me pick the right institute in Round 2. Highly recommended!",
    name: "Riya Sharma",
    detail: "BJMC Ahmedabad, 2025 Batch",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDh7St9hGr-yG6Rric99GE6Ot-yHflgvNZvJupIvYfX9GaTszc8Kd72vBz0r-Z9wsU2Dds_OVwjNiJlGvSCaPRPVJ7ivbcQvvUQ1sruZAWaszEh5VrwXq_2tmO-VxpaGWDNm92XyEeBZ6gBgXuyDHD3FsBqAL6PEAuw7rQHG6R0p_uRvSRkzlcwwLhYWi6i12CcdazFf5dqvgdAir3b283gKIb3ZT6i_irz5x_iYcKfuxxpANC3tEDf8M9iWJ4iqKdPUMucHxWE9PI",
  },
  {
    quote:
      "They saved me from paying management quota fees. Their expert suggested a state where I got a semi-govt seat based on my category rank. Pure transparency.",
    name: "Aditya Verma",
    detail: "KEM Hospital Mumbai, 2025 Batch",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDePlSqjzVvDUFJcmXSQ5K4aAxjzZduJf9BeBNGFdOmDxQ6gAxtPqALz6_wgUJTttuQbrfBePsIxHwhiShxIs2MiKRWkv3EQth0np9EB2JeN4H72kJK_ezHv7X8sR8SrNgI-9DOGADMU1QMGvqihCCA6_5hmy5lXBcCnak5dm3zyh9upsFMXSV2NgWBuHSL-7LShqWSAWo1s5TGreORja4EouF3W2xdVnlAnlKNVVFtDNDxBx3V2HLvBIvoM9LsHdV7OtViUyBzf6w",
  },
  {
    quote:
      "The documentation part was so smooth. I didn't have to worry about missing deadlines because my counselor sent me personal reminders for every step.",
    name: "Sneha Patil",
    detail: "SMS Medical College, Jaipur",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ6b4pf0cWllKN9RFU2zIlPpDSod5gOyGpyWH1JQNQPYWPhBxrqPmdcsptxOv__0Q4ft-an1RPyA6slSRbdhg6e3pL3KEl46C4kqKN1WY4YyROkx8PPkCq9Gp98xANUiUo789wXjS0VtkwKA1wRhclpyuRsIr_MTwEvz1eBU9-WBpUg3ES3afmul4hQFcA6_4SjL7-JR9E4pPatMx1mGNRb5nj2Zv5mp3TdRbmDeR9Dd5oEFo9zSst96ZftwHP-xyCvVLrPz0APRc",
  },
] as const;

export const COMPARISON_ROWS = [
  {
    feature: "College Selection",
    alone: "Based on hearsay or 1yr old data",
    expert: "5-year trend analysis + Clinical data",
  },
  {
    feature: "Choice Filling",
    alone: "High risk of sequence errors",
    expert: "Expert-verified preference list",
  },
  {
    feature: "Bond & Fee Clarity",
    alone: "Often discovered after allotment",
    expert: "Full financial roadmap provided upfront",
  },
  {
    feature: "Deadlines",
    alone: "Easy to miss in multi-state rounds",
    expert: "Personalised WhatsApp deadline alerts",
  },
] as const;

export const NEWS_ITEMS = [
  {
    tag: "Authority News",
    title: "ACPUGMEC likely to announce Merit List dates early",
    excerpt:
      "Stay tuned for the official notification regarding Gujarat State Quota registration window for 2026.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ_Oda_FPPT6uqheo9eypE6BAInN2ny_Adt9aEjS4N3pfJI4xCg-PQExcsfN-ToSvPuV_JxOVGvf0Uzlkf0ZCk8mItYbhDPAP7-6dqP8MfJ8U6ZIv998GSrN7vnuuMMLpUcq9eelC1s7o57UZa64BhySQ8iRvRXsCWkAiyWmj6NYQ5DqHRa1tu8C_u91fgLirqT1CVdMI0rFqSd7G9tSE-H71YBJd1RvE6FMrkTZnEvrSw-Glf-wdGgn-6AAf1j4XY2KeZtNjGIIc",
  },
  {
    tag: "Fee Updates",
    title: "Fee structure revised for MP Private Medical Colleges",
    excerpt:
      "Five private colleges in Madhya Pradesh have updated their annual tuition fee and hostel charges.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuArqo2q0BVFa-uvhfvAJC5ZX_IjNkVZ3scY4m55CCGbmfSiMWAqpAKbABxQl7PYezCXsT5bCSsUsdK2Y_XqEsbGlRM7ntV_l2i_sVVLEppknlimh9G71ent8k3oWE0w3rrDzqyKlbjC_4JfuGcgBPcB4bh1lHsfrsFGl4J_O_PV2DO1ctVyYsuOYapcTeAiNSGgrxgWuATKPzRUHB7k7xGPFEd9DzXLO_fbAvF7OvX-kjLxrEaTWNodb_QIqQRyTC23WgCB6AohHzs",
  },
  {
    tag: "Bond Policy",
    title: "Maharashtra Bond policy: What changed for 2026?",
    excerpt:
      "New updates on rural service duration and penalty amounts for state quota candidates.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdiuosIkFqW6ZZ-tbWFsOG9aP_ZLPuwUtEDsTt7fwh3pliqvBT6jmn_BQZsbuMaUJ6SGdTz6w_uk206yZnj7H49gsoqE8Ni2dXu5zeadVin3tzzsI7rsD5oGytyVYf39ENTjV1zy7Tfmu3XQSocOAmeD2A9WAqCC3m0ZqszPkE0wc9-1b5opolIQjLMZyHEuoVbV1YyIralpKB_1GyKgqjy-D7BT9qoi8xaEMBwD3RblY0_xr6vg_NEG2R9SkVGVGGije4Tjqtbu8",
  },
] as const;

export const HOME_01_FAQ = [
  {
    question: "When does NEET 2026 counseling start?",
    answer:
      "Typically, counseling starts 3-4 weeks after the NEET results are declared. For 2026, we expect registrations for All India Quota (MCC) to open by July, followed by state registrations.",
  },
  {
    question: "Can I apply for multiple states at once?",
    answer:
      "Yes, you can apply for your home state (85% quota) and other states' private college quotas (Open seats). However, managing multiple portals and schedules is tricky—that's where our expert plan helps.",
  },
  {
    question: "What is the difference between MCC and State Counseling?",
    answer:
      "MCC handles 15% All India Quota, Central Universities, and Deemed Universities. State authorities (like ACPUGMEC for GJ) handle the remaining 85% seats in government and local private colleges.",
  },
  {
    question: "Is there a refund if I don't get a seat?",
    answer:
      "While counseling fees are non-refundable, our Expert Plan ensures you maximize your options. We provide continuous support until the very last stray vacancy round.",
  },
] as const;
