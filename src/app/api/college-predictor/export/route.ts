import { NextResponse } from "next/server";
import {
  computeUnlockedResult,
  validateCollegePredictorInput,
} from "@/lib/college-predictor/compute";
import { buildCollegePredictorWorkbook } from "@/lib/college-predictor/export-xlsx";
import { findPurchasedPlanEntitlement } from "@/lib/college-predictor/plan-entitlement";
import { getCollegePredictorSession } from "@/lib/college-predictor/session";

export const runtime = "nodejs";

/**
 * Download Excel shortlist for purchased-plan users.
 * Requires verified college-predictor session (name + mobile) matching a purchased Lead.
 */
export async function GET() {
  const session = await getCollegePredictorSession();
  if (!session) {
    return NextResponse.json(
      { error: "Unlock your college list first, then download the Excel shortlist." },
      { status: 401 },
    );
  }

  const entitlement = await findPurchasedPlanEntitlement({
    phone: session.phone,
    countryCode: session.countryCode,
  });

  if (!entitlement.entitled) {
    return NextResponse.json(
      {
        error:
          "Excel export is available after your counselling plan purchase is confirmed.",
      },
      { status: 403 },
    );
  }

  const validated = validateCollegePredictorInput({
    air: session.air,
    category: session.category,
    stateSlug: session.stateSlug,
  });
  if (!validated.ok) {
    return NextResponse.json({ error: validated.message }, { status: 400 });
  }

  try {
    const unlocked = await computeUnlockedResult(validated.input);
    const buffer = await buildCollegePredictorWorkbook(unlocked);
    const filename = `dravio-college-shortlist-${session.air}.xlsx`;

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[college-predictor/export]", error);
    return NextResponse.json(
      { error: "Failed to build Excel export" },
      { status: 500 },
    );
  }
}
