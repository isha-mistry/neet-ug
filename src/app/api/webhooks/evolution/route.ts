import { NextResponse } from "next/server";
import { reportAppError } from "@/lib/sentry/error-reporter";

type EvolutionWebhookBody = {
  event?: string;
  instance?: string;
  data?: Record<string, unknown>;
  sender?: string;
  destination?: string;
  date_time?: string;
};

function getWebhookSecret(): string | null {
  const secret = process.env.EVOLUTION_WEBHOOK_SECRET?.trim();
  return secret || null;
}

function isAuthorized(request: Request): boolean {
  const secret = getWebhookSecret();
  if (!secret) return true;

  const url = new URL(request.url);
  const queryToken =
    url.searchParams.get("token") ?? url.searchParams.get("secret");
  if (queryToken === secret) return true;

  const headerSecret =
    request.headers.get("x-evolution-webhook-secret") ??
    request.headers.get("x-webhook-secret") ??
    request.headers.get("apikey");

  return headerSecret === secret;
}

function connectionState(data: Record<string, unknown> | undefined): string {
  if (!data) return "unknown";
  const state = data.state ?? data.status ?? data.connection;
  return typeof state === "string" ? state : JSON.stringify(state ?? "unknown");
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: EvolutionWebhookBody = {};
  try {
    body = (await request.json()) as EvolutionWebhookBody;
  } catch {
    return NextResponse.json({ ok: true, ignored: "invalid_json" });
  }

  const event = body.event?.trim() ?? "unknown";
  const instance = body.instance?.trim() ?? body.sender?.trim() ?? "unknown";

  try {
    if (event === "CONNECTION_UPDATE") {
      const state = connectionState(body.data).toLowerCase();
      const message = `[evolution-webhook] CONNECTION_UPDATE instance=${instance} state=${state}`;
      if (state.includes("close") || state.includes("refused") || state.includes("logout")) {
        console.error(message, body.data ?? {});
        reportAppError(new Error(`WhatsApp session disconnected: ${state}`), {
          module: "notifications",
          feature: "evolution_webhook",
          action: "connection_update",
          metadata: { instance, state, event },
        });
      } else {
        console.warn(message, body.data ?? {});
      }
    } else if (event === "SEND_MESSAGE") {
      console.info("[evolution-webhook] SEND_MESSAGE", {
        instance,
        destination: body.destination,
        data: body.data,
      });
    } else {
      console.info("[evolution-webhook] event", { event, instance });
    }
  } catch (error) {
    console.error("[evolution-webhook] handler error", error);
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "evolution-webhook" });
}
