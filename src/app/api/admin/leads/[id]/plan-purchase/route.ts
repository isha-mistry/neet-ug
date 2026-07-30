import { NextResponse } from "next/server";
import { requireAdminBearer } from "@/lib/admin/auth";
import { getAdminLeadById } from "@/lib/admin/leads-query";
import { setLeadPlanPurchased } from "@/lib/admin/plan-purchase";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

type Body = {
  purchased?: boolean;
};

/** PATCH — manually mark / unmark offline plan purchase. */
export async function PATCH(request: Request, context: RouteContext) {
  const auth = requireAdminBearer(request);
  if (!auth.ok) return auth.response;

  const { id } = await context.params;
  if (!id?.trim()) {
    return NextResponse.json({ error: "Missing lead id" }, { status: 400 });
  }

  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    body = {};
  }

  if (typeof body.purchased !== "boolean") {
    return NextResponse.json(
      { error: "Body must include { purchased: boolean }" },
      { status: 400 },
    );
  }

  try {
    const result = await setLeadPlanPurchased(id.trim(), body.purchased);
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }
    const lead = await getAdminLeadById(id.trim());
    return NextResponse.json({ ok: true, lead });
  } catch (error) {
    console.error("[admin/leads/:id/plan-purchase]", error);
    return NextResponse.json(
      { error: "Failed to update purchase status" },
      { status: 500 },
    );
  }
}
