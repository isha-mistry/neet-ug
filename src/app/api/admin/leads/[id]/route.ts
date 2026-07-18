import { requireAdminBearer } from "@/lib/admin/auth";
import { getAdminLeadById } from "@/lib/admin/leads-query";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const auth = requireAdminBearer(request);
  if (!auth.ok) return auth.response;

  const { id } = await context.params;
  if (!id?.trim()) {
    return Response.json({ error: "Missing lead id" }, { status: 400 });
  }

  try {
    const lead = await getAdminLeadById(id.trim());
    if (!lead) {
      return Response.json({ error: "Lead not found" }, { status: 404 });
    }
    return Response.json(lead);
  } catch (error) {
    console.error("[admin/leads/:id] get failed", error);
    return Response.json({ error: "Failed to load lead" }, { status: 500 });
  }
}
