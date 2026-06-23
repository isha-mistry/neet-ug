"use client";

import React, { useState } from "react";
import { Container } from "@/components/common/Container";
import { guideCardClass, hubCardHoverClass } from "@/lib/neet-ug-2026/section-styles";
import { cn } from "@/lib/utils";

interface Course {
  id: string;
  name: string;
  fullName: string;
  duration: string;
  eligibility: string;
  scope: string;
  higherEd: string;
  demand: "Critical" | "High" | "Moderate";
  description: string;
  category: "clinical" | "ayush" | "allied" | "nursing" | "veterinary";
}

const COURSES: Course[] = [
  {
    id: "mbbs",
    name: "MBBS",
    fullName: "Bachelor of Medicine & Bachelor of Surgery",
    duration: "5.5 Years (Incl. 1 Year Internship)",
    eligibility: "10+2 with PCB (min 50% for Gen, 40% for Reserved) & NEET Qualified",
    scope: "General Physician, Medical Officer, Specialist Doctor, Hospital Administrator",
    higherEd: "MD (Medicine), MS (Surgery), DNB, Fellowships, MBA in Healthcare",
    demand: "Critical",
    description: "The gold standard of medical education in India, training students in modern medicine, surgery, and diagnostics.",
    category: "clinical"
  },
  {
    id: "bds",
    name: "BDS",
    fullName: "Bachelor of Dental Surgery",
    duration: "5 Years (Incl. 1 Year Internship)",
    eligibility: "10+2 with PCB (min 50% for Gen, 40% for Reserved) & NEET Qualified",
    scope: "Dental Surgeon, Cosmetologist, Dental Consultant, Public Health Dentist",
    higherEd: "MDS (Master of Dental Surgery), Fellowship in Oral Implantology",
    demand: "High",
    description: "Focuses on dental health, diagnostics, corrective surgery, and aesthetic oral procedures.",
    category: "clinical"
  },
  {
    id: "bams",
    name: "BAMS",
    fullName: "Bachelor of Ayurvedic Medicine & Surgery",
    duration: "5.5 Years (Incl. 1 Year Internship)",
    eligibility: "10+2 with PCB (min 50%) & NEET Qualified",
    scope: "Ayurvedic Medical Officer, Panchakarma Specialist, Research Scientist",
    higherEd: "MD / MS in Ayurveda, M.Sc Anatomy/Physiology, MBA Healthcare",
    demand: "High",
    description: "Integrates traditional Ayurvedic concepts with modern medical sciences, seeing immense national and global growth.",
    category: "ayush"
  },
  {
    id: "bhms",
    name: "BHMS",
    fullName: "Bachelor of Homeopathic Medicine & Surgery",
    duration: "5.5 Years (Incl. 1 Year Internship)",
    eligibility: "10+2 with PCB (min 50%) & NEET Qualified",
    scope: "Homeopathic Physician, Wellness Consultant, Research Officer",
    higherEd: "MD in Homeopathy, M.Sc in clinical research, MBA Healthcare",
    demand: "Moderate",
    description: "Covers the holistic science of homeopathy, emphasizing patient-centric alternative medicine.",
    category: "ayush"
  },
  {
    id: "bums",
    name: "BUMS",
    fullName: "Bachelor of Unani Medicine & Surgery",
    duration: "5.5 Years (Incl. 1 Year Internship)",
    eligibility: "10+2 with PCB (min 50%) with Urdu in 10th/12th & NEET Qualified",
    scope: "Unani Practitioner, Hakeem, Medical Officer in AYUSH hospitals",
    higherEd: "MD in Unani Medicine, M.Sc, MBA in Hospital Management",
    demand: "Moderate",
    description: "Focuses on the Unani system of medicine based on the principles of humors and natural healing elements.",
    category: "ayush"
  },
  {
    id: "bsms",
    name: "BSMS",
    fullName: "Bachelor of Siddha Medicine & Surgery",
    duration: "5.5 Years (Incl. 1 Year Internship)",
    eligibility: "10+2 with PCB (min 50%) & NEET Qualified (Tamil language preferred/required in some states)",
    scope: "Siddha Physician, Medical Officer, Wellness Consultant",
    higherEd: "MD in Siddha, M.Sc, MPH (Master of Public Health)",
    demand: "Moderate",
    description: "An ancient system of medicine native to South India, emphasizing herbs, minerals, and dietary regulations.",
    category: "ayush"
  },
  {
    id: "bvsc",
    name: "BVSc & AH",
    fullName: "Bachelor of Veterinary Science & Animal Husbandry",
    duration: "5.5 Years (Incl. 1 Year Internship)",
    eligibility: "10+2 with PCB (min 50%) & NEET Qualified (VCI conducts counselling)",
    scope: "Veterinary Surgeon, Livestock Development Officer, Zoo/Wildlife Veterinarian",
    higherEd: "MVSc (Master of Veterinary Science), PhD, Post-grad Diploma",
    demand: "High",
    description: "Dedicated to the health, medical care, surgery, and breeding of domestic, farm, and wild animals.",
    category: "veterinary"
  },
  {
    id: "nursing",
    name: "B.Sc Nursing",
    fullName: "Bachelor of Science in Nursing",
    duration: "4 Years (Incl. Practical Training)",
    eligibility: "10+2 with PCB (min 45% aggregate in PCB) & NEET score (used by some universities)",
    scope: "Registered Nurse, ICU/Critical Care Specialist, Nurse Educator, Nurse Administrator",
    higherEd: "M.Sc Nursing, Nurse Practitioner (NP), MBA Healthcare, PhD",
    demand: "Critical",
    description: "A crucial clinical support profession involving direct patient care, hospital management, and emergency response.",
    category: "nursing"
  },
  {
    id: "bpt",
    name: "BPT",
    fullName: "Bachelor of Physiotherapy",
    duration: "4.5 Years (Incl. 6 Months Internship)",
    eligibility: "10+2 with PCB (min 50% aggregate in PCB)",
    scope: "Physiotherapist, Sports Therapist, Rehabilitation Consultant, Ergonomics Advisor",
    higherEd: "MPT (Master of Physiotherapy), MBA Hospital Management, PhD",
    demand: "High",
    description: "Specializes in physical therapy, movement science, orthopedic/neurological rehabilitation, and sports injury management.",
    category: "allied"
  },
  {
    id: "bot",
    name: "BOT",
    fullName: "Bachelor of Occupational Therapy",
    duration: "4.5 Years (Incl. 6 Months Internship)",
    eligibility: "10+2 with PCB (min 50%)",
    scope: "Occupational Therapist, Pediatric Therapist, Industrial Consultant, Rehabilitation Specialist",
    higherEd: "MOT (Master of Occupational Therapy), PhD",
    demand: "Moderate",
    description: "Helps patients with physical or mental barriers recover daily living skills and work-related functions.",
    category: "allied"
  },
  {
    id: "boptom",
    name: "B.Optom",
    fullName: "Bachelor of Optometry",
    duration: "4.5 Years (3 Years Academic + 1 Year Internship)",
    eligibility: "10+2 with PCB/PCM (min 50%)",
    scope: "Optometrist, Refractionist, Vision Care Consultant, Lab Manager",
    higherEd: "M.Optom, Fellowships in Cornea/Contact Lens, PhD",
    demand: "High",
    description: "Examines eyes, diagnoses vision defects, prescribes corrective lenses, and manages secondary vision disorders.",
    category: "allied"
  },
  {
    id: "bmlt",
    name: "BMLT",
    fullName: "Bachelor of Medical Laboratory Technology",
    duration: "3 Years + 6 Months Internship",
    eligibility: "10+2 with PCB (min 50%)",
    scope: "Medical Lab Technologist, Pathology Lab Manager, Lab Quality Manager",
    higherEd: "M.Sc MLT, PG Diploma in Medical Diagnostics, MBA",
    demand: "High",
    description: "Focuses on pathological testing, blood chemistry analysis, microbiological culture, and diagnostics.",
    category: "allied"
  },
  {
    id: "radiology",
    name: "B.Sc Radiology & Imaging",
    fullName: "B.Sc in Medical Radiology & Imaging Technology",
    duration: "3 Years + 6 Months Internship",
    eligibility: "10+2 with PCB (min 50%)",
    scope: "Radiology Technologist, MRI/CT Scan Specialist, Ultrasonography Assistant",
    higherEd: "M.Sc in Medical Imaging Technology, MBA, PhD",
    demand: "High",
    description: "Teaches the operation of medical imaging scanners like X-Ray, CT scan, MRI, and Ultrasound for diagnostic accuracy.",
    category: "allied"
  },
  {
    id: "ott",
    name: "B.Sc Operation Theatre Tech",
    fullName: "B.Sc in Operation Theatre & Anaesthesia Technology",
    duration: "3 Years + 6 Months Internship",
    eligibility: "10+2 with PCB (min 50%)",
    scope: "Operation Theatre Technologist, Anaesthesia Assistant, Surgical Tech Coordinator",
    higherEd: "M.Sc in Surgical/OT Technology, MBA in Healthcare",
    demand: "High",
    description: "Involves preparing operation theatres, managing surgical sterile setups, and assisting anaesthesiologists.",
    category: "allied"
  }
];

interface ExpandableRowProps {
  label: string;
  value: string;
  valueClassName?: string;
}

function ExpandableRow({ label, value, valueClassName }: ExpandableRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex justify-between items-center gap-2 cursor-pointer select-none transition-all duration-200 py-1 px-2 -mx-2 rounded-lg",
          "hover:bg-primary/5 active:scale-[0.99]",
        )}
        title={isExpanded ? "Click to collapse" : "Click to view detail"}
      >
        <span className="text-on-surface-variant font-medium shrink-0 flex items-center gap-1">
          <span
            className={cn(
              "material-symbols-outlined text-[16px] text-on-surface-variant/60 transition-transform duration-200",
              isExpanded && "rotate-180 text-primary"
            )}
          >
            expand_more
          </span>
          {label}
        </span>
        
        {!isExpanded && (
          <span
            className={cn(
              "font-bold leading-tight truncate max-w-[160px] text-right",
              valueClassName
            )}
          >
            {value}
          </span>
        )}
      </div>

      {isExpanded && (
        <div
          onClick={() => setIsExpanded(false)}
          className="mt-1 px-3 py-2.5 rounded-xl bg-surface-container-high/40 border border-outline-variant/40 text-left text-xs font-semibold leading-relaxed text-on-surface cursor-pointer hover:bg-surface-container-high/60 transition-colors"
        >
          {value}
        </div>
      )}
    </div>
  );
}

export function CareerExplorer() {
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>("all");

  const filteredCourses = selectedCategoryTab === "all"
    ? COURSES
    : COURSES.filter(c => c.category === selectedCategoryTab);

  return (
    <section className="py-16 bg-surface-container-lowest border-y border-outline-variant/40">
      <Container size="page">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-black text-on-surface md:text-4xl tracking-tight">
            Healthcare Career Explorer
          </h2>
          <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
            Explore 14 primary clinical, traditional, and allied health courses available in India. Compare their duration, demand, and future prospects side-by-side.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-outline-variant/60 pb-5">
          {[
            { id: "all", label: "All Careers", icon: "grid_view" },
            { id: "clinical", label: "Clinical (MBBS/BDS)", icon: "healing" },
            { id: "ayush", label: "AYUSH Science", icon: "spa" },
            { id: "allied", label: "Allied Health", icon: "settings_accessibility" },
            { id: "nursing", label: "Nursing Care", icon: "medical_services" },
            { id: "veterinary", label: "Veterinary Sci", icon: "pets" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategoryTab(tab.id)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95",
                selectedCategoryTab === tab.id
                  ? "bg-primary text-on-primary shadow-xs"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
              )}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Explorer Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={cn(
                guideCardClass,
                hubCardHoverClass,
                "flex flex-col justify-between"
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black text-on-surface">{course.name}</h3>
                  <span className={cn(
                    "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm border font-semibold",
                    course.demand === "Critical"
                      ? "bg-red-50 text-red-700 border-red-200"
                      : course.demand === "High"
                        ? "bg-orange-50 text-orange-700 border-orange-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                  )}>
                    {course.demand} Demand
                  </span>
                </div>

                <h4 className="text-xs font-extrabold text-primary mb-3 leading-snug">{course.fullName}</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-6">{course.description}</p>

                <div className="space-y-3 text-xs mb-6 border-t border-outline-variant/40 pt-4">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant font-medium">Duration:</span>
                    <span className="font-bold text-on-surface text-right">{course.duration}</span>
                  </div>
                  <ExpandableRow
                    label="Eligibility:"
                    value={course.eligibility}
                    valueClassName="text-on-surface"
                  />
                  <ExpandableRow
                    label="Higher Ed:"
                    value={course.higherEd}
                    valueClassName="text-primary"
                  />
                </div>
              </div>

              <div className="mt-auto border-t border-outline-variant/40 pt-4">
                <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Primary Scope</div>
                <p className="text-[11px] leading-relaxed text-on-surface-variant italic font-medium">{course.scope}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

