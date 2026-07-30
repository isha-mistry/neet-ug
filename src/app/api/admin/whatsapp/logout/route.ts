import { NextResponse } from "next/server";
import { requireAdminBearer } from "@/lib/admin/auth";
import {
  EvolutionApiError,
  EvolutionClient,
  getEvolutionClientConfig,
} from "@/lib/notifications/evolution-client";

export const runtime = "nodejs";

type LogoutBody = {
  /** When true, delete the Evolution instance after logout. */
  deleteInstance?: boolean;
};

/**
 * Disconnect WhatsApp from the Evolution instance.
 * Optionally remove the instance so a fresh setup is required next time.
 */
export async function POST(request: Request) {
  const auth = requireAdminBearer(request);
  if (!auth.ok) return auth.response;

  const config = getEvolutionClientConfig();
  if (!config) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Evolution is not configured. Set EVOLUTION_API_URL, EVOLUTION_API_KEY, and EVOLUTION_INSTANCE_NAME.",
      },
      { status: 503 },
    );
  }

  let deleteInstance = false;
  try {
    const body = (await request.json().catch(() => ({}))) as LogoutBody;
    deleteInstance = body.deleteInstance === true;
  } catch {
    // empty body → logout only
  }

  const client = new EvolutionClient(config);

  try {
    await client.logoutInstance();
    if (deleteInstance) {
      await client.deleteInstance();
    }

    let state = "close";
    if (!deleteInstance) {
      try {
        const connection = await client.getConnectionState();
        state = connection.state;
      } catch {
        state = "close";
      }
    }

    return NextResponse.json({
      ok: true,
      instanceName: client.instanceName,
      deleted: deleteInstance,
      state,
      connected: state.toLowerCase() === "open",
    });
  } catch (error) {
    const message =
      error instanceof EvolutionApiError
        ? error.message
        : error instanceof Error
          ? error.message
          : "Logout failed";
    console.error("[admin/whatsapp/logout]", error);
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
