import { NextResponse } from "next/server";
import { requireAdminBearer } from "@/lib/admin/auth";
import {
  EvolutionApiError,
  EvolutionClient,
  getEvolutionClientConfig,
} from "@/lib/notifications/evolution-client";

export const runtime = "nodejs";

/**
 * Start / refresh WhatsApp link credentials (QR code) for the configured instance.
 * Creates the instance first if needed.
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

  let phoneDigits: string | undefined;
  try {
    const body = (await request.json().catch(() => ({}))) as {
      phone?: string;
    };
    if (typeof body.phone === "string" && body.phone.trim()) {
      phoneDigits = body.phone.replace(/\D/g, "");
    }
  } catch {
    // no body is fine for QR-only connect
  }

  const client = new EvolutionClient(config);

  try {
    await client.createInstance();

    const state = await client.getConnectionState();
    if (state.state.toLowerCase() === "open") {
      return NextResponse.json({
        ok: true,
        alreadyConnected: true,
        instanceName: client.instanceName,
        state: state.state,
        connected: true,
        qrDataUrl: null,
        pairingCode: null,
      });
    }

    const link = await client.getLinkCredentials("qr", phoneDigits);
    return NextResponse.json({
      ok: true,
      alreadyConnected: false,
      instanceName: client.instanceName,
      state: state.state,
      connected: false,
      qrDataUrl: link.qrDataUrl,
      pairingCode: link.pairingCode ?? null,
      code: link.code ?? null,
      count: link.count ?? null,
    });
  } catch (error) {
    const message =
      error instanceof EvolutionApiError
        ? error.message
        : error instanceof Error
          ? error.message
          : "Failed to get WhatsApp QR";
    console.error("[admin/whatsapp/connect]", error);
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
