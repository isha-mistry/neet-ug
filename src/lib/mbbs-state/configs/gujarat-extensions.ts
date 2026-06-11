import type { MbbsStateContentExtensions } from "../types";

/**
 * Supplementary Gujarat guide sections (seat matrix, GMERS fees, eligibility).
 * Seat splits follow published ACPUGMEC / NMC matrices; totals align with common 2026 guides.
 * Live college counts on the page come from the MedSeat catalog merge.
 */
export const GUJARAT_CONTENT_EXTENSIONS: MbbsStateContentExtensions = {
  whyChoose: [
    "GMERS (Gujarat Medical Education and Research Society) colleges sit between fully state-owned government institutes and private medical colleges—trust-run, fee-regulated, and widely used as an affordable government-quota path.",
    "Government and GMERS routes operate on regulated tuition (often ₹25,000–₹3.75 lakh per year depending on institute type), which keeps five-year tuition far below typical private management tracks.",
    "Gujarat domicile students who miss Ahmedabad-tier cutoffs still have a deep bench of district GMERS and private government-quota seats, so in-state NEET qualifiers have more structured fallback options than in many high-applicant states.",
  ],
  undergradSeatSegments: [
    {
      title: "Government & GMERS (including AIIMS Rajkot)",
      detail:
        "About 24 public-sector institutes contribute roughly 4,325 MBBS seats. Annual tuition typically ranges from about ₹25,000 at classic government colleges up to roughly ₹3.75 lakh at GMERS institutes (fee fixation order), plus hostel and university charges.",
    },
    {
      title: "Private medical colleges",
      detail:
        "Nineteen private institutes offer about 3,200 MBBS seats. Government-quota seats in private colleges follow state fee committee caps; management quota tuition is commonly ₹16–22 lakh per year before hostel, as per college-wise NMC fee orders.",
    },
    {
      title: "Post-graduate (MD/MS) pipeline",
      detail:
        "Gujarat also lists about 2,624 MD/MS speciality seats statewide—relevant if you are planning MBBS with an eye on in-state PG counseling later.",
    },
  ],
  pgMdMsSeats: 2624,
  extraQuickFacts: [
    {
      label: "Govt / GMERS fee range (annual)",
      value: "₹0.25 – ₹9.14 lakh (college type dependent)",
    },
    {
      label: "Private MBBS fee range (annual, indicative)",
      value: "₹16.2 – ₹22.5 lakh (management track)",
    },
    {
      label: "MD/MS seats (statewide)",
      value: "2,624",
    },
    {
      label: "NEET UG applicants from Gujarat (2025 reference)",
      value: "80,151",
    },
    {
      label: "Chance of a government-quota seat (domicile, indicative)",
      value: "~5.4%",
    },
    {
      label: "Major affiliating universities",
      value: "Gujarat University, B.K. Mody University, Veer Narmad South Gujarat University, Saurashtra University, Parul University (college-wise)",
    },
  ],
  feeScheduleTables: [
    {
      title: "Government medical colleges — annual tuition (₹ lakh)",
      headers: ["Institute type", "Govt quota seat", "Mgmt quota", "NRI (USD)"],
      rows: [["Government medical colleges", "0.25", "—", "—"]],
    },
    {
      title: "GMERS medical colleges — annual tuition",
      headers: ["Institute type", "Govt quota (₹ lakh)", "Mgmt (₹ lakh)", "NRI (USD)"],
      rows: [["GMERS medical colleges", "3.75", "12", "25,000"]],
    },
  ],
  bondServiceRules: [
    "Government and government-aided MBBS seats in Gujarat typically require a compulsory service bond after internship—usually one year of service in a designated rural or government healthcare facility.",
    "Bond surety amounts are revised in the annual ACPUGMEC information brochure (commonly quoted around ₹10 lakh; some notifications reference higher recovery up to roughly ₹20 lakh for non-compliance—verify the current PDF on medadmgujarat.org).",
    "Failure to join, complete service, or pay the penalty can trigger bond recovery with interest and may affect state medical registration until resolved.",
  ],
  neetCounselingEligibility: [
    "Minimum age 17 years at admission (as per NMC / NEET norms).",
    "Valid NEET-UG 2026 score and rank; qualification marks in PCB: 50% for General, 45% for General-PwD, 40% for SC/ST/OBC/SEBC as per NTA rules.",
    "Core subjects in 10+2: Physics, Chemistry, Biology, and English from a recognized board.",
    "Gujarat domicile (or eligible exception) mandatory for 85% state quota seats; AIQ and permitted private quotas follow separate rules.",
    "Category, PwD, EWS, and income certificates must be issued by competent Gujarat authorities when claiming reservation or fee benefits.",
  ],
  govtSeatMatrix: [
    {
      title: "Autonomous & central institutes (indicative NEET 2026 matrix)",
      headers: ["Medical college", "Total seats", "AIQ", "State quota", "Other"],
      rows: [
        {
          college: "AIIMS Rajkot",
          slug: "all-india-institute-of-medical-sciences-rajkot",
          cells: ["75", "31", "44", "—"],
        },
        {
          college: "ESIC Medical College, Ahmedabad",
          slug: "esic-medical-college-naroda-bapunagar-ahmedabad",
          cells: ["50", "3", "25", "22 (ESIC/IP)"],
        },
      ],
    },
    {
      title: "State government medical colleges — seat split (indicative)",
      headers: ["Medical college", "Total", "AIQ", "State quota", "NRI"],
      rows: [
        {
          college: "B.J. Medical College, Ahmedabad",
          slug: "b-j-medical-college-ahmedabad",
          cells: ["250", "37", "213", "0"],
        },
        {
          college: "Narendra Modi Medical College, Ahmedabad",
          cells: ["250", "37", "213", "0"],
        },
        {
          college: "M.P. Shah Medical College, Jamnagar",
          cells: ["250", "38", "212", "0"],
        },
        {
          college: "P.D.U. Medical College, Rajkot",
          cells: ["200", "30", "170", "0"],
        },
        {
          college: "Government Medical College, Bhavnagar",
          slug: "government-medical-college-bhavnagar",
          cells: ["200", "30", "170", "0"],
        },
        {
          college: "Medical College, Vadodara",
          cells: ["250", "38", "212", "0"],
        },
        {
          college: "Government Medical College, Surat",
          cells: ["250", "37", "213", "0"],
        },
        {
          college: "Government Medical College, Porbandar",
          cells: ["100", "15", "85", "15"],
        },
        {
          college: "Government Medical College, Panchmahal (Godhra)",
          cells: ["100", "15", "85", "15"],
        },
        {
          college: "Government Medical College, Morbi",
          slug: "government-medical-college-morbi",
          cells: ["100", "15", "85", "15"],
        },
      ],
    },
  ],
};
