import { requireAdminBearer } from "@/lib/admin/auth";
import { getLatestNoticePreview } from "@/lib/admin/broadcast-notice";

export const runtime = "nodejs";

/** GET — preview latest notice feed item + purchased recipient counts. */
export async function GET(request: Request) {
  const auth = requireAdminBearer(request);
  if (!auth.ok) return auth.response;

  try {
    const preview = await getLatestNoticePreview();
    return Response.json(preview);
  } catch (error) {
    console.error("[admin/plans/latest-notice]", error);
    return Response.json(
      { error: "Failed to load latest notice" },
      { status: 500 },
    );
  }
}
