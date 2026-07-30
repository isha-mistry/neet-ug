import { NextResponse } from "next/server";
import { requireAdminBearer } from "@/lib/admin/auth";
import { getAdminLeadById } from "@/lib/admin/leads-query";
import { sendLeadPlanInfo } from "@/lib/admin/plan-purchase";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

/** POST — send plan fulfillment WhatsApp (updates + checklist + predictor). */
export async function POST(request: Request, context: RouteContext) {
  const auth = requireAdminBearer(request);
  if (!auth.ok) return auth.response;

  const { id } = await context.params;
  if (!id?.trim()) {
    return NextResponse.json({ error: "Missing lead id" }, { status: 400 });
  }

  try {
    const result = await sendLeadPlanInfo(id.trim());
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status ?? 400 },
      );
    }
    const lead = await getAdminLeadById(id.trim());
    return NextResponse.json({
      ok: true,
      providerMsgId: result.providerMsgId,
      lead,
    });
  } catch (error) {
    console.error("[admin/leads/:id/send-plan-info]", error);
    return NextResponse.json(
      { error: "Failed to send plan info" },
      { status: 500 },
    );
  }
}
