import type {
  FocusStateSlug,
  MbbsStateConfig,
} from "../types";
import { GUJARAT_CONTENT_EXTENSIONS } from "./gujarat-extensions";

const GUJARAT_TOTAL = 7525;
const GUJARAT_AIQ = Math.round(GUJARAT_TOTAL * 0.15);
const RAJASTHAN_TOTAL = 7330;
const RAJASTHAN_AIQ = Math.round(RAJASTHAN_TOTAL * 0.15);
const MP_TOTAL = 5725;
const MP_AIQ = Math.round(MP_TOTAL * 0.15);
const MH_TOTAL = 12824;
const MH_AIQ = Math.round(MH_TOTAL * 0.15);

export const GUJARAT_MBBS_CONFIG: MbbsStateConfig = {
  slug: "gujarat",
  name: "Gujarat",
  code: "GJ",
  capital: "Gandhinagar",
  counselingAuthority:
    "Admission Committee for Professional Undergraduate Medical Educational Courses (ACPUGMEC)",
  counselingAuthorityShort: "ACPUGMEC",
  counselingPortal: "medadmgujarat.org",
  counselingPortalUrl: "https://medadmgujarat.org",
  universityNote:
    "Government colleges are affiliated to Gujarat University, B.J. Medical College network, or constituent GMERS institutions; private colleges hold affiliations with state universities and deemed universities.",
  stats: {
    totalColleges: 41,
    totalSeats: GUJARAT_TOTAL,
    govtColleges: 18,
    govtSeats: 3950,
    pvtColleges: 23,
    pvtSeats: 3575,
    aiqSeats: GUJARAT_AIQ,
    stateQuotaSeats: GUJARAT_TOTAL - GUJARAT_AIQ,
    govtFeeAnnual: "₹25,000 – ₹35,000",
    mgmtFeeCap: "₹9.5 – ₹17 lakh (regulated cap per NMC fee committee)",
    bondNote: "₹10 lakh bond + compulsory rural service for most government seats",
    domicileRequired: "Yes — 85% state quota seats require Gujarat domicile",
  },
  overview: [
    "For the 2026–27 admission cycle, MBBS admissions in Gujarat are coordinated by ACPUGMEC (Admission Committee for Professional Undergraduate Medical Educational Courses) on medadmgujarat.org, under the Gujarat Professional Educational Medical Colleges (Regulation of Admission and Fixation of Fees) Act, 2007. The state combines long-standing teaching hospitals in Ahmedabad, Rajkot, and Surat with GMERS district medical colleges and NMC-recognized private institutes. Dravio’s catalog currently lists 48 medical colleges and 7,975 MBBS seats for Gujarat—enough capacity to make the state a practical option for western India domicile students who plan counseling carefully.",
    "Roughly 4,425 seats sit in government and GMERS colleges and about 3,550 in private institutions, so the public sector still carries most in-state capacity. Annual tuition on government and GMERS routes typically stays in the ₹25,000–₹35,000 range—among the lowest in India for domicile students—while private government-quota, management, and NRI tracks are regulated but substantially costlier. Most government allotments continue to carry a service bond (commonly ₹10 lakh surety with rural or district service); treat the current ACPUGMEC information brochure as the final word for the 2026–27 batch.",
    "Competition is uneven by city and college tier. Ahmedabad, Gandhinagar, and legacy campuses such as B.J. Medical College historically see the tightest state-quota General closing ranks; many newer GMERS colleges offer a similar low-fee path at softer cutoffs with the same bond framework. Private colleges remain the main fallback when government merit lists are out of reach, with separate merit lists for government-quota, management, and NRI seats published after each counseling round.",
    "NEET-UG 2026 (conducted by NTA) is mandatory for every seat type. Gujarat’s 85% state quota—including government seats and regulated private government-quota seats—requires Gujarat domicile and state-valid category certificates where reservation applies (SC, ST, SEBC/OBC, EWS, and PwD per the active roster). The 15% All India Quota in Gujarat colleges is counseled separately by MCC on mcc.nic.in. Candidates without Gujarat domicile cannot enter state quota but may still target AIQ seats or eligible private management/NRI quotas subject to college prospectus rules and fees.",
    "Practical planning for 2026–27 means tracking notifications on medadmgujarat.org and MCC after the NEET result, registering and locking choices on time, and using upgradation rounds without missing fee or reporting deadlines. Compare Gujarat with neighbouring states on three levers: whether your NEET rank can reach government cutoffs in your category, total five-year cost including hostel and bond risk, and domicile eligibility. Use our college list and cutoff tools on this page for catalog-backed numbers; always verify allotments and fees on the official portals before admission.",
  ],
  contentExtensions: GUJARAT_CONTENT_EXTENSIONS,
  domicile: {
    rules: [
      "Candidate must be a bonafide resident of Gujarat as defined by ACPUGMEC domicile circulars for the admission year.",
      "Domicile is generally granted if the candidate has studied Class 10 and 12 from a recognized school in Gujarat for a minimum continuous period (typically three years) immediately preceding the qualifying exam.",
      "Alternatively, domicile may be claimed if either parent holds a valid Gujarat domicile certificate issued by the competent revenue authority.",
      "Candidates born in Gujarat to parents domiciled in the state at the time of birth may qualify under birth-based domicile provisions when supported by municipal birth records.",
      "Candidates who passed 10+2 from outside Gujarat but whose parents are state government employees posted outside the state may claim domicile with service certificates.",
      "Domicile is mandatory for state-quota government and private government-quota seats; AIQ and most management/NRI seats follow separate rules.",
    ],
    documents: [
      "Gujarat domicile certificate from Mamlatdar / competent revenue officer (not older than prescribed validity)",
      "School leaving certificate (LC) of Class 10 and 12 showing study in Gujarat",
      "Bonafide study certificate from school principal for the qualifying years",
      "NEET-UG scorecard and admit card",
      "Parent domicile certificate (if domicile claimed through parent)",
      "Birth certificate (if domicile claimed through birth in Gujarat)",
    ],
    nonDomicile:
      "Non-domicile candidates cannot participate in Gujarat’s 85% state quota counseling. They may compete for 15% AIQ seats via MCC in Gujarat colleges and for management quota or NRI quota seats in private medical colleges where college prospectus permits all-India candidates, paying applicable fees and meeting NRI documentation if applicable.",
    reservation:
      "Horizontal reservations apply for SC (7%), ST (15%), SEBC/OBC (27%), EWS (10%), and PwD as per state roster. Physically handicapped and female candidate provisions follow current ACPUGMEC notification. Category certificates must be issued by Gujarat authorities for state quota.",
    bond:
      "Most government MBBS seats carry a service bond of ₹10 lakh (amount revised per annual notification) with compulsory rural or district hospital service for one to three years depending on seat type. Failure to complete service triggers bond penalty recovery plus interest as per state rules.",
  },
  counselingSteps: [
    "Register on NEET-UG and obtain a valid scorecard from NTA.",
    "Complete MCC registration if targeting All India Quota (15%) in Gujarat colleges.",
    "Register on medadmgujarat.org for state quota counseling within the published window.",
    "Pay ACPUGMEC registration fee and upload scanned documents (domicile, marksheets, category certificate).",
    "Fill online choice form: select government, private government-quota, management, or NRI options as eligible.",
    "Lock choices before the deadline; unlocked forms are not considered for the round.",
    "Participate in seat allotment round; download provisional allotment letter if allotted.",
    "Report to allotted college with originals for document verification and fee payment.",
    "Complete admission at college; obtain admission letter and trigger MCC/state seat matrix update.",
    "If not satisfied, opt for upgradation in subsequent rounds per counseling policy (freeze/float rules apply).",
  ],
  counselingRules: [
    "Choice locking is mandatory each round; editing after lock time is not permitted.",
    "Upgradation from government to government is allowed in later rounds until final freeze, subject to vacancy.",
    "Management and NRI allotments require separate fee deposition timelines; defaulting cancels the seat and may invoke penalties.",
  ],
  fees: {
    govt:
      "Government and GMERS seats: approximately ₹25,000–₹35,000 per year tuition plus nominal university and exam fees. Hostel charges are additional at ₹15,000–₹40,000 per year depending on campus.",
    private:
      "Private college government-quota seats follow state fee committee caps (often ₹3–₹5 lakh per year). Management quota fees range roughly ₹9.5–₹17 lakh per year as per college and NMC approval for 2025–26.",
    nri:
      "NRI quota annual tuition typically ₹25–₹40 lakh (USD-equivalent schedules published per college). One-time development or caution deposits may apply in addition to tuition.",
    hostel:
      "Hostel, mess, and transport: ₹1.2–₹2.5 lakh per year in private campuses; ₹30,000–₹80,000 in most government hostels.",
    bondPenalty:
      "Bond breach on government seats: recovery of ₹10 lakh (or notified amount) plus interest; debarment from state registration until resolved.",
    comparison: [
      { label: "5-year govt MBBS (tuition only)", total: "₹1.25 – ₹1.75 lakh" },
      { label: "5-year private MBBS (mgmt, mid-range)", total: "₹50 – ₹75 lakh" },
      { label: "5-year NRI track (typical)", total: "₹1.25 – ₹2 crore" },
    ],
  },
  seatDistribution: {
    analysis:
      "Ahmedabad and Gandhinagar together account for nearly one-third of government MBBS capacity, drawing the tightest cutoffs. Rajkot, Surat, and Vadodara anchor regional hubs with a mix of government and private seats. Rural GMERS colleges offer relatively softer state-quota cutoffs but the same bond conditions.",
    byCity: [
      { city: "Ahmedabad", colleges: 8, seats: 1420 },
      { city: "Rajkot", colleges: 5, seats: 780 },
      { city: "Surat", colleges: 4, seats: 650 },
      { city: "Vadodara", colleges: 4, seats: 620 },
      { city: "Gandhinagar", colleges: 3, seats: 540 },
    ],
    growth: [
      { year: 2020, seats: 6180 },
      { year: 2021, seats: 6420 },
      { year: 2022, seats: 6785 },
      { year: 2023, seats: 7010 },
      { year: 2024, seats: 7280 },
      { year: 2025, seats: 7525 },
    ],
    vsNational:
      "Gujarat’s ~7,525 seats represent about 5.8% of India’s MBBS capacity but roughly 4.2% of NEET applicants when mapped by domicile—slightly favorable versus Uttar Pradesh or Bihar, though government seat odds remain below 5% for General category open merit.",
  },
  vsOtherStates: [
    "Government fees are lower than Maharashtra and Karnataka while bond amounts are comparable to Rajasthan.",
    "Private seat volume is smaller than Maharashtra but fee caps are more tightly regulated than many southern states.",
    "Domicile enforcement on state quota is stricter than AIQ-heavy options in Delhi or central institutes.",
    "Cutoffs for top government colleges are tighter than MP but somewhat softer than Mumbai’s grant medical colleges for state domicile.",
  ],
  vsRecommendation:
    "Choose Gujarat if you hold domicile, want affordable government MBBS, and accept rural service bonds; consider AIQ or other states if you are non-domicile and rank outside top 8,000 AIR.",
  chances: {
    neetApplicantsState: "~1.05 lakh Gujarat domicile NEET applicants (2025 estimate)",
    stateQuotaGovtSeats: 3358,
    stats: [
      { label: "State quota govt seats", value: "3,358" },
      { label: "Approx. govt seat odds (domicile)", value: "3.2%" },
      { label: "General merit band (state govt)", value: "AIR 2,000 – 12,000" },
      { label: "Mgmt quota entry (indicative)", value: "AIR 80,000 – 3,50,000" },
    ],
    options: [
      {
        title: "AIR under 3,000",
        body: "Realistic shot at B.J. Medical College or top GMERS via state quota; also competitive for AIQ in premier colleges nationwide.",
      },
      {
        title: "AIR 3,000 – 8,000",
        body: "Strong for tier-2 government colleges (Rajkot, Surat, Jamnagar) and some private government-quota seats.",
      },
      {
        title: "AIR 8,000 – 25,000",
        body: "Target newer GMERS campuses and private government-quota; avoid pinning hopes on Ahmedabad government alone.",
      },
      {
        title: "AIR 25,000 – 1,00,000",
        body: "Management quota in private colleges becomes viable; compare fee caps and hospital attach rates before locking choices.",
      },
      {
        title: "Non-domicile",
        body: "Focus on MCC AIQ (~1,129 seats in Gujarat) or management/NRI in private institutes; state quota is not available.",
      },
    ],
  },
  documents: {
    academic: [
      "NEET-UG 2025 scorecard",
      "Class 10 mark sheet and passing certificate",
      "Class 12 mark sheet and passing certificate",
      "Migration certificate (if applicable)",
    ],
    identity: [
      "Aadhaar card",
      "Domicile certificate (Gujarat)",
      "Birth certificate (if domicile via birth)",
      "Parent ID proof (if domicile via parent)",
    ],
    category: [
      "Caste/category certificate (Gujarat issued)",
      "Non-creamy layer certificate for OBC/SEBC",
      "EWS certificate from competent authority",
      "PwD certificate from designated medical board",
    ],
    photos:
      "Recent passport photographs (white background), signature scan, and left-thumb impression as per ACPUGMEC upload specifications.",
    nri: [
      "Passport of candidate or sponsoring NRI relative",
      "NRI status proof (visa, residence, or tax documents)",
      "Affidavit of sponsorship and relationship proof",
      "Overseas address proof",
    ],
    stateSpecific: [
      "Bonafide study certificate from Gujarat school",
      "School leaving certificate showing years in state",
      "Bond undertaking format (government seats)",
      "Gap period affidavit (if applicable)",
      "Income certificate for fee concession if applicable",
    ],
  },
  topGovtColleges: [
    {
      name: "B.J. Medical College",
      city: "Ahmedabad",
      established: 1946,
      seats: 250,
      aiqSeats: 38,
      closingRankGeneral: 2246,
      university: "Gujarat University",
      beds: 2200,
      feePerYear: "₹25,000",
      bond: "₹10L + rural service",
      slug: "bj-medical-ahmedabad",
      hasPg: true,
    },
    {
      name: "GMERS Medical College",
      city: "Gandhinagar",
      established: 2011,
      seats: 150,
      aiqSeats: 23,
      closingRankGeneral: 31776,
      university: "Gujarat University",
      beds: 750,
      feePerYear: "₹28,000",
      bond: "₹10L + rural service",
      slug: "gmers-gandhinagar",
      hasPg: true,
    },
    {
      name: "M.P. Shah Government Medical College",
      city: "Jamnagar",
      established: 1955,
      seats: 200,
      aiqSeats: 30,
      closingRankGeneral: 18500,
      university: "Saurashtra University",
      beds: 1200,
      feePerYear: "₹25,000",
      bond: "₹10L + rural service",
      hasPg: true,
    },
    {
      name: "P.D.U. Government Medical College",
      city: "Rajkot",
      established: 1995,
      seats: 200,
      aiqSeats: 30,
      closingRankGeneral: 14200,
      university: "Saurashtra University",
      beds: 1100,
      feePerYear: "₹26,000",
      bond: "₹10L + rural service",
      hasPg: true,
    },
    {
      name: "Government Medical College",
      city: "Surat",
      established: 1967,
      seats: 250,
      aiqSeats: 38,
      closingRankGeneral: 16800,
      university: "Veer Narmad South Gujarat University",
      beds: 1300,
      feePerYear: "₹27,000",
      bond: "₹10L + rural service",
      hasPg: true,
    },
    {
      name: "ESIC Medical College",
      city: "Ahmedabad",
      established: 2013,
      seats: 100,
      aiqSeats: 15,
      closingRankGeneral: 28021,
      university: "Gujarat University",
      beds: 500,
      feePerYear: "₹30,000",
      hasPg: false,
    },
  ],
  aiqCutoffs: [
    {
      category: "General",
      aiqOpen2025: 283,
      aiqClose2025: 12500,
      stateOpen2025: 2246,
      stateClose2025: 127039,
    },
    {
      category: "OBC",
      aiqOpen2025: 800,
      aiqClose2025: 14800,
      stateOpen2025: 4034,
      stateClose2025: 135010,
    },
    {
      category: "SC",
      aiqOpen2025: 8216,
      aiqClose2025: 89000,
      stateOpen2025: 150431,
      stateClose2025: 180731,
    },
    {
      category: "ST",
      aiqOpen2025: 22589,
      aiqClose2025: 105000,
      stateOpen2025: 226878,
      stateClose2025: 548849,
    },
    {
      category: "EWS",
      aiqOpen2025: 4216,
      aiqClose2025: 14200,
      stateOpen2025: 61734,
      stateClose2025: 156439,
    },
  ],
  mgmtCutoffNote:
    "Management quota cutoffs are published per college on medadmgujarat.org after each round; they are typically far higher (weaker rank) than government quota but require full management fee payment at admission.",
  cutoffTrends: [
    { college: "B.J. Medical College, Ahmedabad", year: 2023, generalClose: 1980, obcClose: 3650 },
    { college: "B.J. Medical College, Ahmedabad", year: 2024, generalClose: 2110, obcClose: 3820 },
    { college: "B.J. Medical College, Ahmedabad", year: 2025, generalClose: 2246, obcClose: 4034 },
    { college: "GMERS Gandhinagar", year: 2023, generalClose: 28500, obcClose: 35200 },
    { college: "GMERS Gandhinagar", year: 2024, generalClose: 30100, obcClose: 36800 },
    { college: "GMERS Gandhinagar", year: 2025, generalClose: 31776, obcClose: 37338 },
    { college: "Government Medical College, Surat", year: 2023, generalClose: 15200, obcClose: 22100 },
    { college: "Government Medical College, Surat", year: 2024, generalClose: 16050, obcClose: 23400 },
    { college: "Government Medical College, Surat", year: 2025, generalClose: 16800, obcClose: 24100 },
  ],
  timeline: [
    { date: "2025-08-01", label: "NEET-UG 2025 result declared", track: "neet" },
    { date: "2025-08-05", label: "MCC AIQ registration opens", track: "mcc" },
    { date: "2025-08-12", label: "ACPUGMEC state registration opens", track: "state" },
    { date: "2025-08-18", label: "Document upload window for Gujarat state quota", track: "state" },
    { date: "2025-08-22", label: "MCC round 1 choice filling", track: "mcc" },
    { date: "2025-08-28", label: "Gujarat state choice filling round 1", track: "state" },
    { date: "2025-09-02", label: "MCC round 1 seat allotment", track: "mcc" },
    { date: "2025-09-06", label: "ACPUGMEC round 1 allotment published", track: "state" },
    { date: "2025-09-10", label: "Reporting to allotted colleges (round 1)", track: "state" },
    { date: "2025-09-15", label: "MCC round 2 registration", track: "mcc" },
    { date: "2025-09-20", label: "Gujarat upgradation round choice filling", track: "state" },
    { date: "2025-09-28", label: "Mop-up / stray vacancy round (state)", track: "state" },
    { date: "2025-10-05", label: "Final admission list frozen on portal", track: "state" },
  ],
  faq: [
    {
      question: "Who conducts MBBS counseling in Gujarat?",
      answer:
        "ACPUGMEC conducts state quota counseling through medadmgujarat.org. All India Quota is handled separately by MCC on mcc.nic.in.",
    },
    {
      question: "Is Gujarat domicile mandatory for government seats?",
      answer:
        "Yes for 85% state quota government seats. AIQ 15% and eligible management/NRI seats follow separate domicile rules.",
    },
    {
      question: "What is the government MBBS fee in Gujarat?",
      answer:
        "Tuition is roughly ₹25,000–₹35,000 per year at government and GMERS colleges, plus hostel and miscellaneous charges.",
    },
    {
      question: "What bond applies to government MBBS in Gujarat?",
      answer:
        "A ₹10 lakh service bond (per current notification) with compulsory rural or district hospital service applies to most government seats.",
    },
    {
      question: "Can other-state students get Gujarat state quota?",
      answer:
        "No. Non-domicile candidates must use AIQ or private management/NRI quotas where permitted.",
    },
    {
      question: "How many MBBS seats are in Gujarat for 2026–27?",
      answer:
        "Dravio’s catalog lists 48 medical colleges and 7,975 MBBS seats for Gujarat, with about 4,425 government/GMERS seats and 3,550 private seats. Confirm final matrix numbers on medadmgujarat.org when ACPUGMEC publishes the admission year notification.",
    },
    {
      question: "What rank is needed for B.J. Medical College?",
      answer:
        "State-quota General closing ranks are often near AIR 2,000–2,500 for the main campus; AIQ closes higher (weaker rank numerically).",
    },
    {
      question: "Are private college fees capped in Gujarat?",
      answer:
        "Yes. State fee fixation committee publishes annual caps for government-quota and management seats in private colleges.",
    },
    {
      question: "Is there a separate NRI quota?",
      answer:
        "Yes. Participating private colleges offer NRI quota with distinct fee schedules and document requirements.",
    },
    {
      question: "Can I participate in both MCC and Gujarat counseling?",
      answer:
        "Yes, but you must follow seat retention rules; accepting a seat in one system may restrict participation in the other per current policy.",
    },
    {
      question: "What reservation percentages apply in Gujarat?",
      answer:
        "State roster includes SC, ST, SEBC/OBC, EWS, and PwD horizontal reservations as per the active ACPUGMEC prospectus.",
    },
    {
      question: "When does Gujarat MBBS counseling usually start?",
      answer:
        "Typically mid-August after NEET results, with multiple rounds through September and mop-up in early October.",
    },
  ],
  notableColleges: [
    "B.J. Medical College, Ahmedabad",
    "Pramukhswami Medical College, Anand",
    "N.H.L. Municipal Medical College, Ahmedabad",
  ],
};

export const RAJASTHAN_MBBS_CONFIG: MbbsStateConfig = {
  slug: "rajasthan",
  name: "Rajasthan",
  code: "RJ",
  capital: "Jaipur",
  counselingAuthority:
    "Rajasthan University of Health Sciences (RUHS) — Medical & Dental Admission Board",
  counselingAuthorityShort: "RUHS",
  counselingPortal: "ruhsraj.org",
  counselingPortalUrl: "https://www.ruhsraj.org",
  universityNote:
    "Government colleges are affiliated to RUHS or autonomous state medical universities; private colleges hold RUHS or university affiliations with separate management fee schedules.",
  stats: {
    totalColleges: 43,
    totalSeats: RAJASTHAN_TOTAL,
    govtColleges: 26,
    govtSeats: 4425,
    pvtColleges: 17,
    pvtSeats: 2905,
    aiqSeats: RAJASTHAN_AIQ,
    stateQuotaSeats: RAJASTHAN_TOTAL - RAJASTHAN_AIQ,
    govtFeeAnnual: "₹35,000 – ₹55,000",
    mgmtFeeCap: "₹12 – ₹22 lakh per year (college-specific NMC approval)",
    bondNote: "Service bond on select government seats; penalty ₹25L on some categories",
    domicileRequired: "Yes — state quota requires Rajasthan domicile",
  },
  overview: [
    "Rajasthan centralizes undergraduate medical admissions under RUHS, counseling more than 7,330 MBBS seats across 43 colleges through ruhsraj.org. The state blends heritage institutions like SMS Medical College in Jaipur with a ring of 2000s-era government medical colleges in Kota, Udaipur, Jodhpur, and Bikaner.",
    "Government capacity is comparatively strong: 26 government colleges contribute about 4,425 seats, giving domicile students more government options than many states of similar NEET applicant volume. Fees remain moderate, though slightly higher than Gujarat’s GMERS tariff.",
    "Cutoffs tighten sharply for Jaipur SMS and JLN Ajmer, while newer district colleges offer softer ranks for reserved categories and General merit alike. Private colleges cluster around Jaipur and Kota, absorbing students who miss government lists but still want in-state campuses.",
    "Domicile is required for the 85% state pool, with certificates issued by Rajasthan revenue authorities. Out-of-state students rely on AIQ (~1,100 seats) or management quotas in private institutes, where fees climb steeply but NEET eligibility alone does not guarantee a seat without financial readiness.",
    "Service bonds apply to subsets of government seats with penalties that can exceed ₹20 lakh if service is not completed, so students should read the annual RUHS prospectus carefully. Compared with MP, Rajasthan offers more government seats per domicile applicant; compared with Maharashtra, private fees are lower but top Jaipur cutoffs remain elite-tier.",
  ],
  domicile: {
    rules: [
      "Candidate must possess Rajasthan domicile for state quota participation as per RUHS admission rules.",
      "Domicile is typically established by three years of continuous study (Classes 10–12) in recognized Rajasthan schools.",
      "Parent domicile certificate from Rajasthan may qualify dependent candidates who studied outside due to transferable jobs.",
      "Candidates who are bonafide residents by birth in Rajasthan may claim domicile with birth and parental residence proof.",
      "State government employees’ children may receive concessions when the employee is on Rajasthan cadre, subject to notification.",
      "Domicile is not required for AIQ counseling through MCC or for management seats where all-India candidates are explicitly allowed.",
    ],
    documents: [
      "Rajasthan domicile certificate from Tehsildar / competent authority",
      "Class 10 and 12 mark sheets and certificates",
      "Bonafide certificate from school principal",
      "NEET-UG scorecard",
      "Parent domicile and service certificate (if applicable)",
      "Birth certificate for birth-based domicile claims",
    ],
    nonDomicile:
      "Non-domicile students cannot claim Rajasthan state quota seats. They may apply through MCC for AIQ seats in Rajasthan colleges and for management quota in private medical colleges per college rules, meeting fee deadlines and documentation.",
    reservation:
      "Vertical reservations include SC (16%), ST (12%), OBC-NCL (21%), MBC, and EWS (10%) per state policy. Sahariya and other special area reservations may apply. PwD horizontal reservation follows RUHS roster.",
    bond:
      "Selected government seats require in-state service bonds with penalties up to ₹25 lakh on notified categories; bond duration and exempt seats are listed in the RUHS information brochure each year.",
  },
  counselingSteps: [
    "Qualify NEET-UG and download scorecard from NTA.",
    "Register on ruhsraj.org within the RUHS counseling schedule.",
    "Pay counseling registration fee and complete profile with academic details.",
    "Upload domicile, category, and identity documents in prescribed formats.",
    "Fill choice preferences for government and private colleges by round.",
    "Lock choices before cutoff time; provisional lists are not honored if unlocked.",
    "Attend seat allotment for the active round on the portal.",
    "Download allotment letter and note reporting dates for the college.",
    "Report physically with originals for verification and admission fee.",
    "Participate in upgradation rounds or resign seat per rules to join a better allotment.",
  ],
  counselingRules: [
    "Seat acceptance requires fee payment within the reporting window or the seat lapses to stray vacancy.",
    "Candidates allotted government seats must execute bond undertakings where applicable before final admission.",
    "Simultaneous seat holding across MCC and RUHS is restricted; follow the latest seat exit guidelines.",
  ],
  fees: {
    govt:
      "Government medical colleges: roughly ₹35,000–₹55,000 annual tuition plus university charges. Hostel fees vary ₹25,000–₹60,000 per year.",
    private:
      "Private government-quota fees are regulated; management quota typically ₹12–₹22 lakh per year depending on college and 2025–26 NMC fee order.",
    nri:
      "NRI quota fees often ₹30–₹45 lakh per year with USD-linked payment schedules in select colleges.",
    hostel:
      "Combined hostel and mess: ₹80,000–₹2 lakh annually in private colleges; ₹40,000–₹90,000 in government hostels.",
    bondPenalty:
      "Bond default penalties up to ₹25 lakh plus interest and possible debarment from state medical registration until clearance.",
    comparison: [
      { label: "5-year govt MBBS (tuition)", total: "₹1.75 – ₹2.75 lakh" },
      { label: "5-year private MBBS (mgmt)", total: "₹60 – ₹1.1 crore" },
      { label: "5-year NRI track", total: "₹1.5 – ₹2.25 crore" },
    ],
  },
  seatDistribution: {
    analysis:
      "Jaipur hosts the largest share of flagship government seats (SMS, ESIC, private institutes). Kota and Udaipur are major student hubs with growing private capacity. Jodhpur and Bikaner provide government options with moderately competitive cutoffs.",
    byCity: [
      { city: "Jaipur", colleges: 12, seats: 2180 },
      { city: "Kota", colleges: 5, seats: 720 },
      { city: "Udaipur", colleges: 4, seats: 580 },
      { city: "Jodhpur", colleges: 4, seats: 540 },
      { city: "Bikaner", colleges: 3, seats: 450 },
    ],
    growth: [
      { year: 2020, seats: 5980 },
      { year: 2021, seats: 6250 },
      { year: 2022, seats: 6580 },
      { year: 2023, seats: 6890 },
      { year: 2024, seats: 7120 },
      { year: 2025, seats: 7330 },
    ],
    vsNational:
      "Rajasthan contributes about 5.7% of national MBBS seats with a higher-than-average government share (~60% of state seats), improving odds for domicile students relative to private-heavy states.",
  },
  vsOtherStates: [
    "More government seats per capita than Gujarat’s private-heavy mix, but Jaipur cutoffs rival top Gujarat colleges.",
    "Bond penalties can exceed Gujarat’s ₹10 lakh on certain Rajasthan government seats.",
    "Private fees are lower than Maharashtra’s metro colleges but similar to MP for management quota.",
    "Domicile rules align with most North Indian states—strict on 85% pool, open AIQ for all India.",
  ],
  vsRecommendation:
    "Rajasthan suits domicile students seeking wide government choice; non-domicile candidates should plan AIQ or compare MP/Maharashtra private value before committing fees.",
  chances: {
    neetApplicantsState: "~1.18 lakh Rajasthan domicile NEET applicants (2025 estimate)",
    stateQuotaGovtSeats: 3761,
    stats: [
      { label: "State quota govt seats", value: "3,761" },
      { label: "Approx. govt seat odds (domicile)", value: "3.2%" },
      { label: "SMS Jaipur General (indicative)", value: "AIR 1,500 – 4,500" },
      { label: "Private govt-quota entry", value: "AIR 40,000 – 2,00,000" },
    ],
    options: [
      {
        title: "AIR under 4,000",
        body: "Competitive for SMS Jaipur, JLN Ajmer, or strong AIQ options; lock government choices early.",
      },
      {
        title: "AIR 4,000 – 15,000",
        body: "Solid for tier-2 government colleges (Kota, Udaipur, Jodhpur) and premium private government-quota.",
      },
      {
        title: "AIR 15,000 – 50,000",
        body: "Target newer government campuses and private government-quota; verify bond exemptions.",
      },
      {
        title: "AIR 50,000 – 2,00,000",
        body: "Management quota becomes realistic; compare Kota/Jaipur private hospitals for clinical exposure.",
      },
      {
        title: "Non-domicile",
        body: "Use MCC AIQ (~1,100 Rajasthan seats) or management seats; state quota is closed.",
      },
    ],
  },
  documents: {
    academic: [
      "NEET-UG 2025 scorecard",
      "Class 10 certificate and mark sheet",
      "Class 12 certificate and mark sheet",
      "Transfer/migration certificate if board changed",
    ],
    identity: [
      "Aadhaar or government photo ID",
      "Rajasthan domicile certificate",
      "Birth certificate (if applicable)",
      "Parent domicile proof",
    ],
    category: [
      "Caste certificate (Rajasthan)",
      "OBC-NCL certificate",
      "EWS certificate",
      "PwD certificate from authorized board",
    ],
    photos:
      "Passport-size photographs and digital signature per RUHS upload guidelines (JPG/PDF size limits on portal).",
    nri: [
      "Passport and visa copies",
      "NRI sponsorship affidavit",
      "Relationship proof with sponsor",
      "Foreign residence or tax documents",
    ],
    stateSpecific: [
      "Bonafide Rajasthan study certificate",
      "Bond undertaking for applicable government seats",
      "Rajasthan medical fitness certificate",
      "Anti-ragging undertaking",
    ],
  },
  topGovtColleges: [
    {
      name: "SMS Medical College",
      city: "Jaipur",
      established: 1947,
      seats: 250,
      aiqSeats: 38,
      closingRankGeneral: 3200,
      university: "RUHS",
      beds: 2500,
      feePerYear: "₹45,000",
      bond: "Service bond on notified seats",
      slug: "sms-medical-jaipur",
      hasPg: true,
    },
    {
      name: "JLN Medical College",
      city: "Ajmer",
      established: 1965,
      seats: 200,
      aiqSeats: 30,
      closingRankGeneral: 5800,
      university: "RUHS",
      beds: 1400,
      feePerYear: "₹40,000",
      bond: "Service bond on notified seats",
      hasPg: true,
    },
    {
      name: "Government Medical College",
      city: "Kota",
      established: 1992,
      seats: 200,
      aiqSeats: 30,
      closingRankGeneral: 12500,
      university: "RUHS",
      beds: 900,
      feePerYear: "₹38,000",
      hasPg: true,
    },
    {
      name: "RNT Medical College",
      city: "Udaipur",
      established: 1961,
      seats: 200,
      aiqSeats: 30,
      closingRankGeneral: 9800,
      university: "RUHS",
      beds: 1200,
      feePerYear: "₹42,000",
      hasPg: true,
    },
    {
      name: "SP Medical College",
      city: "Bikaner",
      established: 1959,
      seats: 200,
      aiqSeats: 30,
      closingRankGeneral: 11200,
      university: "RUHS",
      beds: 1100,
      feePerYear: "₹38,000",
      hasPg: true,
    },
    {
      name: "Government Medical College",
      city: "Jodhpur",
      established: 1965,
      seats: 200,
      aiqSeats: 30,
      closingRankGeneral: 10800,
      university: "RUHS",
      beds: 1000,
      feePerYear: "₹40,000",
      hasPg: true,
    },
  ],
  aiqCutoffs: [
    {
      category: "General",
      aiqOpen2025: 450,
      aiqClose2025: 13200,
      stateOpen2025: 3200,
      stateClose2025: 145000,
    },
    {
      category: "OBC",
      aiqOpen2025: 1200,
      aiqClose2025: 15800,
      stateOpen2025: 6500,
      stateClose2025: 168000,
    },
    {
      category: "SC",
      aiqOpen2025: 9500,
      aiqClose2025: 92000,
      stateOpen2025: 185000,
      stateClose2025: 420000,
    },
    {
      category: "ST",
      aiqOpen2025: 28000,
      aiqClose2025: 112000,
      stateOpen2025: 310000,
      stateClose2025: 580000,
    },
    {
      category: "EWS",
      aiqOpen2025: 5200,
      aiqClose2025: 14800,
      stateOpen2025: 42000,
      stateClose2025: 195000,
    },
  ],
  mgmtCutoffNote:
    "RUHS publishes management quota closing ranks college-wise after each round; ranks are numerically higher than government quota with separate fee confirmation at reporting.",
  cutoffTrends: [
    { college: "SMS Medical College, Jaipur", year: 2023, generalClose: 2900, obcClose: 5200 },
    { college: "SMS Medical College, Jaipur", year: 2024, generalClose: 3050, obcClose: 5400 },
    { college: "SMS Medical College, Jaipur", year: 2025, generalClose: 3200, obcClose: 5650 },
    { college: "JLN Medical College, Ajmer", year: 2023, generalClose: 5400, obcClose: 8200 },
    { college: "JLN Medical College, Ajmer", year: 2024, generalClose: 5600, obcClose: 8500 },
    { college: "JLN Medical College, Ajmer", year: 2025, generalClose: 5800, obcClose: 8800 },
    { college: "Government Medical College, Kota", year: 2023, generalClose: 11800, obcClose: 16500 },
    { college: "Government Medical College, Kota", year: 2024, generalClose: 12150, obcClose: 17200 },
    { college: "Government Medical College, Kota", year: 2025, generalClose: 12500, obcClose: 17800 },
  ],
  timeline: [
    { date: "2025-08-01", label: "NEET-UG 2025 results", track: "neet" },
    { date: "2025-08-06", label: "RUHS online registration opens", track: "state" },
    { date: "2025-08-10", label: "MCC AIQ registration begins", track: "mcc" },
    { date: "2025-08-16", label: "Document verification (online) for RUHS", track: "state" },
    { date: "2025-08-24", label: "Round 1 choice filling on ruhsraj.org", track: "state" },
    { date: "2025-08-27", label: "MCC AIQ round 1 allotment", track: "mcc" },
    { date: "2025-09-01", label: "RUHS round 1 seat allotment", track: "state" },
    { date: "2025-09-05", label: "Reporting at allotted Rajasthan colleges", track: "state" },
    { date: "2025-09-12", label: "Round 2 choice filling", track: "state" },
    { date: "2025-09-18", label: "MCC round 2 allotment", track: "mcc" },
    { date: "2025-09-25", label: "Stray vacancy round", track: "state" },
    { date: "2025-10-02", label: "Final admission status published", track: "state" },
    { date: "2025-10-08", label: "Classes commence (tentative)", track: "state" },
  ],
  faq: [
    {
      question: "Which body conducts Rajasthan MBBS counseling?",
      answer: "RUHS conducts state quota counseling via ruhsraj.org; AIQ is through MCC.",
    },
    {
      question: "How many MBBS seats does Rajasthan have?",
      answer: "About 7,330 seats in 43 colleges for the 2025–26 academic session.",
    },
    {
      question: "Is domicile required for state quota?",
      answer: "Yes. Rajasthan domicile is mandatory for 85% state quota seats.",
    },
    {
      question: "What is the fee at SMS Jaipur?",
      answer: "Government tuition is roughly ₹40,000–₹55,000 per year plus hostel charges.",
    },
    {
      question: "Are bonds mandatory on all government seats?",
      answer: "Bonds apply to notified seats per RUHS brochure; some categories or colleges may be exempt.",
    },
    {
      question: "Can I apply from another state?",
      answer: "Only through AIQ or private management quota where allowed—not state quota.",
    },
    {
      question: "When is choice locking?",
      answer: "Each round has a published lock deadline on ruhsraj.org; late edits are rejected.",
    },
    {
      question: "What reservation applies?",
      answer: "SC, ST, OBC-NCL, EWS, and special area reservations per Rajasthan policy.",
    },
    {
      question: "How competitive is SMS Jaipur?",
      answer: "General state-quota closing ranks are often under AIR 5,000 for the main campus.",
    },
    {
      question: "Is there NRI quota?",
      answer: "Select private colleges offer NRI seats with separate fees and documents.",
    },
    {
      question: "Can I upgrade my seat in round 2?",
      answer: "Yes, if you opt for upgradation and a higher preference becomes vacant.",
    },
    {
      question: "Where are prospectus and cutoffs published?",
      answer: "Official notifications and round-wise cutoffs appear on ruhsraj.org and RUHS notices.",
    },
  ],
  notableColleges: [
    "SMS Medical College, Jaipur",
    "American International Institute of Medical Sciences, Udaipur",
    "Pacific Medical College, Udaipur",
  ],
};

export const MADHYA_PRADESH_MBBS_CONFIG: MbbsStateConfig = {
  slug: "madhya-pradesh",
  name: "Madhya Pradesh",
  code: "MP",
  capital: "Bhopal",
  counselingAuthority:
    "Department of Medical Education (DME), Madhya Pradesh — DMAT counseling cell",
  counselingAuthorityShort: "DME MP / DMAT",
  counselingPortal: "dme.mponline.gov.in",
  counselingPortalUrl: "https://dme.mponline.gov.in",
  universityNote:
    "Colleges are affiliated to Madhya Pradesh Medical Science University (MPMSU) or legacy universities; government and private institutes follow DME counseling schedules.",
  stats: {
    totalColleges: 31,
    totalSeats: MP_TOTAL,
    govtColleges: 14,
    govtSeats: 2790,
    pvtColleges: 17,
    pvtSeats: 2935,
    aiqSeats: MP_AIQ,
    stateQuotaSeats: MP_TOTAL - MP_AIQ,
    govtFeeAnnual: "₹40,000 – ₹80,000",
    mgmtFeeCap: "₹10 – ₹18 lakh per year",
    bondNote: "Rural service bond on government seats; penalty per DME notification",
    domicileRequired: "Yes — MP domicile for 85% state quota",
  },
  overview: [
    "Madhya Pradesh routes NEET-UG admissions through the Department of Medical Education with online counseling on dme.mponline.gov.in, historically branded as DMAT. About 5,725 MBBS seats across 31 colleges split nearly evenly between government and private sectors, giving domicile students a broad private safety net when government cutoffs slip.",
    "Flagship government colleges in Bhopal, Indore, Gwalior, and Jabalpur anchor clinical training with large attached hospitals. Newer government colleges in Chhindwara, Shivpuri, and Datia expanded capacity after 2015, moderating cutoffs outside the four metros.",
    "State-quota General ranks for MGM Indore and Gandhi Medical College Bhopal sit in a competitive but reachable band compared with Maharashtra’s grant colleges. Private colleges in Indore and Bhopal charge management fees that are mid-market nationally, often below Mumbai private tariffs.",
    "MP domicile rules require certificates from state revenue authorities and bonafide schooling proofs for state quota. Non-domicile students compete via AIQ (~859 seats) or management quotas; NRI seats exist in select private campuses with dollar-linked fee tables.",
    "Service bonds apply to government allotments with rural posting requirements. Students weighing MP against Rajasthan should compare government seat totals (Rajasthan higher) against private fee levels (MP often slightly lower management fees outside Indore premium institutes).",
  ],
  domicile: {
    rules: [
      "MP domicile is mandatory for participation in 85% state quota counseling conducted by DME.",
      "Candidates who have studied Class 10 and 12 from recognized schools in MP for the qualifying period may claim domicile.",
      "Domicile through parent is permitted when at least one parent holds a valid MP domicile certificate.",
      "Children of MP state government employees may qualify under special provisions in the annual counseling handbook.",
      "Candidates must not hold simultaneous domicile claims in another state for state quota purposes.",
      "AIQ and permitted management seats follow all-India eligibility unless college prospectus states otherwise.",
    ],
    documents: [
      "Madhya Pradesh domicile certificate",
      "Class 10 and 12 mark sheets and passing certificates",
      "Bonafide study certificate from MP school",
      "NEET-UG scorecard",
      "Category certificate issued in MP (if applicable)",
      "Parent domicile proof when domicile is parental",
    ],
    nonDomicile:
      "Non-domicile candidates are excluded from MP state quota. They should register on MCC for AIQ seats in MP colleges or pursue management quota in private colleges with national eligibility.",
    reservation:
      "Reservations for SC (16%), ST (20%), OBC (14%), EWS (10%), and PwD follow MP roster. Women’s reservation or incentive marks may apply per current DME notification.",
    bond:
      "Government seat allottees typically sign rural service bonds with financial penalties for non-compliance; amounts and service duration are specified in the DME prospectus for the admission year.",
  },
  counselingSteps: [
    "Appear in NEET-UG and retain a valid All India Rank.",
    "Create profile on dme.mponline.gov.in during the counseling registration period.",
    "Pay DMAT counseling fee and enter academic and personal details.",
    "Upload domicile, category, and photograph/signature scans.",
    "Select college and course preferences for the active round.",
    "Lock preferences before the published deadline.",
    "View seat allotment result on the portal.",
    "Download allotment order and note reporting schedule.",
    "Report to college with original documents and fee draft.",
    "Opt for upgradation in subsequent rounds or exit seat as per DME policy.",
  ],
  counselingRules: [
    "Failure to report within the window forfeits the allotment and may attract penalties for repeat counseling.",
    "Government seat candidates must complete bond paperwork at admission.",
    "Seat retention across MCC and DME is governed by latest MoHFW exit rules—read the circular before accepting.",
  ],
  fees: {
    govt:
      "Government colleges: approximately ₹40,000–₹80,000 per year depending on institute, plus nominal lab and university fees.",
    private:
      "Private government-quota and management fees range ₹10–₹18 lakh annually per 2025–26 fee fixation orders.",
    nri:
      "NRI quota: commonly ₹28–₹40 lakh per year in participating private colleges.",
    hostel:
      "Hostel and mess approximately ₹60,000–₹1.8 lakh per year; metro campuses at the higher end.",
    bondPenalty:
      "Bond violation triggers notified penalty amounts and may block degree registration until resolved with DME.",
    comparison: [
      { label: "5-year govt MBBS", total: "₹2 – ₹4 lakh" },
      { label: "5-year private MBBS (mgmt)", total: "₹50 – ₹90 lakh" },
      { label: "5-year NRI track", total: "₹1.4 – ₹2 crore" },
    ],
  },
  seatDistribution: {
    analysis:
      "Indore and Bhopal together hold the majority of high-demand seats. Jabalpur and Gwalior provide strong government alternatives. Smaller cities like Rewa and Sagar offer government seats with relatively softer cutoffs for domicile candidates.",
    byCity: [
      { city: "Indore", colleges: 7, seats: 1280 },
      { city: "Bhopal", colleges: 6, seats: 1100 },
      { city: "Jabalpur", colleges: 4, seats: 620 },
      { city: "Gwalior", colleges: 3, seats: 540 },
      { city: "Rewa", colleges: 2, seats: 380 },
    ],
    growth: [
      { year: 2020, seats: 4620 },
      { year: 2021, seats: 4880 },
      { year: 2022, seats: 5120 },
      { year: 2023, seats: 5380 },
      { year: 2024, seats: 5550 },
      { year: 2025, seats: 5725 },
    ],
    vsNational:
      "MP’s seat growth tracked the national expansion wave but applicant growth from central India keeps government odds near 3% for domicile students—similar to Gujarat and Rajasthan.",
  },
  vsOtherStates: [
    "Balanced govt/private split unlike Rajasthan’s govt-heavy profile.",
    "Fees lower than Maharashtra private colleges; government fees slightly above Gujarat.",
    "Indore cutoffs competitive with Jaipur but below Mumbai grant colleges for General merit.",
    "Counseling portal (mponline) is centralized—fewer parallel university streams than Maharashtra.",
  ],
  vsRecommendation:
    "MP fits domicile students wanting both government shots and affordable private fallbacks; high AIR non-domicile candidates should prioritize AIQ or compare Rajasthan government depth.",
  chances: {
    neetApplicantsState: "~95,000 MP domicile NEET applicants (2025 estimate)",
    stateQuotaGovtSeats: 2372,
    stats: [
      { label: "State quota govt seats", value: "2,372" },
      { label: "Approx. govt seat odds", value: "2.5%" },
      { label: "MGM Indore General band", value: "AIR 5,000 – 12,000" },
      { label: "Mgmt quota (indicative)", value: "AIR 1,00,000 – 4,00,000" },
    ],
    options: [
      {
        title: "AIR under 6,000",
        body: "Target MGM Indore, Gandhi Medical Bhopal, or strong AIQ placements.",
      },
      {
        title: "AIR 6,000 – 20,000",
        body: "Good for tier-2 government colleges and top private government-quota seats.",
      },
      {
        title: "AIR 20,000 – 60,000",
        body: "Consider newer government campuses and private government-quota in Indore/Bhopal.",
      },
      {
        title: "AIR 60,000 – 2,50,000",
        body: "Management quota opens across private colleges—validate NMC recognition and hospital load.",
      },
      {
        title: "Non-domicile",
        body: "Pursue ~859 AIQ seats in MP or management quota; state pool is domicile-only.",
      },
    ],
  },
  documents: {
    academic: [
      "NEET-UG 2025 scorecard",
      "Class 10 and 12 certificates",
      "Mark sheets for qualifying examination",
      "Migration certificate if required",
    ],
    identity: [
      "Aadhaar card",
      "MP domicile certificate",
      "Birth certificate",
      "Parent ID and domicile (if applicable)",
    ],
    category: [
      "MP-issued caste/category certificate",
      "OBC-NCL certificate",
      "EWS certificate",
      "PwD certificate",
    ],
    photos:
      "Digital passport photo and signature per mponline specifications; keep originals for reporting.",
    nri: [
      "Passport copies",
      "NRI sponsorship documents",
      "Relationship affidavit",
      "Foreign address proof",
    ],
    stateSpecific: [
      "Bonafide MP study certificate",
      "DME bond undertaking format",
      "Medical fitness certificate",
      "Anti-ragging affidavit",
    ],
  },
  topGovtColleges: [
    {
      name: "MGM Medical College",
      city: "Indore",
      established: 1948,
      seats: 250,
      aiqSeats: 38,
      closingRankGeneral: 8500,
      university: "MPMSU",
      beds: 2000,
      feePerYear: "₹65,000",
      bond: "Rural service bond",
      slug: "mgm-medical-indore",
      hasPg: true,
    },
    {
      name: "Gandhi Medical College",
      city: "Bhopal",
      established: 1955,
      seats: 250,
      aiqSeats: 38,
      closingRankGeneral: 9200,
      university: "MPMSU",
      beds: 1800,
      feePerYear: "₹60,000",
      bond: "Rural service bond",
      slug: "gandhi-medical-bhopal",
      hasPg: true,
    },
    {
      name: "G.R. Medical College",
      city: "Gwalior",
      established: 1946,
      seats: 200,
      aiqSeats: 30,
      closingRankGeneral: 14500,
      university: "MPMSU",
      beds: 1500,
      feePerYear: "₹55,000",
      hasPg: true,
    },
    {
      name: "NSCB Medical College",
      city: "Jabalpur",
      established: 1955,
      seats: 200,
      aiqSeats: 30,
      closingRankGeneral: 13800,
      university: "MPMSU",
      beds: 1400,
      feePerYear: "₹58,000",
      hasPg: true,
    },
    {
      name: "Shyam Shah Medical College",
      city: "Rewa",
      established: 1963,
      seats: 150,
      aiqSeats: 23,
      closingRankGeneral: 22000,
      university: "MPMSU",
      beds: 900,
      feePerYear: "₹50,000",
      hasPg: true,
    },
    {
      name: "Government Medical College",
      city: "Chhindwara",
      established: 2013,
      seats: 100,
      aiqSeats: 15,
      closingRankGeneral: 28500,
      university: "MPMSU",
      beds: 400,
      feePerYear: "₹45,000",
      hasPg: false,
    },
  ],
  aiqCutoffs: [
    {
      category: "General",
      aiqOpen2025: 600,
      aiqClose2025: 13800,
      stateOpen2025: 8500,
      stateClose2025: 155000,
    },
    {
      category: "OBC",
      aiqOpen2025: 1500,
      aiqClose2025: 16200,
      stateOpen2025: 12000,
      stateClose2025: 175000,
    },
    {
      category: "SC",
      aiqOpen2025: 11000,
      aiqClose2025: 95000,
      stateOpen2025: 195000,
      stateClose2025: 440000,
    },
    {
      category: "ST",
      aiqOpen2025: 32000,
      aiqClose2025: 118000,
      stateOpen2025: 350000,
      stateClose2025: 620000,
    },
    {
      category: "EWS",
      aiqOpen2025: 5800,
      aiqClose2025: 15200,
      stateOpen2025: 48000,
      stateClose2025: 188000,
    },
  ],
  mgmtCutoffNote:
    "DME releases management quota cutoffs after each DMAT round on mponline; closing ranks are weaker than government quota with full management fee payment at joining.",
  cutoffTrends: [
    { college: "MGM Medical College, Indore", year: 2023, generalClose: 7800, obcClose: 11200 },
    { college: "MGM Medical College, Indore", year: 2024, generalClose: 8150, obcClose: 11600 },
    { college: "MGM Medical College, Indore", year: 2025, generalClose: 8500, obcClose: 12000 },
    { college: "Gandhi Medical College, Bhopal", year: 2023, generalClose: 8600, obcClose: 12500 },
    { college: "Gandhi Medical College, Bhopal", year: 2024, generalClose: 8900, obcClose: 12800 },
    { college: "Gandhi Medical College, Bhopal", year: 2025, generalClose: 9200, obcClose: 13200 },
    { college: "NSCB Medical College, Jabalpur", year: 2023, generalClose: 12800, obcClose: 17800 },
    { college: "NSCB Medical College, Jabalpur", year: 2024, generalClose: 13300, obcClose: 18200 },
    { college: "NSCB Medical College, Jabalpur", year: 2025, generalClose: 13800, obcClose: 18600 },
  ],
  timeline: [
    { date: "2025-08-01", label: "NEET-UG 2025 result", track: "neet" },
    { date: "2025-08-07", label: "DMAT registration on mponline", track: "state" },
    { date: "2025-08-11", label: "MCC AIQ registration", track: "mcc" },
    { date: "2025-08-17", label: "MP document upload window closes", track: "state" },
    { date: "2025-08-23", label: "Round 1 preference entry", track: "state" },
    { date: "2025-08-29", label: "MCC round 1 allotment", track: "mcc" },
    { date: "2025-09-03", label: "DMAT round 1 allotment", track: "state" },
    { date: "2025-09-08", label: "College reporting (round 1)", track: "state" },
    { date: "2025-09-14", label: "Round 2 choice filling", track: "state" },
    { date: "2025-09-21", label: "MCC round 2 allotment", track: "mcc" },
    { date: "2025-09-27", label: "Stray vacancy counseling", track: "state" },
    { date: "2025-10-04", label: "Admission freeze on DME portal", track: "state" },
    { date: "2025-10-10", label: "Academic session begins", track: "state" },
  ],
  faq: [
    {
      question: "What is DMAT in Madhya Pradesh?",
      answer:
        "DMAT refers to the online medical admission counseling process run by DME on dme.mponline.gov.in for NEET-qualified candidates.",
    },
    {
      question: "How many MBBS seats are in MP?",
      answer: "About 5,725 seats across 31 colleges for 2025–26.",
    },
    {
      question: "Is MP domicile mandatory?",
      answer: "Yes for 85% state quota; AIQ and management paths have separate rules.",
    },
    {
      question: "Which colleges are most competitive?",
      answer: "MGM Indore and Gandhi Medical College Bhopal typically close earliest for General merit.",
    },
    {
      question: "What are government fees?",
      answer: "Roughly ₹40,000–₹80,000 per year depending on the college.",
    },
    {
      question: "Are bonds required?",
      answer: "Most government allotments include rural service bonds per DME notification.",
    },
    {
      question: "Can other-state students join MP colleges?",
      answer: "Via AIQ or private management quota—not state quota without MP domicile.",
    },
    {
      question: "How do I register?",
      answer: "Create an account on dme.mponline.gov.in during the published registration dates.",
    },
    {
      question: "Is NRI quota available?",
      answer: "Yes in select private colleges with NRI fee schedules.",
    },
    {
      question: "Can I participate in MCC and DMAT together?",
      answer: "Yes, subject to seat exit rules—do not hold conflicting seats.",
    },
    {
      question: "What reservations apply?",
      answer: "SC, ST, OBC, EWS, and PwD per MP policy for state quota.",
    },
    {
      question: "When are cutoffs released?",
      answer: "After each counseling round on the DME portal and official notices.",
    },
  ],
  notableColleges: [
    "MGM Medical College, Indore",
    "People's College of Medical Sciences, Bhopal",
    "Index Medical College, Indore",
  ],
};

export const MAHARASHTRA_MBBS_CONFIG: MbbsStateConfig = {
  slug: "maharashtra",
  name: "Maharashtra",
  code: "MH",
  capital: "Mumbai",
  counselingAuthority:
    "State Common Entrance Test Cell, Maharashtra (CET Cell)",
  counselingAuthorityShort: "CET Cell",
  counselingPortal: "cetcell.mahacet.org",
  counselingPortalUrl: "https://cetcell.mahacet.org",
  universityNote:
    "Government and municipal colleges affiliate with Maharashtra University of Health Sciences (MUHS); some institutions retain legacy university ties. Private colleges are MUHS-affiliated with separate institute-level fee approvals.",
  stats: {
    totalColleges: 80,
    totalSeats: MH_TOTAL,
    govtColleges: 28,
    govtSeats: 4820,
    pvtColleges: 52,
    pvtSeats: 8004,
    aiqSeats: MH_AIQ,
    stateQuotaSeats: MH_TOTAL - MH_AIQ,
    govtFeeAnnual: "₹1.1 – ₹1.8 lakh (grant/municipal tiers)",
    mgmtFeeCap: "₹15 – ₹28 lakh per year",
    bondNote: "Bond on select government seats; municipal colleges may have service rules",
    domicileRequired: "Yes — Maharashtra domicile for state quota",
  },
  overview: [
    "Maharashtra is among India’s largest MBBS markets with 12,824 seats across 80 colleges, counseled by the CET Cell on cetcell.mahacet.org. Mumbai, Pune, and Nagpur anchor premier government and private institutes, while tier-2 cities added seats through new private colleges over the last decade.",
    "Government and municipal grant colleges such as GS Medical College (KEM), B.J. Medical College Pune, and Grant Medical Mumbai draw elite NEET ranks, but the state also offers more than 8,000 private seats—higher than most states—creating multiple price points for domicile students.",
    "Domicile certification follows Maharashtra rules with emphasis on HSC from the state or parental domicile. The 85% state quota is large in absolute terms (~10,900 seats), yet Mumbai-Pune government cutoffs remain among the toughest outside Delhi AIIMS clusters.",
    "Fee diversity is wide: municipal colleges charge relatively moderate tuition compared with private management seats that can exceed ₹25 lakh per year. NRI quotas are common in private institutes across Pune and Navi Mumbai.",
    "Students comparing Maharashtra with Gujarat or MP trade higher private costs for clinical exposure in mega hospitals. AIQ (~1,924 seats) offers a meaningful all-India pathway into Maharashtra colleges without domicile, especially for high-rank holders targeting Mumbai institutions.",
  ],
  domicile: {
    rules: [
      "Maharashtra domicile is required for state quota seats unless explicitly exempted in the CET Cell notification.",
      "Candidates passing HSC (12th) from a recognized institution in Maharashtra generally qualify as domicile for medical admissions.",
      "Domicile may also be established via parent domicile certificate issued by Maharashtra revenue authorities.",
      "Children of Maharashtra state government / PSU employees may claim domicile under transferable job provisions with service proof.",
      "Candidates educated outside Maharashtra due to parental transfer must submit combined domicile and employment certificates.",
      "AIQ 15% seats and certain institutional quotas are open without Maharashtra domicile.",
    ],
    documents: [
      "Maharashtra domicile certificate",
      "HSC mark sheet and certificate",
      "SSC mark sheet for identity continuity",
      "NEET-UG scorecard",
      "Parent domicile and employment proof (if applicable)",
      "Caste validity and income certificates for reserved categories",
    ],
    nonDomicile:
      "Non-domicile candidates cannot access Maharashtra state quota. They may use MCC AIQ or institute-level management/NRI quotas in private colleges where national candidates are admitted.",
    reservation:
      "Reservations include SC (13%), ST (7%), VJ/DT (A), NT (B/C/D), OBC (19%), SBC, and EWS (10%) per Maharashtra social justice roster. Orphan and PwD horizontal categories apply as notified.",
    bond:
      "Government and select municipal seats may require service bonds or penalties for non-joining; details vary by college and are listed in the CET Cell information brochure.",
  },
  counselingSteps: [
    "Qualify NEET-UG and note your All India Rank and percentile.",
    "Register on cetcell.mahacet.org for Maharashtra NEET-UG counseling.",
    "Pay registration fee and complete application with academic history.",
    "Upload domicile, category validity, and identity proofs.",
    "Fill and arrange preferences for grant, private, and institutional quotas.",
    "Lock preferences before the round deadline.",
    "Check provisional allotment and download seat allocation letter.",
    "Report to allotted college for document verification.",
    "Pay institute fees and complete admission formalities.",
    "Participate in CAP rounds (II, III, mop-up) for upgradation or fresh allotment.",
  ],
  counselingRules: [
    "CAP round participation requires fresh locking of preferences each active round unless freeze option is chosen.",
    "Institute-level quotas in private colleges may run parallel rounds—read college notices alongside CET Cell schedule.",
    "Seat exit between MCC and CET Cell must follow the latest anti-duplication guidelines.",
  ],
  fees: {
    govt:
      "Grant and municipal government colleges: roughly ₹1.1–₹1.8 lakh per year tuition; some Mumbai municipal colleges have additional deposits.",
    private:
      "Private unaided colleges: management quota often ₹15–₹28 lakh per year; institute-level quotas may differ.",
    nri:
      "NRI quota commonly ₹35–₹50 lakh per year with USD fee components in coastal colleges.",
    hostel:
      "Hostel and mess in metro campuses: ₹1.5–₹3 lakh per year; tier-2 cities somewhat lower.",
    bondPenalty:
      "Penalties for bond breach or seat blocking vary by college; CET Cell publishes non-refundable fee components each year.",
    comparison: [
      { label: "5-year grant/municipal MBBS", total: "₹6 – ₹10 lakh" },
      { label: "5-year private MBBS (mgmt)", total: "₹75 lakh – ₹1.4 crore" },
      { label: "5-year NRI track", total: "₹1.75 – ₹2.5 crore" },
    ],
  },
  seatDistribution: {
    analysis:
      "Mumbai and Pune together account for over 40% of seats, including the most competitive grant colleges. Nagpur and Aurangabad (Chhatrapati Sambhajinagar) are major regional hubs. Thane-Navi Mumbai corridor adds substantial private capacity.",
    byCity: [
      { city: "Mumbai", colleges: 18, seats: 2920 },
      { city: "Pune", colleges: 14, seats: 2340 },
      { city: "Nagpur", colleges: 9, seats: 1480 },
      { city: "Aurangabad", colleges: 6, seats: 920 },
      { city: "Nashik", colleges: 5, seats: 780 },
    ],
    growth: [
      { year: 2020, seats: 9850 },
      { year: 2021, seats: 10420 },
      { year: 2022, seats: 11080 },
      { year: 2023, seats: 11650 },
      { year: 2024, seats: 12240 },
      { year: 2025, seats: 12824 },
    ],
    vsNational:
      "Maharashtra alone hosts about 10% of India’s MBBS seats—the largest single-state pool—yet high domicile applicant volume keeps grant college odds near 2–3% for General category.",
  },
  vsOtherStates: [
    "Largest private seat inventory among focus states—more fallback options at higher cost.",
    "Grant college cutoffs are tougher than Gujarat or MP for equivalent prestige.",
    "Government tuition higher than Gujarat GMERS but still below top private management fees.",
    "Counseling is CAP-based with multiple rounds—more complex than Rajasthan’s single-portal flow.",
  ],
  vsRecommendation:
    "Maharashtra rewards domicile students with scale—use CAP strategically; non-domicile high-rankers should target AIQ in Mumbai/Pune colleges before paying premium private fees elsewhere.",
  chances: {
    neetApplicantsState: "~2.45 lakh Maharashtra domicile NEET applicants (2025 estimate)",
    stateQuotaGovtSeats: 4097,
    stats: [
      { label: "State quota govt seats", value: "4,097" },
      { label: "Approx. grant govt odds", value: "1.7%" },
      { label: "KEM/Grant Mumbai band", value: "AIR 500 – 2,500" },
      { label: "Private mgmt entry", value: "AIR 50,000 – 5,00,000" },
    ],
    options: [
      {
        title: "AIR under 2,500",
        body: "Grant colleges in Mumbai/Pune remain realistic; also strong for national AIQ options.",
      },
      {
        title: "AIR 2,500 – 10,000",
        body: "Tier-2 grant colleges, municipal seats, and top private government-quota open up.",
      },
      {
        title: "AIR 10,000 – 40,000",
        body: "Focus on Nagpur, Aurangabad grant colleges and private CAP seats with regulated fees.",
      },
      {
        title: "AIR 40,000 – 3,00,000",
        body: "Management quota across 52 private colleges—compare MUHS affiliation and hospital beds.",
      },
      {
        title: "Non-domicile",
        body: "Target ~1,924 AIQ Maharashtra seats; state CAP is unavailable without domicile.",
      },
    ],
  },
  documents: {
    academic: [
      "NEET-UG 2025 scorecard",
      "SSC (10th) mark sheet",
      "HSC (12th) mark sheet and certificate",
      "Leaving certificate / transfer certificate",
    ],
    identity: [
      "Aadhaar or passport",
      "Maharashtra domicile certificate",
      "Birth certificate",
      "Parent domicile documents",
    ],
    category: [
      "Caste certificate with validity certificate (Maharashtra)",
      "Non-creamy layer for OBC",
      "EWS certificate",
      "PwD certificate",
    ],
    photos:
      "Recent photograph and signature upload per CET Cell CAP guidelines; carry originals for reporting.",
    nri: [
      "Passport and visa",
      "NRI status proof",
      "Sponsorship affidavit",
      "Bank remittance proof for fee",
    ],
    stateSpecific: [
      "HSC passing from Maharashtra (if domicile via education)",
      "CET Cell registration receipt",
      "Medical fitness as per college format",
      "Anti-ragging and undertaking forms",
    ],
  },
  topGovtColleges: [
    {
      name: "Grant Medical College",
      city: "Mumbai",
      established: 1845,
      seats: 200,
      aiqSeats: 30,
      closingRankGeneral: 1800,
      university: "MUHS",
      beds: 2800,
      feePerYear: "₹1.2 lakh",
      hasPg: true,
    },
    {
      name: "B.J. Government Medical College",
      city: "Pune",
      established: 1964,
      seats: 200,
      aiqSeats: 30,
      closingRankGeneral: 2200,
      university: "MUHS",
      beds: 2400,
      feePerYear: "₹1.1 lakh",
      slug: "bj-medical-pune",
      hasPg: true,
    },
    {
      name: "Seth G.S. Medical College (KEM)",
      city: "Mumbai",
      established: 1926,
      seats: 250,
      aiqSeats: 38,
      closingRankGeneral: 950,
      university: "MUHS",
      beds: 3000,
      feePerYear: "₹1.3 lakh",
      slug: "kem-mumbai",
      hasPg: true,
    },
    {
      name: "Government Medical College",
      city: "Nagpur",
      established: 1947,
      seats: 200,
      aiqSeats: 30,
      closingRankGeneral: 6500,
      university: "MUHS",
      beds: 1600,
      feePerYear: "₹1.0 lakh",
      hasPg: true,
    },
    {
      name: "Topiwala National Medical College",
      city: "Mumbai",
      established: 1921,
      seats: 150,
      aiqSeats: 23,
      closingRankGeneral: 2100,
      university: "MUHS",
      beds: 1200,
      feePerYear: "₹1.25 lakh",
      hasPg: true,
    },
    {
      name: "Government Medical College",
      city: "Aurangabad",
      established: 1956,
      seats: 200,
      aiqSeats: 30,
      closingRankGeneral: 7800,
      university: "MUHS",
      beds: 1100,
      feePerYear: "₹95,000",
      hasPg: true,
    },
  ],
  aiqCutoffs: [
    {
      category: "General",
      aiqOpen2025: 120,
      aiqClose2025: 11800,
      stateOpen2025: 950,
      stateClose2025: 125000,
    },
    {
      category: "OBC",
      aiqOpen2025: 900,
      aiqClose2025: 14200,
      stateOpen2025: 2800,
      stateClose2025: 145000,
    },
    {
      category: "SC",
      aiqOpen2025: 7500,
      aiqClose2025: 88000,
      stateOpen2025: 165000,
      stateClose2025: 400000,
    },
    {
      category: "ST",
      aiqOpen2025: 24000,
      aiqClose2025: 108000,
      stateOpen2025: 280000,
      stateClose2025: 550000,
    },
    {
      category: "EWS",
      aiqOpen2025: 4800,
      aiqClose2025: 13500,
      stateOpen2025: 35000,
      stateClose2025: 165000,
    },
  ],
  mgmtCutoffNote:
    "CET Cell publishes CAP cutoffs for each quota type; private management seats close at significantly weaker ranks than grant colleges with institute-specific fee confirmation.",
  cutoffTrends: [
    { college: "Seth G.S. Medical College (KEM), Mumbai", year: 2023, generalClose: 820, obcClose: 2100 },
    { college: "Seth G.S. Medical College (KEM), Mumbai", year: 2024, generalClose: 880, obcClose: 2250 },
    { college: "Seth G.S. Medical College (KEM), Mumbai", year: 2025, generalClose: 950, obcClose: 2400 },
    { college: "B.J. Government Medical College, Pune", year: 2023, generalClose: 1950, obcClose: 3400 },
    { college: "B.J. Government Medical College, Pune", year: 2024, generalClose: 2080, obcClose: 3550 },
    { college: "B.J. Government Medical College, Pune", year: 2025, generalClose: 2200, obcClose: 3700 },
    { college: "Government Medical College, Nagpur", year: 2023, generalClose: 6100, obcClose: 9200 },
    { college: "Government Medical College, Nagpur", year: 2024, generalClose: 6300, obcClose: 9500 },
    { college: "Government Medical College, Nagpur", year: 2025, generalClose: 6500, obcClose: 9800 },
  ],
  timeline: [
    { date: "2025-08-01", label: "NEET-UG 2025 results declared", track: "neet" },
    { date: "2025-08-04", label: "CET Cell CAP registration opens", track: "state" },
    { date: "2025-08-09", label: "MCC AIQ registration", track: "mcc" },
    { date: "2025-08-15", label: "Document upload for Maharashtra CAP", track: "state" },
    { date: "2025-08-20", label: "CAP round I preference filling", track: "state" },
    { date: "2025-08-26", label: "MCC AIQ round 1 allotment", track: "mcc" },
    { date: "2025-09-01", label: "CAP round I seat allotment", track: "state" },
    { date: "2025-09-06", label: "Reporting to allotted institutes", track: "state" },
    { date: "2025-09-13", label: "CAP round II registration", track: "state" },
    { date: "2025-09-19", label: "MCC round 2 allotment", track: "mcc" },
    { date: "2025-09-24", label: "CAP round III / institutional quota sync", track: "state" },
    { date: "2025-10-01", label: "Mop-up CAP round", track: "state" },
    { date: "2025-10-07", label: "Final merit and admission closure", track: "state" },
  ],
  faq: [
    {
      question: "Who conducts Maharashtra MBBS counseling?",
      answer: "The State CET Cell runs CAP on cetcell.mahacet.org; AIQ is via MCC.",
    },
    {
      question: "How many MBBS seats are in Maharashtra?",
      answer: "About 12,824 seats across 80 colleges for 2025–26.",
    },
    {
      question: "Is Maharashtra domicile required for CAP?",
      answer: "Yes for state quota seats; AIQ and some private quotas are open nationally.",
    },
    {
      question: "What rank is needed for KEM Mumbai?",
      answer: "Grant CAP General closing ranks are often under AIR 2,500; AIQ is even tighter.",
    },
    {
      question: "What are private college fees?",
      answer: "Management quotas commonly range ₹15–₹28 lakh per year depending on institute.",
    },
    {
      question: "Does Maharashtra have NRI quota?",
      answer: "Yes, many private colleges offer NRI seats with separate fee schedules.",
    },
    {
      question: "How many CAP rounds occur?",
      answer: "Typically three main CAP rounds plus mop-up; institutional quotas may add rounds.",
    },
    {
      question: "What reservations apply?",
      answer: "SC, ST, OBC, VJ/NT, SBC, EWS, and horizontal categories per state roster.",
    },
    {
      question: "Can I use both MCC and CET Cell?",
      answer: "Yes, but follow seat exit rules to avoid duplicate allotments.",
    },
    {
      question: "Are municipal colleges different from state grant?",
      answer: "Municipal colleges like KEM have distinct fee and bond rules but participate in CAP.",
    },
    {
      question: "When does CAP registration start?",
      answer: "Usually within the first week of August after NEET results.",
    },
    {
      question: "Where are cutoffs published?",
      answer: "CET Cell publishes PDF cutoffs per round on cetcell.mahacet.org.",
    },
  ],
  notableColleges: [
    "Seth G.S. Medical College (KEM), Mumbai",
    "Dr. D.Y. Patil Medical College, Pune",
    "Symbiosis Medical College for Women, Pune",
  ],
};

export const MBBS_STATE_CONFIGS: Record<FocusStateSlug, MbbsStateConfig> = {
  gujarat: GUJARAT_MBBS_CONFIG,
  rajasthan: RAJASTHAN_MBBS_CONFIG,
  "madhya-pradesh": MADHYA_PRADESH_MBBS_CONFIG,
  maharashtra: MAHARASHTRA_MBBS_CONFIG,
};

export function getMbbsStateConfig(slug: string): MbbsStateConfig | undefined {
  return MBBS_STATE_CONFIGS[slug as FocusStateSlug];
}
