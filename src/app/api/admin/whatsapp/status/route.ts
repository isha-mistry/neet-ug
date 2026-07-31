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
    // Listing instances first lets us tell "instance not created yet" apart
    // from "Evolution server unreachable" (connectionState 404s when missing).
    const instances = await client.listInstanceNames();
    const instanceExists = instances.includes(config.instanceName);

    if (!instanceExists) {
      return NextResponse.json({
        ok: true,
        configured: true,
        baseUrl: config.baseUrl,
        instanceName: config.instanceName,
        instances,
        instanceExists: false,
        state: "not_created",
        connected: false,
      });
    }

    const state = await client.getConnectionState();
    return NextResponse.json({
      ok: true,
      configured: true,
      baseUrl: config.baseUrl,
      instanceName: config.instanceName,
      instances,
      instanceExists: true,
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
        instanceExists: false,
        state: "unreachable",
        connected: false,
        error: message,
      },
      { status: 502 },
    );
  }
}
