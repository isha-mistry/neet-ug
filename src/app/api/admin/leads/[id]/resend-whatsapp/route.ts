import { NextResponse } from "next/server";
import { requireAdminBearer } from "@/lib/admin/auth";
import { getAdminLeadById } from "@/lib/admin/leads-query";
import { resendLeadWhatsApp } from "@/lib/admin/resend-lead-whatsapp";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

/** POST — send (or retry) this lead's form-type WhatsApp message now. */
export async function POST(request: Request, context: RouteContext) {
  const auth = requireAdminBearer(request);
  if (!auth.ok) return auth.response;

  const { id } = await context.params;
  if (!id?.trim()) {
    return NextResponse.json({ error: "Missing lead id" }, { status: 400 });
  }

  try {
    const result = await resendLeadWhatsApp(id.trim());
    const lead = await getAdminLeadById(id.trim());
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error, lead },
        { status: result.status },
      );
    }
    return NextResponse.json({ ok: true, lead });
  } catch (error) {
    console.error("[admin/leads/:id/resend-whatsapp]", error);
    return NextResponse.json(
      { error: "Failed to send WhatsApp message" },
      { status: 500 },
    );
  }
}
