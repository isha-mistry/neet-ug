import rawData from "@/data/neet-ug-2026.json";

export interface OfficialNotice {
  headline: string;
  subtext: string;
  examDate: string;
  originalExamDate: string;
  warning: string;
}

export interface SeatStats {
  mbbs: {
    total: number;
    newSeatsAY2526: number;
    government: number;
    privateDeemed: number;
  };
  bds: {
    total: number;
    government: number;
    privateDeemed: number;
  };
  ayush: {
    bams: { government: number; deemed: number };
    bhms: { government: number; deemed: number };
    bsms: { government: number };
    bums: { government: number };
  };
  nursing: {
    mcc: { total: number };
    aiims: { total: number };
    ruhsRajasthan: { total: number; government: number };
  };
  bvsc: {
    totalGovtAllIndia: number;
    note: string;
  };
  ruhsParamedical: {
    radiationTech: number;
    medicalLabTech: number;
    ophthalmicTech: number;
    physiotherapy: number;
  };
}

export interface SubjectWeightage {
  questions: number;
  marks: number;
  weightagePercent: number;
}

export interface MarksDistribution {
  totalQuestions: number;
  totalMarks: number;
  durationMinutes: number;
  markingScheme: string;
  subjects: {
    physics: SubjectWeightage;
    chemistry: SubjectWeightage;
    biology: SubjectWeightage;
  };
}

export interface HighYieldChapter {
  name: string;
  priority: "Very High" | "High";
  reason: string;
  branch?: string;
  unit?: string;
}

export interface HighYieldChapters {
  physics: HighYieldChapter[];
  chemistry: HighYieldChapter[];
  biology: {
    botany: HighYieldChapter[];
    zoology: HighYieldChapter[];
  };
}

export interface ExpectedCutoff {
  category: string;
  percentile: string;
  score: string;
  status: string;
}

export interface NeetUg2026Data {
  officialNotice: OfficialNotice;
  seatStatistics: SeatStats;
  syllabus: {
    marksDistribution: MarksDistribution;
    highYieldChapters: HighYieldChapters;
  };
  expectedCutoffs: ExpectedCutoff[];
}

export const neetUg2026Data = rawData as unknown as NeetUg2026Data;
