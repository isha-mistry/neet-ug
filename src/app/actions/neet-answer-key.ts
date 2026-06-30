"use server";

import { prisma } from "@/lib/db/prisma";
import { reportAppError } from "@/lib/sentry/error-reporter";

export interface AnswerKeyRow {
  questionNo: number;
  answer: string;
  subject: string;
}

export async function fetchNeetAnswerKeyAction(paperCode: string = "50"): Promise<{
  success: boolean;
  data?: AnswerKeyRow[];
  pdfUrl?: string | null;
  error?: string;
}> {
  try {
    const [keys, paper] = await Promise.all([
      prisma.neetAnswerKey.findMany({
        where: { paperCode, year: 2026 },
        orderBy: { questionNo: "asc" },
        select: {
          questionNo: true,
          answer: true,
          subject: true,
        },
      }),
      prisma.neetAnswerKeyPaper.findUnique({
        where: {
          year_paperCode: {
            year: 2026,
            paperCode,
          },
        },
        select: {
          pdfUrl: true,
        },
      }),
    ]);

    return { success: true, data: keys, pdfUrl: paper?.pdfUrl || null };
  } catch (error) {
    console.error("[fetchNeetAnswerKeyAction]", error);
    reportAppError(error, {
      module: "catalog",
      feature: "neet_answer_key",
      action: "fetchNeetAnswerKeyAction",
      serverAction: "fetchNeetAnswerKeyAction",
      metadata: { paperCode },
    });
    return { success: false, error: "Failed to fetch NEET answer keys." };
  }
}
