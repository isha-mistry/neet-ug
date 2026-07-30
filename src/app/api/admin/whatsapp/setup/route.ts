import { NextResponse } from "next/server";
import { requireAdminBearer } from "@/lib/admin/auth";
import {
  buildEvolutionWebhookUrl,
  EvolutionApiError,
  EvolutionClient,
  getEvolutionClientConfig,
} from "@/lib/notifications/evolution-client";

export const runtime = "nodejs";

/**
 * Ensure the Evolution instance exists and (optionally) register the webhook.
 * Safe to call repeatedly — createInstance is idempotent when the name exists.
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

  const client = new EvolutionClient(config);
  const webhookUrl = buildEvolutionWebhookUrl();

  try {
    await client.createInstance();
    if (webhookUrl) {
      await client.setWebhook(webhookUrl);
    }

    const state = await client.getConnectionState();
    return NextResponse.json({
      ok: true,
      instanceName: client.instanceName,
      webhookConfigured: Boolean(webhookUrl),
      webhookUrl: webhookUrl
        ? webhookUrl.replace(/token=[^&]+/, "token=***")
        : null,
      state: state.state,
      connected: state.state.toLowerCase() === "open",
    });
  } catch (error) {
    const message =
      error instanceof EvolutionApiError
        ? error.message
        : error instanceof Error
          ? error.message
          : "Setup failed";
    console.error("[admin/whatsapp/setup]", error);
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
