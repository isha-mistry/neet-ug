import { requireAdminBearer } from "@/lib/admin/auth";
import {
  listAdminPlanLeads,
  parseAdminPlanLeadsListParams,
} from "@/lib/admin/plans-query";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const auth = requireAdminBearer(request);
  if (!auth.ok) return auth.response;

  const { searchParams } = new URL(request.url);
  const params = parseAdminPlanLeadsListParams(searchParams);

  try {
    const result = await listAdminPlanLeads(params);
    return Response.json(result);
  } catch (error) {
    console.error("[admin/plans] list failed", error);
    return Response.json({ error: "Failed to load plan leads" }, { status: 500 });
  }
}
