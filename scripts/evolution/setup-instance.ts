/**
 * CLI helper for Evolution instance setup against localhost Docker API.
 *
 * Usage:
 *   yarn evolution:setup
 *   yarn evolution:connect
 *   yarn evolution:logout
 *   yarn evolution:remove
 */
import {
  buildEvolutionWebhookUrl,
  EvolutionClient,
  getEvolutionClientConfig,
} from "../../src/lib/notifications/evolution-client";

function parseArgs(argv: string[]) {
  return {
    connect: argv.includes("--connect"),
    logout: argv.includes("--logout"),
    remove: argv.includes("--remove"),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const config = getEvolutionClientConfig();
  if (!config) {
    console.error(
      "Missing EVOLUTION_API_URL / EVOLUTION_API_KEY / EVOLUTION_INSTANCE_NAME",
    );
    process.exit(1);
  }

  const client = new EvolutionClient(config);
  console.info("[evolution-setup] API", config.baseUrl);
  console.info("[evolution-setup] instance", config.instanceName);

  if (args.remove) {
    await client.logoutInstance();
    await client.deleteInstance();
    console.info("[evolution-setup] logged out and deleted instance");
    return;
  }

  if (args.logout) {
    await client.logoutInstance();
    const state = await client.getConnectionState();
    console.info("[evolution-setup] logged out; state=", state.state);
    return;
  }

  await client.createInstance();
  console.info("[evolution-setup] instance ensured");

  const webhookUrl = buildEvolutionWebhookUrl();
  if (webhookUrl) {
    await client.setWebhook(webhookUrl);
    console.info(
      "[evolution-setup] webhook set:",
      webhookUrl.replace(/token=[^&]+/, "token=***"),
    );
  } else {
    console.warn(
      "[evolution-setup] no EVOLUTION_WEBHOOK_URL / NEXT_PUBLIC_SITE_URL — skipping webhook",
    );
  }

  if (args.connect) {
    const state = await client.getConnectionState();
    if (state.state.toLowerCase() === "open") {
      console.info("[evolution-setup] already connected");
      return;
    }
    const link = await client.getLinkCredentials("qr");
    if (link.qrDataUrl) {
      console.info(
        "[evolution-setup] QR ready (base64 length:",
        link.qrDataUrl.length,
        "). Open /admin/whatsapp to scan in the UI.",
      );
    } else {
      console.warn("[evolution-setup] no QR returned yet — retry shortly");
    }
    if (link.pairingCode) {
      console.info("[evolution-setup] pairing code:", link.pairingCode);
    }
  }

  const state = await client.getConnectionState();
  console.info("[evolution-setup] connection state=", state.state);
}

main().catch((error) => {
  console.error("[evolution-setup] failed", error);
  process.exit(1);
});
