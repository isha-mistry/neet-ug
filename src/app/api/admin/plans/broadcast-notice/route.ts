import { requireAdminBearer } from "@/lib/admin/auth";
import { broadcastLatestNoticeAlert } from "@/lib/admin/broadcast-notice";

export const runtime = "nodejs";

/** POST — WhatsApp the latest notice feed item to purchased plan leads. */
export async function POST(request: Request) {
  const auth = requireAdminBearer(request);
  if (!auth.ok) return auth.response;

  try {
    const result = await broadcastLatestNoticeAlert();
    if (!result.ok) {
      return Response.json(
        { error: result.error },
        { status: result.status },
      );
    }
    return Response.json(result);
  } catch (error) {
    console.error("[admin/plans/broadcast-notice]", error);
    return Response.json(
      { error: "Failed to broadcast notice alert" },
      { status: 500 },
    );
  }
}
