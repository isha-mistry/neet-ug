import { NextResponse } from "next/server";
import { requireAdminBearer } from "@/lib/admin/auth";
import {
  EvolutionApiError,
  EvolutionClient,
  getEvolutionClientConfig,
} from "@/lib/notifications/evolution-client";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const auth = requireAdminBearer(request);
  if (!auth.ok) return auth.response;

  const config = getEvolutionClientConfig();
  if (!config) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        error:
          "Evolution is not configured. Set EVOLUTION_API_URL, EVOLUTION_API_KEY, and EVOLUTION_INSTANCE_NAME.",
      },
      { status: 503 },
    );
  }

  const client = new EvolutionClient(config);
  try {
    const state = await client.getConnectionState();
    const instances = await client.listInstanceNames().catch(() => []);
    return NextResponse.json({
      ok: true,
      configured: true,
      baseUrl: config.baseUrl,
      instanceName: config.instanceName,
      instances,
      state: state.state,
      connected: state.state.toLowerCase() === "open",
    });
  } catch (error) {
    const message =
      error instanceof EvolutionApiError
        ? error.message
        : error instanceof Error
          ? error.message
          : "Failed to reach Evolution API";
    return NextResponse.json(
      {
        ok: false,
        configured: true,
        baseUrl: config.baseUrl,
        instanceName: config.instanceName,
        state: "unreachable",
        connected: false,
        error: message,
      },
      { status: 502 },
    );
  }
}
