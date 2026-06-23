import type { GuideJumpItem } from "@/components/features/mbbs-india/GuidePageJumpNav";

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface GlossaryTermGroup {
  label: string;
  terms: GlossaryTerm[];
}

export type TermsExplainedSection =
  | {
      id: string;
      eyebrow: string;
      title: string;
      description?: string;
      kind: "terms";
      terms: GlossaryTerm[];
    }
  | {
      id: string;
      eyebrow: string;
      title: string;
      description?: string;
      kind: "groups";
      groups: GlossaryTermGroup[];
    };

/** Update each counselling season when figures are re-verified against official notifications. */
export const TERMS_EXPLAINED_LAST_VERIFIED = "17 June 2026";

export const TERMS_EXPLAINED_HERO = {
  title: "NEET Counselling ",
  titleEmphasis: "Terms Explained",
  lede:
    "A complete reference for every acronym, body, quota, document and process you will encounter on the path from NEET score to MBBS seat. Use the section navigation to jump to a category, or search for a specific term.",
  fine:
    "Bond amounts, fee caps and income limits change with annual notifications — confirm on MCC, NTA and your state counselling portal before registering.",
  trio: [
    { key: "Categories", value: "12 sections" },
    { key: "Coverage", value: "Exam → seat → PG" },
    { key: "States", value: "GJ · RJ · MP · MH" },
  ],
} as const;

export const TERMS_EXPLAINED_LEAD_MAGNET = {
  formTitle: "Ask about a counselling term",
  formSubtitle:
    "Name and mobile — our team explains how quotas, documents or rounds apply to your rank and state.",
  submitLabel: "Get glossary help",
  whatsappIntro:
    "Hi Dravio, I have a question about NEET UG counselling terms and how they apply to my case.",
} as const;

export const TERMS_EXPLAINED_JUMP_SECTIONS: readonly GuideJumpItem[] = [
  { id: "exam", label: "The exam" },
  { id: "bodies", label: "Counselling bodies" },
  { id: "process", label: "Process & rounds" },
  { id: "quotas", label: "Quota types" },
  { id: "reservation", label: "Reservation" },
  { id: "rank-cutoff", label: "Rank & cutoff" },
  { id: "colleges", label: "College types" },
  { id: "documents", label: "Documents" },
  { id: "fees", label: "Fees & bonds" },
  { id: "state-terms", label: "State terms" },
  { id: "regulatory", label: "Regulators" },
  { id: "post-mbbs", label: "Post-MBBS" },
  { id: "related", label: "Guides" },
];

export const TERMS_EXPLAINED_SECTIONS: readonly TermsExplainedSection[] = [
  {
    id: "exam",
    eyebrow: "Section 1",
    title: "The Exam — NEET UG",
    kind: "terms",
    terms: [
      {
        term: "NEET UG (National Eligibility cum Entrance Test - Undergraduate)",
        definition:
          "The single national entrance examination required for admission to MBBS, BDS, BAMS, BHMS, BSMS, BUMS, BNYS, BVSc and AH courses in all Indian medical colleges (government, private, deemed and central). Conducted once a year by the National Testing Agency (NTA). Marks total 720, comprising Physics, Chemistry and Biology (Botany + Zoology) with 200 questions of which 180 must be attempted. Marking is +4 for correct, -1 for incorrect, 0 for unattempted.",
      },
      {
        term: "NTA (National Testing Agency)",
        definition:
          "The autonomous body under the Ministry of Education that conducts NEET UG, JEE Main, CUET, UGC NET and several other national-level exams. Responsible for the exam paper, conduct, answer keys, result declaration and All India Rank computation. Their official portal is neet.nta.nic.in.",
      },
      {
        term: "NEET Application Form",
        definition:
          "The online registration form filled at neet.nta.nic.in during the application window (typically January–March). Requires personal details, academic qualifications, category, photo and signature uploads, choice of exam city and language, and application fee payment.",
      },
      {
        term: "NEET Admit Card",
        definition:
          "The official entry pass for the exam, downloadable from the NTA portal usually two to three weeks before the exam date. Contains the candidate's allotted exam centre, reporting time, roll number, photo and instructions. Must be carried in printed form to the exam centre along with a valid photo ID.",
      },
      {
        term: "NEET Answer Key",
        definition:
          "The official set of correct answers released by NTA in two stages — first a provisional answer key allowing candidates to raise objections with a per-question fee, then a final answer key after considering objections. Used to calculate the official score.",
      },
      {
        term: "NEET Score",
        definition:
          "The total marks obtained out of 720 after applying the +4 / -1 marking scheme. Different from rank — score is your raw performance, rank is your position relative to all other candidates.",
      },
      {
        term: "NEET Percentile",
        definition:
          "A statistical measure showing the percentage of candidates who scored at or below you. Different from percentage. Used to determine qualification — General candidates must score in the 50th percentile or above, reserved categories in the 40th percentile.",
      },
      {
        term: "Qualifying Marks / Cut-off Percentile",
        definition:
          "The minimum percentile required to be eligible for medical college admission. 50th percentile for General and EWS, 40th percentile for SC, ST, OBC/SEBC, and 45th percentile for General-PwD. Qualifying does not mean you'll get a seat — it only earns you eligibility to compete in counselling.",
      },
      {
        term: "Tie-breaking Rule",
        definition:
          "When two or more candidates score equal marks, NEET applies a sequence of tie-breakers to assign different ranks: higher Biology score, then higher Chemistry score, then higher Physics score, then lower negative responses, then older age.",
      },
      {
        term: "NEXT (National Exit Test)",
        definition:
          "A proposed common exam intended to replace both FMGE (for foreign medical graduates) and the final-year MBBS licensing exam in India. When implemented, it will function both as the qualifying licensing exam for new MBBS graduates and as the entrance test for PG admissions. Implementation timeline has been repeatedly revised.",
      },
    ],
  },
  {
    id: "bodies",
    eyebrow: "Section 2",
    title: "Counselling Bodies & Authorities",
    kind: "terms",
    terms: [
      {
        term: "MCC (Medical Counselling Committee)",
        definition:
          "The central authority under the Ministry of Health & Family Welfare, Government of India, that conducts counselling for the All India Quota 15% seats, central universities, deemed universities, ESIC, AFMC, AIIMS and JIPMER seats. Their portal is mcc.nic.in. MCC is the single body for any non-state-quota MBBS seat allocation.",
      },
      {
        term: "ACPUGMEC (Admission Committee for Professional Undergraduate Medical Educational Courses)",
        definition:
          "The state counselling authority for Gujarat. Conducts counselling for the 85% state quota seats in government, GMERS and private colleges of Gujarat, plus management quota and NRI quota seats in private colleges. Their portal is medadmgujarat.org.",
      },
      {
        term: "RUHS (Rajasthan University of Health Sciences)",
        definition:
          "The state counselling authority for Rajasthan. Conducts UG and PG medical counselling for state quota seats in all government and private medical colleges of Rajasthan. Their portal is ruhsraj.org.",
      },
      {
        term: "DMAT MP (Directorate of Medical Education, Madhya Pradesh)",
        definition:
          "The state counselling authority for Madhya Pradesh. Conducts MP NEET UG counselling for state quota seats. Different from the older DMAT entrance exam — the directorate now handles NEET-based counselling.",
      },
      {
        term: "CET Cell Maharashtra (State Common Entrance Test Cell)",
        definition:
          "The state counselling authority for Maharashtra. Conducts UG medical counselling for state quota seats in government and private medical colleges across Maharashtra.",
      },
      {
        term: "State Counselling Authority",
        definition:
          "A general term for the body in any state that conducts the 85% state quota counselling. Each state has a different one — for example, KEA in Karnataka, SAAT/OJEE in Odisha, NTRUHS in Andhra Pradesh, TNMGRMU/Selection Committee in Tamil Nadu.",
      },
      {
        term: "Help Centre / Facilitation Centre",
        definition:
          "Designated physical locations set up by counselling authorities (especially ACPUGMEC and state bodies) where candidates appear in person for original document verification before they can participate in choice filling. Candidates select their preferred help centre and date during registration.",
      },
    ],
  },
  {
    id: "process",
    eyebrow: "Section 3",
    title: "Counselling Process & Rounds",
    kind: "terms",
    terms: [
      {
        term: "Counselling",
        definition:
    "The structured, multi-round process by which candidates who qualified NEET are allocated MBBS seats in colleges based on their All India Rank, category, quota, choices filled and seat availability. Two parallel tracks run simultaneously every year: MCC's AIQ counselling at the national level, and each state's separate counselling for state quota seats.",
      }, 
      {
        term: "Registration",
        definition:
          "The first step of any counselling — creating an account on the counselling portal, paying the registration fee (and refundable security deposit, in some states), and submitting basic details. Required separately for MCC AIQ and each state counselling you want to participate in.",
      },
      {
        term: "Choice Filling / Choice Locking",
        definition:
          "After registration and document verification, candidates select their preferred colleges and courses from the seat matrix in priority order. Choices can usually be reordered, added or removed until the deadline, after which they are locked and cannot be changed. The order matters — allotment respects priority strictly.",
      },
      {
        term: "Seat Matrix",
        definition:
          "The official list of every available seat at the time of counselling, broken down by college, course (MBBS / BDS), category, quota, sub-quota and any reserved sub-allocations (PwD, defence, sports, etc.). Released by the counselling authority before choice filling begins.",
      },
      {
        term: "Allotment / Seat Allotment Result",
        definition:
          "The published result of each counselling round, showing which seat each candidate has been allotted based on their rank, category, choices and seat availability. Each round produces an allotment list and a non-allotment list.",
      },
      {
        term: "Reporting / Joining",
        definition:
          "The process of physically (or sometimes online + physical) reporting to the allotted college within the specified deadline, submitting original documents, paying the college fees, and completing institutional admission formalities to formally accept the allotted seat. Missing the reporting deadline results in automatic cancellation of the allotment and loss of the seat.",
      },
      {
        term: "Round 1",
        definition:
          'The first round of counselling. Considered the most important round because it has the most seats available and sets your baseline allotment. Allotment is based on rank within choices filled. Once reported, you can opt for "freeze" (accept), "float/upgrade" (accept now but try for better in Round 2), or "exit" (decline and try Round 2 with a new allotment).',
      },
      {
        term: "Round 2",
        definition:
          'The second round, conducted after Round 1 reporting closes. Vacated seats (from candidates who declined, didn\'t report, or got upgraded) and any newly added seats re-enter the pool. Candidates who chose "upgrade" in Round 1 are automatically considered; new candidates and those not allotted in Round 1 can also participate.',
      },
      {
        term: "Mop-up Round",
        definition:
          "A counselling round held after Round 2 to fill seats that are still vacant. Eligibility rules sometimes get relaxed (some states allow non-domicile or unallotted candidates), windows are short, and rules can change yearly. Many serious seats are filled in mop-up that students miss because they assumed counselling ended at Round 2.",
      },
      {
        term: "Stray Vacancy Round",
        definition:
          "The final counselling round for any seats still vacant after mop-up. Often conducted at the college level rather than the counselling authority level, and frequently requires physical presence at the college. Sometimes results in surprisingly good colleges being available.",
      },
      {
        term: "Online Reporting",
        definition:
          "A step in some counselling processes where the candidate accepts the allotment online and pays a partial fee before physical reporting at the college. Common in MCC AIQ counselling.",
      },
      {
        term: "Physical Reporting",
        definition:
          "The mandatory step of appearing in person at the allotted college within the reporting deadline, submitting originals and paying the full college fee.",
      },
      {
        term: "Freeze",
        definition:
          'A choice made during reporting in early rounds, meaning "I accept this seat and don\'t want to participate in any further round." After freezing, your name is removed from the candidate pool for subsequent rounds.',
      },
      {
        term: "Float / Upgrade",
        definition:
          'A choice made during reporting meaning "I accept this seat for now, but if I get a higher-preference college in the next round, please move me there automatically." If upgraded, the previous seat is automatically released to the pool.',
      },
      {
        term: "Surrender / Withdraw",
        definition:
          "The act of giving up an allotted seat after reporting. In most counselling systems, surrendering after Round 1 reporting has financial consequences (fee forfeiture, security deposit loss). In some, repeated surrendering can lead to debarment from subsequent counselling.",
      },
      {
        term: "Forfeiture of Seat",
        definition:
          "The automatic loss of an allotted seat for not reporting within the deadline, not paying the college fees on time, or failing document verification. Forfeited seats return to the pool for the next round.",
      },
      {
        term: "Resignation Bond / Surrender Bond",
        definition:
          "A monetary penalty payable if a candidate joins a government MBBS seat in Round 1 or Round 2 and later resigns or surrenders the seat after a specified cut-off. Designed to discourage seat-blocking. Different states have different surrender bond amounts ranging from ₹50,000 to several lakhs.",
      },
    ],
  },
  {
    id: "quotas",
    eyebrow: "Section 4",
    title: "Quota Types",
    kind: "terms",
    terms: [
      {
        term: "AIQ (All India Quota)",
        definition:
          "15% of MBBS seats in every government medical college in India, pooled and counseled centrally by MCC. Open to candidates from any state, regardless of domicile. The route for non-domicile candidates to get into government colleges of other states. AIQ also includes 100% of seats in central institutions like AIIMS, JIPMER, AFMC, BHU, AMU, ESIC, deemed universities and central universities.",
      },
      {
        term: "State Quota (85%)",
        definition:
          "The 85% of seats in government and private medical colleges of a state, reserved for domicile residents of that state. Counseled by the respective state authority — ACPUGMEC in Gujarat, RUHS in Rajasthan, etc. Each state defines domicile differently.",
      },
      {
        term: "Management Quota",
        definition:
          "Seats in private medical colleges (and in some states, in trust or deemed institutions) reserved for institutional management to allocate. Higher fees than government quota seats. In most states, management quota is now mandatorily filled through state counselling using NEET merit — no direct admission allowed.",
      },
      {
        term: "NRI Quota (Non-Resident Indian Quota)",
        definition:
          "A sub-quota of seats in private and some deemed medical colleges, available only to candidates who are NRIs themselves, or whose first-degree relative (parent, sibling, etc.) is an NRI sponsoring their education. Fees are significantly higher than even management quota. Documentation requirements are strict (passport, OCI/visa of sponsor, relationship proof, foreign remittance proof).",
      },
      {
        term: "OCI / PIO Quota",
        definition:
          "Seats available to Overseas Citizens of India and Persons of Indian Origin under certain rules. Counted under NRI quota in most colleges. OCI cardholders have been allowed to compete in NEET on the same terms as Indian nationals after recent rule changes.",
      },
      {
        term: "Central / Institutional Quota",
        definition:
          "Seats in central government institutions (AIIMS, AFMC, ESIC, BHU, AMU, JIPMER) — generally filled through MCC counselling under specific institutional sub-quotas.",
      },
      {
        term: "State Specific Sub-Quotas",
        definition:
          "Within state 85% quota, many states have further sub-categorization: Local Quota (Gujarat) for residents of specific municipal corporation areas (e.g. Smt. NHL Municipal Medical College, SMIMER Surat); Bonafide Resident Quota for candidates born or studied entirely within the state; Defence Quota for sons/daughters of defence personnel; Sports Quota for state or national level sportspersons; Differently-Abled Quota / PwD for candidates with disabilities of 40% or more.",
      },
    ],
  },
  {
    id: "reservation",
    eyebrow: "Section 5",
    title: "Reservation Categories",
    kind: "terms",
    terms: [
      {
        term: "General / Unreserved (UR)",
        definition:
          "Candidates not eligible for any reservation category. Compete based on NEET marks alone with no relaxation.",
      },
      {
        term: "OBC (Other Backward Classes)",
        definition:
          "A central government reservation category for socially and educationally backward classes. 27% reservation in central institutions and AIQ. Eligibility requires a non-creamy-layer certificate showing family income below the prescribed limit (currently ₹8 lakh per annum).",
      },
      {
        term: "SEBC (Socially and Educationally Backward Classes)",
        definition:
          'Gujarat\'s state-specific term for OBC. Gujarat does not use "OBC" terminology in state counselling — candidates from these communities apply under SEBC, which has the same 27% reservation. Requires a Gujarat SEBC NCL certificate issued in the current financial year (i.e., after April 1).',
      },
      {
        term: "SC (Scheduled Caste)",
        definition:
          "A constitutionally recognized reservation category. 15% reservation in central institutions and AIQ. Eligibility requires an SC certificate issued by a competent authority.",
      },
      {
        term: "ST (Scheduled Tribe)",
        definition:
          "A constitutionally recognized reservation category. 7.5% reservation in central institutions and AIQ. Eligibility requires an ST certificate issued by a competent authority.",
      },
      {
        term: "EWS (Economically Weaker Sections)",
        definition:
          "A 10% reservation category for the General category candidates whose family annual income is below ₹8 lakh and who don't fall under any other reservation. Requires an EWS certificate issued by the competent authority in the current financial year. EWS certificates from previous years are not accepted.",
      },
      {
        term: "PwD / PH (Persons with Disability / Physically Handicapped)",
        definition:
          "A horizontal reservation of 5% (within each category) for candidates with disabilities of 40% or more, as certified by a designated medical board. PwD candidates have a lower qualifying NEET percentile (45th instead of 50th for General-PwD). Disability certificate must be from a board notified by the counselling authority.",
      },
      {
        term: "Creamy Layer / Non-Creamy Layer (NCL)",
        definition:
          'Within OBC/SEBC reservation, candidates whose family income exceeds the prescribed limit fall into the "creamy layer" and cannot avail reservation. Only "non-creamy layer" candidates qualify. The NCL certificate must be issued in the current financial year — old certificates are invalid.',
      },
      {
        term: "Children of Defence Personnel / Ex-Servicemen Quota",
        definition:
          "A small reservation (often 1-5%) for children of currently serving or ex-defence personnel. Requires service certificate from the relevant defence authority.",
      },
    ],
  },
  {
    id: "rank-cutoff",
    eyebrow: "Section 6",
    title: "Rank, Score & Cutoff Terms",
    kind: "terms",
    terms: [
      {
        term: "AIR (All India Rank)",
        definition:
          "The candidate's position in the overall NEET merit list across India, computed by NTA based on NEET score and tie-breaking rules. The primary number used in MCC AIQ counselling.",
      },
      {
        term: "State Rank / State Merit Rank",
        definition:
          "The candidate's rank within their domicile state, computed by the state counselling authority from the NEET scores of all candidates eligible for that state's quota. The primary number used in state quota counselling. State rank is always better (lower in number) than AIR because the candidate pool is smaller.",
      },
      {
        term: "Category Rank",
        definition:
          "The candidate's rank within their reservation category — for example, SC Category Rank, OBC Category Rank, EWS Category Rank. Used in reservation-specific allotment within counselling.",
      },
      {
        term: "Opening Rank",
        definition:
          "The rank of the first candidate admitted in a particular college, course, category, quota and round combination during the previous year's counselling. Indicates the top of the cutoff range.",
      },
      {
        term: "Closing Rank",
        definition:
          "The rank of the last candidate admitted in a particular college, course, category, quota and round combination during the previous year's counselling. Indicates the bottom of the cutoff range — and the practical threshold a candidate must beat to get that seat.",
      },
      {
        term: "Cutoff",
        definition:
          "The closing rank (or score) for a college, course, category and quota. Cutoffs are published year-wise, round-wise and category-wise. The most relevant cutoff for a candidate is the previous year's closing rank for their category, quota and target college.",
      },
      {
        term: "Cutoff Trend",
        definition:
          "The movement of closing ranks across years for a college. Rising trend means competition is increasing (closing rank is improving — fewer ranks now reach this college). Falling trend means competition is easing (closing rank is widening — more ranks now reach this college).",
      },
      {
        term: "Score-Rank Trend",
        definition:
          "The relationship between NEET score and AIR, published by NTA for each year. Used by predictors to estimate AIR before official results are out, based on the candidate's expected NEET score.",
      },
      {
        term: "Predicted Rank / Estimated Rank",
        definition:
          "A rank prediction made by tools like the Rank Predictor based on previous year's score-rank trends. Always indicative, never official.",
      },
      {
        term: "Safe / Borderline / Reach",
        definition:
          "A common classification of colleges relative to a candidate's rank: Safe — closing rank in the previous year was significantly worse than the candidate's rank, very high admission probability; Borderline — closing rank was close to the candidate's rank, moderate probability; Reach — closing rank was significantly better than the candidate's rank, low probability but worth listing for upgrade rounds.",
      },
    ],
  },
  {
    id: "colleges",
    eyebrow: "Section 7",
    title: "College Types & Classifications",
    kind: "terms",
    terms: [
      {
        term: "Government Medical College (GMC)",
        definition:
          "A medical college owned, funded and run by the central or state government. Lowest fees (typically ₹25,000 to ₹1,00,000 per year), highest cutoff competition. The most-sought-after seat type.",
      },
      {
        term: "Central Government Medical College",
        definition:
          "Government colleges run by the central government rather than the state — AIIMS network, AFMC Pune, JIPMER Puducherry, ESIC colleges, BHU IMS, AMU JN Medical, PGIMER Chandigarh. Admission is entirely through MCC AIQ counselling.",
      },
      {
        term: "AIIMS (All India Institute of Medical Sciences)",
        definition:
          "A network of premier central government medical colleges. Started with AIIMS New Delhi in 1956, expanded to multiple AIIMS across India. Considered the apex tier of MBBS education in the country. Counselling for AIIMS seats is conducted by MCC under a separate sub-quota.",
      },
      {
        term: "GMERS (Government Medical Education and Research Society)",
        definition:
          "A Gujarat-specific institutional category — semi-government colleges run by a state-government-created society. Distinct from pure government colleges. Fees are higher than pure govt (around ₹3.75 lakh per year) but much lower than private. Examples include GMERS Medical College Sola, GMERS Gandhinagar, GMERS Dharpur-Patan.",
      },
      {
        term: "Private Medical College",
        definition:
          "A medical college run by a private trust, society or company. Higher fees (₹9 lakh to ₹25 lakh per year for management quota, up to ₹35-45 lakh for NRI quota). Lower cutoff than government colleges but still requires NEET qualification.",
      },
      {
        term: "Deemed University",
        definition:
          "A category of higher education institution granted \"deemed-to-be-university\" status by UGC, allowing them to operate as universities. Medical colleges under deemed universities have their own fee structure and counselling through MCC. Examples include Manipal, Kasturba Medical College, Saveetha, DY Patil.",
      },
      {
        term: "Self-Financing Institution (SFI)",
        definition:
          "The Gujarat term for private medical colleges. Refers to colleges that run on student fees rather than government funding. Regulated by Gujarat's Fee Regulatory Committee (FRC).",
      },
      {
        term: "Trust / Society Run College",
        definition:
          "Private medical colleges run by registered trusts or societies. Most private colleges in India fall in this category.",
      },
      {
        term: "NMC-Approved College",
        definition:
          "A college whose MBBS course is officially recognized by the National Medical Commission, meaning its graduates are eligible to register as medical practitioners and pursue PG specialization. Admission to NMC-approved colleges should always be confirmed before joining — non-approved colleges put the entire career at risk.",
      },
      {
        term: "Municipal Medical College",
        definition:
          "Government medical colleges run by a city's municipal corporation rather than the state government. Unique to a few cities — examples: Smt. NHL Municipal Medical College (Ahmedabad), SMIMER Surat, KEM Mumbai (BMC), TN Medical College Mumbai (BMC). Often have a local quota for municipal area residents.",
      },
      {
        term: "NIRF Ranking",
        definition:
          "The National Institutional Ranking Framework — an official Ministry of Education ranking of educational institutions in India, published annually. Medical colleges are ranked separately. NIRF rank is one indicator (not the only one) of a college's academic quality.",
      },
    ],
  },
  {
    id: "documents",
    eyebrow: "Section 8",
    title: "Documents Required",
    kind: "terms",
    terms: [
      {
        term: "NEET Scorecard / Rank Letter",
        definition:
          "The official document issued by NTA showing the candidate's score, percentile and All India Rank. Downloaded from neet.nta.nic.in after results.",
      },
      {
        term: "Class 10 Marksheet & Certificate",
        definition:
          "Required as the official proof of date of birth and the candidate's basic academic record. The pass certificate must be from a recognized board.",
      },
      {
        term: "Class 12 Marksheet & Certificate",
        definition:
          "Required as proof of meeting eligibility (50% in Physics, Chemistry, Biology/Biotechnology + English aggregate for General, 40% for reserved categories) and as the most recent academic qualification.",
      },
      {
        term: "Domicile Certificate",
        definition:
          "The official document proving the candidate's residency in a specific state. Required for state quota counselling. Issued by the District Collector, Mamlatdar, Tehsildar or equivalent revenue authority. Each state has different domicile rules — Gujarat accepts schooling-based domicile, others require resident-based proof.",
      },
      {
        term: "Category Certificate (SC / ST / OBC / SEBC)",
        definition:
          "Issued by competent state authority. SC and ST certificates do not expire. OBC and SEBC certificates must be accompanied by an NCL certificate issued in the current financial year.",
      },
      {
        term: "EWS Certificate",
        definition:
          "Issued by competent authority showing family income below ₹8 lakh and asset criteria. Must be issued in the current financial year — counselling authorities reject EWS certificates issued before April 1 of the admission year.",
      },
      {
        term: "Non-Creamy Layer (NCL) Certificate",
        definition:
          "Required for OBC and SEBC candidates. Must be issued in the current financial year. Income limit currently ₹8 lakh per annum.",
      },
      {
        term: "Disability Certificate / PwD Certificate",
        definition:
          "Issued by a designated medical board (specified by the counselling authority). Must show disability of 40% or more. PwD candidates also undergo a verification examination at the time of counselling at a notified centre.",
      },
      {
        term: "Aadhaar Card",
        definition:
          "Used for identity verification. Required for OTP-based registration on most counselling portals. Aadhaar-linked mobile number is mandatory in many state counsellings.",
      },
      {
        term: "Passport-size Photographs",
        definition:
          "Required in multiple sets (typically 10-12 copies). Size 3.5 cm × 4.5 cm, white background, recent (within 6 months).",
      },
      {
        term: "Migration Certificate",
        definition:
          "A document from the previous school or board, required only if migrating from a different board for further education.",
      },
      {
        term: "School Leaving Certificate / Transfer Certificate",
        definition:
          "Issued by the Class 12 school, certifying that the candidate has left the school. Required at the time of college joining.",
      },
      {
        term: "Character Certificate / Conduct Certificate",
        definition:
          "Issued by the Class 12 school principal, certifying good conduct. Sometimes required at the time of college joining.",
      },
      {
        term: "Birth Certificate",
        definition:
          "Required as supplementary age proof if the Class 10 certificate does not clearly show date of birth.",
      },
      {
        term: "Affidavits",
        definition:
          "In some counselling processes, candidates need to submit notarized affidavits — for example, an Anti-Ragging Affidavit at the time of joining, or a Gap Year Affidavit if there has been a break in education.",
      },
      {
        term: "Income Certificate",
        definition:
          "Required for EWS and OBC/SEBC NCL eligibility, and for state scholarship schemes. Issued by the revenue authority of the candidate's state.",
      },
      {
        term: "Bank Account Details",
        definition:
          "Required for refund of any deposits, scholarships and stipends. The account should be in the candidate's name.",
      },
      {
        term: "NRI Documents",
        definition:
          "For NRI quota candidates: passport of the NRI sponsor (notarized), valid visa or OCI/PIO card (notarized), relationship proof between candidate and sponsor (birth certificate, family tree affidavit), address proof of the NRI in the country of residence, foreign bank remittance proof.",
      },
    ],
  },
  {
    id: "fees",
    eyebrow: "Section 9",
    title: "Fees, Bonds & Financial Terms",
    kind: "terms",
    terms: [
      {
        term: "Tuition Fee",
        definition:
          "The fee paid to the college for academic instruction. Varies by quota — government quota in govt colleges is the lowest, NRI quota is the highest.",
      },
      {
        term: "Annual Fee",
        definition:
          "The total fee paid per academic year — usually tuition + other recurring charges combined. MBBS is 4.5 years of academic study, so total course fee = 4.5 × annual fee + internship costs + other.",
      },
      {
        term: "Hostel Fee / Mess Fee",
        definition:
          "Charges for accommodation and meals at the college hostel. Typically ₹50,000 to ₹1,50,000 per year depending on the college and city.",
      },
      {
        term: "Caution Deposit / Security Deposit",
        definition:
          "A refundable amount collected at admission, returned at course completion if there is no damage or pending dues.",
      },
      {
        term: "Registration Fee",
        definition:
          "A non-refundable fee paid during counselling registration. Different from college fees.",
      },
      {
        term: "Counselling PIN (Personal Identification Number)",
        definition:
          "Used in some state counselling systems (notably ACPUGMEC Gujarat) — a unique number purchased from the counselling authority that enables registration and choice filling. Includes a registration fee component and a refundable security deposit.",
      },
      {
        term: "Bond / Service Bond",
        definition:
          "A legal undertaking that the candidate signs at the time of joining a government MBBS seat, committing to a specified period of rural or government service after MBBS completion. The bond amount is the penalty payable if the service obligation is not fulfilled. Each state has different bond rules (Gujarat: 1 year service / ₹20 lakh penalty; MP: 1 year / ₹10 lakh General + ₹5 lakh Reserved; etc.).",
      },
      {
        term: "Bond Penalty / Bond Amount",
        definition:
          "The monetary amount payable if a bonded candidate fails to complete the rural service. This is the principal financial commitment of the bond. Some states require a partial bank guarantee + undertaking at the time of joining.",
      },
      {
        term: "FRC (Fee Regulatory Committee)",
        definition:
          "The state-level authority that sets the maximum permissible fee that private medical colleges can charge for management quota, government quota in private colleges, and NRI quota seats. Each state has its own FRC. Colleges charging above the FRC-approved cap can be legally challenged.",
      },
      {
        term: "Management Quota Fee",
        definition:
          "The fee for seats filled under management quota — significantly higher than government quota in the same college. Set within FRC-approved limits.",
      },
      {
        term: "NRI Quota Fee",
        definition:
          "The fee for NRI quota seats — significantly higher than management quota in the same college. Sometimes quoted in USD. Typically ₹35-50 lakh per year.",
      },
      {
        term: "Refundable / Non-refundable Fee Components",
        definition:
          "Most college fee structures have both. Refundable components (caution deposit) are returned at course completion. Non-refundable components (tuition, registration fees) are not.",
      },
      {
        term: "Discontinuation Penalty",
        definition:
          "A separate penalty payable if a student joins MBBS and discontinues the course before completion — usually around ₹5 lakh in government colleges, designed to prevent seat blocking.",
      },
      {
        term: "Education Loan",
        definition:
          "A bank loan specifically for funding higher education. Major banks offer MBBS loans up to ₹40-50 lakh with moratorium during the course. Interest rates and collateral requirements vary by bank.",
      },
      {
        term: "Scholarship Schemes",
        definition:
          "State and central government schemes that reimburse all or part of the MBBS fees for eligible candidates — examples include MYSY (Gujarat), Post-Matric Scholarships (SC/ST), Means-cum-Merit Scholarship, Kanya Kelavani.",
      },
    ],
  },
  {
    id: "state-terms",
    eyebrow: "Section 10",
    title: "State-Specific Terms (GJ · RJ · MP · MH)",
    description:
      "Gujarat entries are expanded where Dravio has the most verified counselling data; confirm RJ, MP and MH rules on the official state portals each season.",
    kind: "groups",
    groups: [
      {
        label: "Gujarat",
        terms: [
          {
            term: "SEBC (Gujarat)",
            definition:
              "Gujarat's term for OBC — see Reservation Categories. State counselling uses SEBC, not central OBC labels, with the same 27% vertical reservation when eligible.",
          },
          {
            term: "ACPUGMEC (Gujarat)",
            definition:
              "State counselling authority for Gujarat — see Counselling Bodies & Authorities. Portal: medadmgujarat.org.",
          },
          {
            term: "GMERS (Gujarat)",
            definition:
              "Semi-government college tier unique to Gujarat — see College Types & Classifications.",
          },
          {
            term: "MYSY (Mukhyamantri Yuva Swavalamban Yojana)",
            definition:
              "Gujarat state scholarship for students from families with annual income below ₹6 lakh, providing fee reimbursement for higher education including MBBS.",
          },
          {
            term: "Kanya Kelavani",
            definition:
              "Gujarat state scheme providing additional support for girl students in government colleges.",
          },
          {
            term: "Local Quota (Gujarat)",
            definition:
              "Sub-quota in Smt. NHL Municipal Medical College (Ahmedabad) and SMIMER (Surat) for residents of the respective municipal corporation areas.",
          },
        ],
      },
      {
        label: "Rajasthan",
        terms: [
          {
            term: "RUHS (Rajasthan)",
            definition:
              "State counselling authority — see Counselling Bodies & Authorities. Portal: ruhsraj.org.",
          },
          {
            term: "Rajasthan Bonafide Resident",
            definition:
              "The Rajasthan term for domicile, requiring a Rajasthan domicile certificate issued by the competent authority. Must be the candidate or the candidate's parent.",
          },
        ],
      },
      {
        label: "Madhya Pradesh",
        terms: [
          {
            term: "DMAT MP (counselling)",
            definition:
              "State counselling authority — see Counselling Bodies & Authorities. Note that \"DMAT\" can also refer to the older entrance exam discontinued after NEET became mandatory.",
          },
          {
            term: "MP Bonafide",
            definition:
              "Domicile status proven by birth in MP, passing qualifying examination from MP, or permanent residency of parents.",
          },
        ],
      },
      {
        label: "Maharashtra",
        terms: [
          {
            term: "CET Cell Maharashtra",
            definition:
              "State counselling authority — see Counselling Bodies & Authorities.",
          },
          {
            term: "MUHS (Maharashtra University of Health Sciences)",
            definition:
              "The state-level health sciences university to which most medical colleges in Maharashtra are affiliated.",
          },
          {
            term: "Maharashtra Domicile",
            definition:
              "Generally requires either 15 years of parents' residence in Maharashtra or Class 10 and 12 from a Maharashtra board school.",
          },
        ],
      },
    ],
  },
  {
    id: "regulatory",
    eyebrow: "Section 11",
    title: "Regulatory & Recognition Bodies",
    kind: "terms",
    terms: [
      {
        term: "NMC (National Medical Commission)",
        definition:
          "The apex regulator of medical education and practice in India, replacing the older Medical Council of India (MCI) in 2020. Approves new medical colleges, sets minimum standards, regulates seat additions and maintains the register of qualified doctors. Their website is nmc.org.in.",
      },
      {
        term: "MCI (Medical Council of India)",
        definition:
          "The earlier statutory body that regulated medical education in India until 2020, when it was replaced by NMC. Some legacy documentation may still refer to MCI.",
      },
      {
        term: "MoHFW (Ministry of Health and Family Welfare)",
        definition:
          "The central government ministry under which the Medical Counselling Committee (MCC) operates and which oversees medical education policy in India.",
      },
      {
        term: "Ministry of Education",
        definition:
          "The central ministry under which NTA operates and which conducts NIRF rankings.",
      },
      {
        term: "UGC (University Grants Commission)",
        definition:
          "The body that grants deemed-to-be-university status to higher education institutions, including some medical colleges.",
      },
      {
        term: "NBE / NBEMS (National Board of Examinations in Medical Sciences)",
        definition:
          "Conducts NEET PG, FMGE (until phased out by NEXT), and other postgraduate medical entrance and licensing exams.",
      },
      {
        term: "State Medical Council",
        definition:
          "The state-level body where MBBS graduates register to obtain a practice license in that state. Required before legally practicing medicine.",
      },
      {
        term: "WHO (World Health Organization)",
        definition:
          "The global body whose listing of medical universities is sometimes referenced for foreign medical graduates seeking to practice in India. NMC has its own approved list for FMGE eligibility.",
      },
      {
        term: "WFME (World Federation for Medical Education)",
        definition:
          "The global standards body whose accreditation of foreign medical schools matters for ECFMG certification (relevant for those aiming at the US).",
      },
    ],
  },
  {
    id: "post-mbbs",
    eyebrow: "Section 12",
    title: "Post-MBBS Terms",
    kind: "terms",
    terms: [
      {
        term: "Internship / Compulsory Rotating Medical Internship (CRMI)",
        definition:
          "The mandatory one-year clinical training program every MBBS graduate must complete after the academic course, before being eligible for licensing. Typically completed at the same college where MBBS was done, or at an attached teaching hospital.",
      },
      {
        term: "Provisional Registration",
        definition:
          "Granted by the State Medical Council to MBBS graduates allowing them to undertake internship under supervision.",
      },
      {
        term: "Permanent Registration",
        definition:
          'Granted by the State Medical Council after successful completion of internship, allowing the graduate to practice medicine independently and be addressed as "Dr."',
      },
      {
        term: "FMGE (Foreign Medical Graduate Examination)",
        definition:
          "A licensing exam conducted by NBE that foreign MBBS graduates must pass to practice in India. Will be replaced by NEXT when implemented.",
      },
      {
        term: "NEET PG",
        definition:
          "The postgraduate entrance exam for MD, MS, MDS and Diploma admissions in India. Conducted by NBEMS. Will be replaced by the NEXT exam Stage 2 when implemented.",
      },
      {
        term: "MD (Doctor of Medicine)",
        definition:
          "A three-year postgraduate degree in non-surgical medical specialties such as Internal Medicine, Pediatrics, Radiology, Anaesthesia, Psychiatry, Pathology, etc.",
      },
      {
        term: "MS (Master of Surgery)",
        definition:
          "A three-year postgraduate degree in surgical specialties such as General Surgery, Orthopaedics, ENT, Ophthalmology, OBG, etc.",
      },
      {
        term: "DNB (Diplomate of National Board)",
        definition:
          "A postgraduate qualification equivalent to MD/MS, awarded by the National Board after completion of training in accredited hospitals (often private institutions). NMC recognizes DNB as equivalent to MD/MS.",
      },
      {
        term: "DM (Doctor of Medicine — Super-Speciality)",
        definition:
          "A three-year super-specialty qualification after MD, in fields like Cardiology, Neurology, Nephrology, Gastroenterology, etc.",
      },
      {
        term: "MCh (Master of Chirurgiae)",
        definition:
          "A three-year super-specialty qualification after MS, in fields like Cardiothoracic Surgery, Neurosurgery, Urology, etc.",
      },
      {
        term: "Bond Service / Rural Service",
        definition:
          "The mandatory rural or government posting that bonded MBBS / PG / Super-specialty graduates must serve as per the bond signed at admission. Duration and stipend vary by state and degree level.",
      },
    ],
  },
];

export const TERMS_EXPLAINED_VERIFICATION_NOTE =
  "Verified against: NMC, MCC, NTA and the official portals of ACPUGMEC, RUHS, DMAT MP and CET Cell Maharashtra.";

export const TERMS_EXPLAINED_RELATED_LINKS = [
  {
    label: "MCC counselling guide",
    href: "/neet-ug-2026/counselling-guide",
    icon: "account_balance",
    desc: "Registration, rounds, choice filling, and reporting for AIQ.",
  },
  {
    label: "Reservation & NRI guide",
    href: "/neet-ug-2026/nri-guide",
    icon: "public",
    desc: "Category certificates, NRI quota, and domicile rules.",
  },
  {
    label: "Live updates",
    href: "/neet-ug-2026/updates",
    icon: "campaign",
    desc: "2026 cycle notifications and round alerts as they drop.",
  },
  {
    label: "Cutoff analyser",
    href: "/cutoff-analyser",
    icon: "query_stats",
    desc: "Safe, borderline, and reach colleges for your score.",
  },
] as const;
