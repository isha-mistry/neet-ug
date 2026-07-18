import { requireAdminBearer } from "@/lib/admin/auth";
import {
  listAdminLeads,
  parseAdminLeadsListParams,
} from "@/lib/admin/leads-query";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const auth = requireAdminBearer(request);
  if (!auth.ok) return auth.response;

  const { searchParams } = new URL(request.url);
  const params = parseAdminLeadsListParams(searchParams);

  try {
    const result = await listAdminLeads(params);
    return Response.json(result);
  } catch (error) {
    console.error("[admin/leads] list failed", error);
    return Response.json({ error: "Failed to load leads" }, { status: 500 });
  }
}
